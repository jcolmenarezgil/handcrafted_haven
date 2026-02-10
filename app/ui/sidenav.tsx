import Link from "next/link";
import NavLinks from "@/app/ui/helpers/nav-links";
import { getCurrentUser } from "@/app/lib/auth";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default async function SideNav() {
  const user = await getCurrentUser();
  const isSeller = user?.type === "seller";

  return (
    <div className="flex h-full flex-col bg-[#faf7f2] border-r border-slate-200 px-4 py-6">
      <div className="mb-8 px-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b4f3f] opacity-80">
          Exploration
        </h2>
        <p className="text-xl font-serif text-[#2e2e2e] mt-1 italic">
          Dashboard
        </p>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <div className="flex flex-row md:flex-col gap-1 w-full">
          <NavLinks isSeller={isSeller} />
        </div>

        <div className="hidden md:block grow"></div>

        {user && (
          <div className="hidden md:flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-slate-100 mt-4">
            <div className="h-2 w-2 rounded-full bg-[#8fae9e] animate-pulse" />
            <p className="text-xs font-medium text-[#6f6f6f]">
              Role: <span className="capitalize text-[#2e2e2e]">{user.type}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}