// import { cookies } from "next/headers";
// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";

// export async function requireSeller() {
//   const cookieStore = await cookies();
//   const userId = cookieStore.get("user_id")?.value; 

//   if (!userId) redirect("/login");

//   const { rows } = await sql`
//     SELECT user_id, user_type
//     FROM users
//     WHERE user_id = ${userId}
//     LIMIT 1
//   `;

//   const user = rows[0];
//   if (!user) redirect("/login");

//   if (user.user_type !== "seller") redirect("/products");

//   return { userId: user.user_id as string };
// }

// app/lib/auth.ts
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function requireSeller() {
  // TEMP: pick the first seller in the DB
  const { rows } = await sql`
    SELECT user_id
    FROM users
    WHERE user_type = 'seller'
    LIMIT 1
  `;

  const seller = rows[0];
  if (!seller) redirect("/seed"); // or redirect("/login")

  return { userId: seller.user_id as string };
}

export async function getCurrentUser() {
  // DEV MODE: pretend the "current user" is the first seller
  const { rows } = await sql`
    SELECT user_id AS id, user_name AS name, user_type AS type
    FROM users
    WHERE user_type = 'seller'
    LIMIT 1
  `;

  return rows[0] ?? null; // { id, name, type } or null
}