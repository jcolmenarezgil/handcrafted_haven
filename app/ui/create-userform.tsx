"use client";
import { createUser } from "@/app/lib/actions/user_actions";
import { useActionState, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";

export default function CreateuserForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [userType, setUserType] = useState<"basic" | "seller" | null>(null);
  const [, formAction] = useActionState(createUser, {
    message: null,
    errors: {},
  });

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-6 text-2xl">Please create a new user.</h1>

        {/* Name */}
        <div>
          <label
            className="mb-2 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            className="mb-2 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              minLength={6}
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            className="mb-2 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* User type */}
        <div>
          <label
            className="mb-2 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="user-type"
          >
            <strong>User type</strong>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="usertype"
                value="basic"
                required
                onChange={() => setUserType("basic")}
              />
              <span>Basic</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="usertype"
                value="seller"
                onChange={() => setUserType("seller")}
              />
              <span>Seller</span>
            </label>
          </div>
        </div>

        {userType === "seller" && (
          <>
            {/* Seller username */}
            <div>
              <label
                className="mb-2 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="seller_username"
              >
                Seller username
              </label>
              <input
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                id="seller_username"
                type="text"
                name="seller_username"
                placeholder="Enter your seller username"
              />
            </div>

            {/* Seller description */}
            <div>
              <label
                className="mb-2 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="seller_description"
              >
                Seller description
              </label>
              <input
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                id="seller_description"
                type="text"
                name="seller_description"
                placeholder="Enter your seller description"
              />
            </div>
          </>
        )}

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button
          className="mb-3 mt-8 w-full bg-green-800 text-white hover:bg-green-900 "
          type="submit"
        >
          Create User{" "}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
