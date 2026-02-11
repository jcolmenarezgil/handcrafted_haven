"use client";

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

  // Optional: remove this effect if you ONLY want apply on blur/enter.
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (min) params.set("minPrice", min);
    else params.delete("minPrice");

    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");

    replace(`${pathname}?${params.toString()}`);
  }, [min, max]); // eslint-disable-line react-hooks/exhaustive-deps

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");
    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#6b4f3f] px-1">
        Price Range
      </legend>

      <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl">
        <div className="relative flex items-center">
          <label htmlFor="minPrice" className="sr-only">
            Minimum price
          </label>
          <span className="absolute left-3 text-slate-400 text-xs">$</span>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            inputMode="numeric"
            placeholder="Min"
            aria-describedby="priceRangeHint"
            className="w-24 pl-6 pr-2 py-1.5 text-sm bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-[#c97c5d] outline-none"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            onBlur={applyFilters}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        <span className="text-slate-300" aria-hidden="true">
          —
        </span>

        <div className="relative flex items-center">
          <label htmlFor="maxPrice" className="sr-only">
            Maximum price
          </label>
          <span className="absolute left-3 text-slate-400 text-xs">$</span>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            inputMode="numeric"
            placeholder="Max"
            aria-describedby="priceRangeHint"
            className="w-24 pl-6 pr-2 py-1.5 text-sm bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-[#c97c5d] outline-none"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            onBlur={applyFilters}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
      </div>

      <p id="priceRangeHint" className="sr-only">
        Enter minimum and maximum price in dollars.
      </p>
    </fieldset>
  );
}
