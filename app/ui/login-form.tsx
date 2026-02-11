'use client';

import { AtSymbolIcon, KeyIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { loginAction } from "@/app/lib/actions/auth_actions";
import { useSearchParams } from 'next/navigation';
import { Button } from './button';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <form action={loginAction} className="space-y-4">
      <div className="flex-1 rounded-3xl bg-white px-8 pb-10 pt-10 shadow-sm border border-slate-100">
        <p className="mb-8 text-sm text-center text-slate-500 italic">
          Please log in to manage your workshop or explore treasures.
        </p>

        <div className="w-full space-y-6">
          <div className="group">
            <label
              className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-xl border border-slate-200 py-3 pl-11 text-sm outline-none transition-all focus:border-[#c97c5d] focus:ring-2 focus:ring-[#c97c5d]/10 placeholder:text-slate-400"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 peer-focus:text-[#c97c5d] transition-colors" />
            </div>
          </div>

          <div className="group">
            <label
              className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-xl border border-slate-200 py-3 pl-11 text-sm outline-none transition-all focus:border-[#c97c5d] focus:ring-2 focus:ring-[#c97c5d]/10 placeholder:text-slate-400"
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 peer-focus:text-[#c97c5d] transition-colors" />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button
          className="mb-6 mt-10 w-full bg-[#2e2e2e] py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-black transition-all shadow-md active:scale-95"
          type="submit"
        >
          Sign In
          <ArrowRightOnRectangleIcon className="ml-auto h-5 w-5 text-[#c97c5d]" />
        </Button>

        <div className="relative flex items-center py-4">
          <div className="grow border-t border-slate-100"></div>
          <span className="shrink mx-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            New here?
          </span>
          <div className="grow border-t border-slate-100"></div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Join our community of creators.{" "}
          <Link
            href="/login/create"
            className="font-bold text-[#a65d3d] hover:text-[#8b4d32] hover:underline uppercase tracking-tight transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}