"use client";
import { createUser } from "@/app/lib/actions/user_actions";
import { useActionState, useState } from "react";
import { UserIcon, AtSymbolIcon, KeyIcon, IdentificationIcon, ChatBubbleBottomCenterTextIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";
import Link from 'next/link';

export default function CreateuserForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [userType, setUserType] = useState<"basic" | "seller" | null>(null);
  const [, formAction] = useActionState(createUser, {
    message: null,
    errors: {},
  });

  const labelStyle = "mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]";
  const inputStyle = "peer block w-full rounded-xl border border-slate-200 py-3 pl-11 text-sm outline-none transition-all focus:border-[#c97c5d] focus:ring-2 focus:ring-[#c97c5d]/10 placeholder:text-slate-400";
  const iconStyle = "pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-[#c97c5d] transition-colors";

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 rounded-3xl bg-white px-8 pb-10 pt-10 shadow-sm border border-slate-100">
        <p className="mb-8 text-sm text-center text-slate-500 italic">
          Start your journey with us today.
        </p>

        <div className="space-y-5">
          {/* Name */}
          <div className="relative">
            <label className={labelStyle} htmlFor="name">Full Name</label>
            <div className="relative">
              <input className={inputStyle} id="name" type="text" name="name" placeholder="John Doe" required />
              <UserIcon className={iconStyle} />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className={labelStyle} htmlFor="email">Email</label>
            <div className="relative">
              <input className={inputStyle} id="email" type="email" name="email" placeholder="hello@example.com" required />
              <AtSymbolIcon className={iconStyle} />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className={labelStyle} htmlFor="password">Password</label>
            <div className="relative">
              <input className={inputStyle} id="password" type="password" name="password" placeholder="••••••••" required minLength={6} />
              <KeyIcon className={iconStyle} />
            </div>
          </div>

          {/* User type - Rediseñado como Tarjetas */}
          <div className="pt-2">
            <label className={labelStyle}>I want to...</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 transition-all
                ${userType === 'basic' ? 'border-[#c97c5d] bg-[#faf7f2]' : 'border-slate-100 hover:border-slate-200'}
              `}>
                <input type="radio" name="usertype" value="basic" required onChange={() => setUserType("basic")} className="sr-only" />
                <span className={`text-sm font-bold ${userType === 'basic' ? 'text-[#a65d3d]' : 'text-slate-500'}`}>Explore</span>
                <span className="text-[10px] text-slate-400">Discover art</span>
              </label>

              <label className={`
                relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 transition-all
                ${userType === 'seller' ? 'border-[#c97c5d] bg-[#faf7f2]' : 'border-slate-100 hover:border-slate-200'}
              `}>
                <input type="radio" name="usertype" value="seller" onChange={() => setUserType("seller")} className="sr-only" />
                <span className={`text-sm font-bold ${userType === 'seller' ? 'text-[#a65d3d]' : 'text-slate-500'}`}>Create</span>
                <span className="text-[10px] text-slate-400">Sell my work</span>
              </label>
            </div>
          </div>

          {userType === "seller" && (
            <div className="space-y-5 pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="h-px w-full bg-slate-100" />
              <div className="relative">
                <label className={labelStyle} htmlFor="seller_username">Workshop Name</label>
                <div className="relative">
                  <input className={inputStyle} id="seller_username" name="seller_username" placeholder="The Oak Studio" required />
                  <IdentificationIcon className={iconStyle} />
                </div>
              </div>
              <div className="relative">
                <label className={labelStyle} htmlFor="seller_description">Your Story</label>
                <div className="relative">
                  <textarea
                    className={`${inputStyle} h-24 resize-none pl-11 pt-3`}
                    id="seller_description"
                    name="seller_description"
                    placeholder="Tell us about your craft..."
                    required
                  />
                  <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-4 top-4 h-4.5 w-4.5 text-slate-400 peer-focus:text-[#c97c5d]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button
          className="mb-6 mt-10 w-full bg-[#2e2e2e] py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-black transition-all shadow-md active:scale-95"
          type="submit"
        >
          Register Now
          <ArrowRightOnRectangleIcon className="ml-auto h-5 w-5 text-[#c97c5d]" />
        </Button>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already part of the haven?{" "}
          <Link href="/login" className="font-bold text-[#a65d3d] hover:underline uppercase tracking-tight">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}