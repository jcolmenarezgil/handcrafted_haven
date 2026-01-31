'use server'   ;
import {z} from 'zod'  ;
import {revalidatePath} from 'next/cache'  ;
import {redirect} from 'next/navigation'  ;




const FormSchema = z.object({
  name : z.string(
    { required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  email: z.string(
    { required_error: 'Email is required' }).email(),

  password: z.string(
    { required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),

  user_type: z.enum(
    ['client','artisan','admin'],
     { required_error: 'User type is required' }),


  
});

export async function registerUser(formData: FormData) {
  const parsedData = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    user_type: formData.get('user_type'),
  });
}