import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export default async function Page() {
  const users = await sql`SELECT user_name, user_email FROM users`;

  return (
    <div>
      {users.map((u) => (
        <p key={u.user_email}>{u.user_name} - {u.user_email}</p>
      ))}
    </div>
  );
}
