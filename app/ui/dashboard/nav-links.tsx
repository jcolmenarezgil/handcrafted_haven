"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Sellers", href: "/dashboard/sellers" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "px-3 py-2 rounded-md text-sm",
            pathname === link.href
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:text-blue-600",
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
