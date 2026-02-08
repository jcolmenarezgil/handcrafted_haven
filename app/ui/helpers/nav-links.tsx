"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavLinksProps = {
  isSeller?: boolean;
};

export default function NavLinks({ isSeller = false }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Artisans", href: "/artisans" },

    ...(isSeller ? [{ name: "Management", href: "/management" }] : []),
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-400 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-gray-700 text-white": pathname === link.href,
            },
          )}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </>
  );
}
