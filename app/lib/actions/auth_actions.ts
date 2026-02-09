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
    SELECT user_id, user_password
    FROM users
    WHERE user_email = ${email}
    LIMIT 1
  `;

  const row = rows[0];
  if (!row) redirect("/login?error=invalid");

  // If user_password is bcrypt-hashed:
  const ok = await bcrypt.compare(password, row.user_password);
  if (!ok) redirect("/login?error=invalid");

  await createSession(row.user_id);
  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
