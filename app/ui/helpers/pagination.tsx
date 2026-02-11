'use client';


import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex items-center space-x-2">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex items-center gap-1">
        {allPages.map((page, index) => {
          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const isMiddle = page === '...';

  const className = clsx(
    'flex h-9 w-9 items-center justify-center text-sm font-medium transition-all duration-200 rounded-full border',
    {
      'bg-[#2e2e2e] border-[#2e2e2e] text-white shadow-md scale-110 z-10': isActive,
      'bg-white border-slate-200 text-slate-600 hover:border-[#c97c5d] hover:text-[#c97c5d]': !isActive && !isMiddle,
      'border-transparent text-slate-300 cursor-default': isMiddle,
    },
  );

  return isActive || isMiddle ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200',
    {
      'pointer-events-none border-slate-100 text-slate-200': isDisabled,
      'bg-white border-slate-200 text-slate-600 hover:border-[#c97c5d] hover:text-[#c97c5d] hover:shadow-sm': !isDisabled,
    },
  );

  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return isDisabled ? (
    <div className={className} aria-disabled="true">
      <Icon className="w-4 h-4" aria-hidden="true" />
    </div>
  ) : (
    <Link
      className={className}
      href={href}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </Link>
  );

}