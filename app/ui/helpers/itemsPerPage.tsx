'use client';

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ItemsPerPage({
  minCardShow,
}: {
  minCardShow: number;
}) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const current = searchParams.get("itemsPerPage") || "";

  function changeItemsPerPage(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("itemsPerPage", value);
    } else {
      params.delete("itemsPerPage");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-1.5 place-items-center mt-4">
      <label htmlFor="itemsPerPage" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#6b4f3f] px-1">
        Items Shown</label>
      <div className="relative">
        <select
          className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c97c5d] focus:border-transparent cursor-pointer transition-all"
          id="itemsPerPage"
          value={current}
          onChange={(e) => changeItemsPerPage(e.target.value)}
        >
          <option value={minCardShow}>{minCardShow.toString()}</option>
          <option value={minCardShow * 2}>{minCardShow * 2}</option>
          <option value={minCardShow * 4}>{minCardShow * 4}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>

  );
}
