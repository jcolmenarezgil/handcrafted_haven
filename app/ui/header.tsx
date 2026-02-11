import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/app/lib/auth";
import { LoginButton, LogoutButton, UserAvatar } from "@/app/ui/login-button";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-white flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="Handcrafted Haven Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#2e2e2e] group-hover:text-slate-600 transition-colors">
            Handcrafted Haven
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {!user ? (
            <LoginButton />
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <UserAvatar name={user.name} />
                <span className="text-sm font-medium text-[#6f6f6f] hidden md:block">
                  {user.name}
                </span>
              </div>
              <LogoutButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
