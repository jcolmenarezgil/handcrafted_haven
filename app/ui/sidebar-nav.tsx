import Link from "next/link";

const navItems = [
  { label: "Browse", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Sellers", href: "/sellers" },
];

export default function SidebarNav() {
  return (
    <aside className="lg:col-span-1">
      <div className="rounded-lg border p-4">
        <p className="mb-3 text-sm font-semibold text-slate-700">Menu</p>

        {/* For responsive design */}
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md border px-3 py-2 text-sm hover:bg-slate-50 lg:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
