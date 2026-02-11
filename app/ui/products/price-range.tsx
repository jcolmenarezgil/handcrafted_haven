'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PriceRangeFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const initialMin = searchParams.get("minPrice") || "";
  const initialMax = searchParams.get("maxPrice") || "";

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (min) params.set("minPrice", min);
    else params.delete("minPrice");

    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");

    replace(`${pathname}?${params.toString()}`);

  }, [min, max]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (min) params.set("minPrice", min); else params.delete("minPrice");
    if (max) params.set("maxPrice", max); else params.delete("maxPrice");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#6b4f3f] px-1">
        Price Range
      </label>
      <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-400 text-xs">$</span>
          <input
            type="number"
            placeholder="Min"
            className="w-24 pl-6 pr-2 py-1.5 text-sm bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-[#c97c5d] outline-none"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            onBlur={applyFilters} // Aplica al salir del input
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
        <span className="text-slate-300">—</span>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-400 text-xs">$</span>
          <input
            type="number"
            placeholder="Max"
            className="w-24 pl-6 pr-2 py-1.5 text-sm bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-[#c97c5d] outline-none"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            onBlur={applyFilters}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
      </div>
    </div>
  );
}
