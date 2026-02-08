// import { NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const redirectTo = String(formData.get("redirectTo") || "/");

//   if (!email || !password) {
//     return NextResponse.redirect(new URL("/login?error=missing", request.url));
//   }

//   const { rows } = await sql`
//     SELECT user_id, user_type
//     FROM users
//     WHERE email = ${email} AND password = ${password}
//     LIMIT 1
//   `;

//   const user = rows[0];

//   if (!user) {
//     return NextResponse.redirect(new URL("/login?error=invalid", request.url));
//   }

//   const response = NextResponse.redirect(new URL(redirectTo, request.url));

//   response.cookies.set("user_id", String(user.user_id), {
//     httpOnly: true,
//     path: "/",
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//   });

//   return response;
// }

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const redirectTo = String(formData.get("redirectTo") || "/");

    if (!email || !password) {
      return NextResponse.redirect(new URL("/login?error=missing", request.url));
    }

    // 👇 this is usually where the crash happens
    const { rows } = await sql`
      SELECT user_id, user_type
      FROM users
      WHERE email = ${email} AND password = ${password}
      LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    const res = NextResponse.redirect(new URL(redirectTo, request.url));
    res.cookies.set("user_id", String(user.user_id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Login failed", details: String(err) },
      { status: 500 }
    );
  }
}
