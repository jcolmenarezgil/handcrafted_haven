"use client";

import { useState } from "react";

export default function CategorySelect({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <select
        name="category_id"
        className="w-full rounded-md border px-3 py-2 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        <option value="" disabled>
          Select a category
        </option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}

        <option value="__other__">Other…</option>
      </select>

      {value === "__other__" ? (
        <input
          name="category_other"
          className="w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Type a new category"
          required
        />
      ) : (
        <input type="hidden" name="category_other" value="" />
      )}
    </div>
  );
}
