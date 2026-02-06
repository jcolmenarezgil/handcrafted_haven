'use server';
import {z} from 'zod';
import postgres from 'postgres';
import {redirect} from 'next/navigation';
import bcrypt from 'bcryptjs';
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
  prevState: State,
  formData: FormData
): Promise<State> {

  const validateField = CreateUser.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    usertype: formData.get('usertype') as 'basic' | 'admin' | 'seller',
    seller_username: formData.get('seller_username') as string | undefined,
    seller_description: formData.get('seller_description') as string | undefined,
  });

  if (!validateField.success) {
    const errors = validateField.error.flatten().fieldErrors;
    return { errors, message: null };
  }

  const userData = validateField.data;
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  try {
          await sql`
      INSERT INTO users (
        user_name,
        user_email,
        user_password,
        user_type
      )
      VALUES (
        ${userData.name},
        ${userData.email},
        ${hashedPassword},
        ${userData.usertype}
      )
      `;

    redirect('/users');

  } catch (error) {
    return {
      message: 'An error occurred while creating the user.',
    };
  }
}
