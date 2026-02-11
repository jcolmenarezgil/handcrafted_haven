'use client';


import Search from '@/app/ui/helpers/search';
import OrderBy from '@/app/ui/products/order-by';
import CategoryDropdown from '@/app/ui/products/category-filter';
import PriceRangeFilter from '@/app/ui/products/price-range';
import { Category } from '@/app/lib/definitions';

export default function ProductFilterBar({ categories }: { categories: Category[] }) {
    return (
        <div className="bg-[#faf7f2] rounded-2xl p-6 mb-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col gap-6">
                <div className="w-full">
                    <Search placeholder="Search handcrafted treasures..." />
                </div>

                <div className="h-px bg-slate-200/60 w-full" />

                <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                        <OrderBy />
                        <CategoryDropdown categories={categories} />
                    </div>
                    <PriceRangeFilter />
                </div>
            </div>
        </div>
    );
}