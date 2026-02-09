'use client';

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
    <div className="md:w-[200px] place-items-center text-center m-2">
      <label htmlFor="orderBy" className="p-2">Order By</label>
      <select
        className="border p-2 rounded-md w-full bg-white"
        id="orderBy"
        value={current}
        onChange={(e) => changeOrder(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
    
  );
}
