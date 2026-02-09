"use client";

import { useState } from "react";

export default function FilterToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col place-items-center justify-center">
      {/* Button for mobile */}
      <div className="md:hidden">
        <button
          className="bg-slate-100 px-4 py-2 rounded border-1"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Pocket for filters */}
      <div className={`${open ? "block" : "hidden"} md:flex items-center justify-center gap-2 p-4 border-2 border-gray-300 rounded-md w-full`}>
        {children}
      </div>
    </div>
  );
}
