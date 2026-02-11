"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function CategorySelect({
  id,
  categories,
  defaultValue,
}: {
  id: string;
  categories: { id: string; name: string }[];
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#c97c5d] transition-colors">
          <TagIcon className="w-4 h-4" aria-hidden="true" />
        </div>

        <select
          id={id}
          name="category_id"
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none cursor-pointer text-[#2e2e2e]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        >
          <option value="" disabled className="text-slate-400">
            Select a category...
          </option>

          {categories.map((c) => (
            <option key={c.id} value={c.id} className="py-2">
              {c.name}
            </option>
          ))}

          <option value="__other__" className="font-semibold text-[#c97c5d]">
            ✨ Add new category...
          </option>
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {value === "__other__" ? (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c97c5d]">
              <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            </div>

            {/* Real label (screen-reader only) so WAVE doesn't flag it */}
            <label htmlFor={`${id}-other`} className="sr-only">
              New category name
            </label>

            <input
              id={`${id}-other`}
              name="category_other"
              className="w-full rounded-xl border border-[#c97c5d]/30 bg-[#faf7f2]/50 pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] outline-none placeholder:text-slate-400 italic"
              placeholder="What's this new category called?"
              required
              autoFocus
            />
          </div>

          <p className="mt-2 text-[10px] text-slate-400 pl-2">
            This will create a new shelf in our gallery.
          </p>
        </div>
      ) : (
        <input type="hidden" name="category_other" value="" />
      )}
    </div>
  );
}
