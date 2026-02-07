import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

// export async function requireSeller() {
//   const cookieStore = await cookies();
//   const userId = cookieStore.get("user_id")?.value; // <- change name once we know cookie name

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

export async function requireSeller() {
  return { user_id: "seller-1" };

}

