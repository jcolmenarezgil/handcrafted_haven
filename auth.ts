import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string) {
  try {
    const user = await sql`
      SELECT *
      FROM users
      WHERE user_email = ${email}
    `;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error('Invalid credentials format');
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);

        if (!user) {
          console.error('User not found');
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.user_password
        );

        if (!passwordMatch) {
          console.error('Password mismatch');
          return null;
        }

       
        return {
          id: user.user_id,
          email: user.user_email,
          name: user.user_name,
          role: user.user_type, 
        };
      },
    }),
  ],
});
