import Link from "next/link";
import { requireManager } from "@/app/lib/auth";
import { fetchCategories } from "@/app/lib/data";
import { createProductAction } from "@/app/lib/actions/management_actions";
import CategorySelect from "@/app/ui/management/category-select";
import { ChevronRightIcon, ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default async function NewProductPage() {
  await requireManager();
  const categories = await fetchCategories();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link href="/management" className="hover:text-[#c97c5d] transition-colors">
          Workshop
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-[#6b4f3f]">New Masterpiece</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-serif italic text-4xl text-[#2e2e2e]">Bring it to life</h1>
        <p className="mt-2 text-slate-500 text-sm">Fill in the details to list your new creation in the gallery.</p>
      </div>

      <form
        action={createProductAction}
        className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Product Name</label>
              <input
                name="name"
                className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none"
                placeholder="e.g. Hand-carved Oak Vase"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Price (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full rounded-xl border-slate-200 pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Category</label>
              <CategorySelect categories={categories} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Image Reference</label>
              <input
                name="image_url"
                className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none"
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-[10px] text-slate-400 italic tracking-tight">Direct link to your masterpiece photo (Optional)</p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">The Story Behind It</label>
              <textarea
                name="description"
                className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none resize-none"
                rows={5}
                placeholder="What inspired this piece? What materials did you use?"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/management"
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Discard changes
          </Link>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#2e2e2e] px-10 py-4 text-sm font-bold text-white hover:bg-black transition-all shadow-md active:scale-95"
          >
            <SparklesIcon className="w-4 h-4 text-[#c97c5d]" />
            Publish to Gallery
          </button>
        </div>
      </form>
    </main>
  );
}