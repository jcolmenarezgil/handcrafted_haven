'use client';

import { Category } from "@/app/lib/data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function CategoryDropdown( { categories }: { categories: Category[] }) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();


  const current = searchParams.get("category") || "";

  function changeCategory(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="md:w-[200px] place-items-center text-center m-2 mb-4 md:mb-2">
      <label htmlFor="category" className="p-2">Category</label>
      <select
        className="border p-2 rounded-md w-full bg-white"
        id="category"
        value={current}
        onChange={(e) => changeCategory(e.target.value)}
      >
        <option value="">All</option>

        {categories.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
    
  );
}
