'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from './button';
import { authenticate } from '../lib/actions/user_actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-4">

      <div className="rounded-2xl bg-white shadow-lg border border-gray-100 px-8 pb-6 pt-8">

        <h1 className="mb-6 text-3xl font-semibold text-gray-800 text-center">
          Welcome back 👋
        </h1>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 text-sm focus:ring-2 focus:ring-black"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 text-sm focus:ring-2 focus:ring-black"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        {/* BUTTON */}
        <Button
          className="mt-6 w-full rounded-lg bg-black hover:bg-gray-800 disabled:opacity-60"
          aria-disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Log in'}
          <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </Button>

        {/* ERROR */}
        <div
          className="flex h-6 items-center justify-center space-x-1 mt-3"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

      </div>

      {/* SIGNUP LINK */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <a
            href="/login/create"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>

    </form>
  );
}
