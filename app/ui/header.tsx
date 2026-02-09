import Image from "next/image";
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { logout } from '../lib/actions/auth-actions';
export default async function Header() {
  
  const session = await auth();

  return (
    <header className="border-b">
      <div className="mx-auto flex items-center justify-between px-4 py-4">

        <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-slate-50">
              <Image src="/logo.svg" alt="Handcrafted Haven logo" fill />
            </div>

            <div>
              <p className="text-lg font-semibold leading-tight">
                Handcrafted Haven
              </p>
              <p className="text-sm text-slate-600 leading-tight">
                Unique Handmade Treasures
              </p>
            </div>   
        </div>
       {session ? (
              <form action={logout}>
      <button className="rounded-md bg-red-500 px-4 py-1 text-white hover:bg-red-600">
        Logout
      </button>
      </form>

        ) : (
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-1 text-white"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
