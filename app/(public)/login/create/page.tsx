import CreateuserForm from '@/app/ui/create-userform';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Community | Handcrafted Haven'
};

export default function CreateUserPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#faf7f2] py-12">
      <div className="relative mx-auto flex w-full max-w-125 flex-col space-y-6 p-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#7a391c]">
            Handcrafted Haven
          </h2>
          <h1 className="font-serif italic text-4xl text-[#2e2e2e]">Create Account</h1>
          <div className="h-1 w-12 bg-[#c97c5d]/20 rounded-full mt-4" />
        </div>

        <Suspense fallback={<div className="h-150 animate-pulse bg-white rounded-3xl" />}>
          <CreateuserForm />
        </Suspense>
      </div>
    </main>
  );
}