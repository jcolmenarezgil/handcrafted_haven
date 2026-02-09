"use server";

import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/app/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) redirect("/login?error=missing");

  const { rows } = await sql`
    SELECT user_id, user_password, user_type
    FROM users
    WHERE LOWER(TRIM(user_email)) = ${email}
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) redirect("/login?error=invalid");

  const stored = String(user.user_password || "");
  let ok = false;

  // bcrypt users
  if (stored.startsWith("$2")) {
    ok = await bcrypt.compare(password, stored);
  } else {
    ok = password === stored;
  }

  if (!ok) redirect("/login?error=invalid");

  // upgrade plaintext -> bcrypt after successful login
  if (!stored.startsWith("$2")) {
    const hashed = await bcrypt.hash(password, 10);
    await sql`
      UPDATE users
      SET user_password = ${hashed}
      WHERE user_id = ${user.user_id}
    `;
  }

  await createSession(String(user.user_id));

  if (user.user_type === "seller" || user.user_type === "admin") {
    redirect("/management");
  }

  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
