import Link from "next/link";
import { getCurrentUser } from "@/app/lib/auth";
import { logoutAction } from "@/app/lib/actions/auth_actions";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-lg">
          Handcrafted Haven
        </Link>

        <nav className="flex items-center gap-3">
          {!user ? (
            <Link
              href="/login"
              className="
                        inline-flex
                        h-9
                        bg-black
                        items-center
                        justify-center
                        rounded-md
                        border
                        px-4
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-slate-700
                      "
            >
              Login
            </Link>
          ) : (
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border px-3 py-2 text-sm font-medium"
              >
                Logout
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
