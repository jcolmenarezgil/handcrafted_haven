'use client';
import { createUser } from '@/app/lib/actions/user_actions';
import { useActionState } from 'react';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'next/navigation';
import { Button } from './button';
import { useState } from 'react';

export default function CreateuserForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [state, formAction] = useActionState(createUser, {
    message: null,
    errors: {},
  });

  const [userType, setUserType] = useState('');

  return (
    <form action={formAction} className="max-w-xl mx-auto space-y-4">
      <div className="rounded-2xl bg-white shadow-lg border border-gray-100 px-8 pb-6 pt-8">

        <h1 className="mb-6 text-3xl font-semibold text-gray-800 text-center">
          Create your account 
        </h1>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 text-sm focus:ring-2 focus:ring-black"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Email */}
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
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Password */}
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
            />
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* User Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            User type
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="usertype"
                value="basic"
                required
                onChange={(e) => setUserType(e.target.value)}
              />
              Basic User
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="usertype"
                value="seller"
                onChange={(e) => setUserType(e.target.value)}
              />
              Seller
            </label>
          </div>
        </div>

        {/* Seller Fields */}
        <div className={`space-y-3 p-4 rounded-lg border ${
          userType === 'seller'
            ? 'border-green-200 bg-green-50'
            : 'border-gray-200 bg-gray-50 opacity-60'
        }`}>

          <label className="text-sm font-medium text-gray-700">
            Seller username
          </label>
          <input
            className="w-full rounded-lg border border-gray-200 py-2 px-3 text-sm"
            type="text"
            name="seller_username"
            disabled={userType !== 'seller'}
            placeholder="Enter your seller username"
          />

          <label className="text-sm font-medium text-gray-700">
            Seller description
          </label>
          <input
            className="w-full rounded-lg border border-gray-200 py-2 px-3 text-sm"
            type="text"
            name="seller_description"
            disabled={userType !== 'seller'}
            placeholder="Tell us about your shop"
          />
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button className="mt-6 w-full rounded-lg bg-black hover:bg-gray-800">
          Create User
          <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </Button>

      </div>
    </form>
  );
}
