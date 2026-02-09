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

  return (
    <div className="flex flex-col gap-1 place-items-center w-full max-w-[420px] border-1 border-black rounded-md pt-2 pb-4 px-2 bg-white">
      <p>Price Range</p>
      <div className="grid gap-1 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] w-full place-items-center">
        <div className="flex place-items-center justify-center max-w-[200px] w-full">
          <div className="w-4/5">
            <label className="block text-sm text-center">Min</label>
            <input
              type="number"
              className="border rounded p-2 w-24 w-full"
              placeholder="0"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <span className="p-2 mt-6">$</span>
        </div>
        
        <div className="flex place-items-center justify-center max-w-[200px] w-full">
          <div className="w-4/5">
            <label className="block text-sm text-center">Max</label>
            <input
              type="number"
              className="border rounded p-2 w-24  w-full"
              placeholder="9999"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
              <span className="p-2 mt-6">$</span>
        </div>
      </div>
      
      
    </div>
  );
}
