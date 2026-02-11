'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useDebouncedCallback((term) => {
    setIsSearching(false);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 shrink-0 max-w-lg">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#c97c5d] transition-colors">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>

      <input
        className="peer block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c97c5d] focus:border-transparent transition-all shadow-sm shadow-slate-100/50"
        id="search"
        placeholder={placeholder}
        onChange={(e) => {
          setIsSearching(true);
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className={`h-1.5 w-1.5 rounded-full transition-colors ${isSearching ? 'bg-[#c97c5d] animate-pulse' : 'bg-[#8fae9e]'
          }`} />
      </div>
    </div>
  );
}