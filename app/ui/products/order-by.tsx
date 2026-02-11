'use client';


import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function OrderBy() {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const current = searchParams.get("orderBy") || "name";

  function changeOrder(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("orderBy", value);
    } else {
      params.delete("orderBy");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-45">
      <label htmlFor="orderBy" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#6b4f3f] px-1">
        Sort by
      </label>
      <div className="relative">
        <select
          id="orderBy"
          value={current}
          onChange={(e) => changeOrder(e.target.value)}
          className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c97c5d] focus:border-transparent cursor-pointer transition-all"
        >
          <option value="name">Product Name</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
