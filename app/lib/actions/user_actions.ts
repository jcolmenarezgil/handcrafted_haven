'use server';
import {z} from 'zod';
import postgres from 'postgres';
import {redirect} from 'next/navigation';
import bcrypt from 'bcryptjs';
import { format } from 'path';
const sql = postgres(process.env.DATABASE_URL!);

const FormSchema = z.object({

  id: z.string(),
  name: z.string()
  .min(2, {message: 'Name must be at least 2 characters long'})
  .max(100, {message: 'Name must be at most 100 characters long'}),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
 usertype: z.enum(['basic', 'admin', 'seller'], {
  message: 'Invalid user type',
}),
seller_username: z.string().optional(

),
seller_description: z.string().optional(),


});

const CreateUser = FormSchema.omit({id: true});

export type State ={
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        usertype?: string[];
        seller_username?: string[];
        seller_description?: string[];
    };
    message?: string | null;
};

export async function createUser(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const sellerUsernameEntry = formData.get('seller_username');
  const sellerDescriptionEntry = formData.get('seller_description');

  const validateField = CreateUser.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    usertype: formData.get('usertype') as 'basic' | 'admin' | 'seller',
    seller_username: sellerUsernameEntry ? String(sellerUsernameEntry) : undefined,
    seller_description: sellerDescriptionEntry ? String(sellerDescriptionEntry) : undefined,
  });

  if (!validateField.success) {
    const errors = validateField.error.flatten().fieldErrors;
    return { errors, message: null };
  }

  const userData = validateField.data;
  const lower = userData.name.toLowerCase();
  const formattedName = lower.charAt(0).toUpperCase() + lower.slice(1);
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const sellerUsernameRaw =
    userData.usertype === 'seller' ? userData.seller_username : undefined;
  const sellerDescriptionRaw =
    userData.usertype === 'seller' ? userData.seller_description : undefined;

  // Convert "basic" empty strings to null so we don't store "" in DB
  const sellerUsername =
    sellerUsernameRaw && sellerUsernameRaw.trim() !== '' ? sellerUsernameRaw.trim() : null;

  const sellerDescription =
    sellerDescriptionRaw && sellerDescriptionRaw.trim() !== '' ? sellerDescriptionRaw.trim() : null;

  try {
    await sql`
      INSERT INTO users (
        user_name,
        user_email,
        user_password,
        user_type,
        seller_username,
        seller_description
      )
      VALUES (
        ${formattedName},
        ${userData.email},
        ${hashedPassword},
        ${userData.usertype},
        ${sellerUsername},
        ${sellerDescription}
      )
    `;
  } catch (error: unknown) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? (error as { code?: string }).code
        : undefined;

    if (code === '23505') {
      return {
        errors: { email: ['Email already exists'] },
        message: null,
      };
    }

    return { message: 'An error occurred while creating the user.' };
  }

  const redirectTo = (formData.get('redirectTo') as string) || '/login';
  redirect(redirectTo);

}
