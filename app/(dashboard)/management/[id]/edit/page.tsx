import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireManager } from "@/app/lib/auth";
import { fetchProductByIdForSeller, fetchCategories } from "@/app/lib/data";
import { updateProductAction, deleteProductAction } from "@/app/lib/actions/management_actions";
import CategorySelect from "@/app/ui/management/category-select";
import ConfirmDeleteButton from "@/app/ui/management/confirm-delete-button";
import { ChevronRightIcon, ArrowLeftIcon, PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await props.params;
  const { userId } = await requireManager();

  const product = await fetchProductByIdForSeller(userId, productId);
  if (!product) return notFound();

  const categories = await fetchCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link href="/management" className="hover:text-[#c97c5d] transition-colors">
          Workshop
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-slate-300">Edit</span>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-[#6b4f3f] truncate max-w-37.5">{product.name}</span>
      </nav>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-serif italic text-4xl text-[#2e2e2e]">Refine your Work</h1>
          <p className="mt-2 text-slate-500 text-sm italic">
            &quot;Every detail is a signature of your craftsmanship.&quot;
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#faf7f2] p-3 rounded-2xl border border-[#c97c5d]/10">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white border border-slate-100">
            {product.image_url ? (
              <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="48px" />
            ) : (
              <PhotoIcon className="p-2 text-slate-200" />
            )}
          </div>
          <div className="pr-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Current Piece</p>
            <p className="text-sm font-serif text-[#2e2e2e] truncate max-w-30">{product.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <form
            action={updateProductAction}
            className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <input type="hidden" name="productId" value={productId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Name</label>
                <input
                  name="name"
                  defaultValue={product.name}
                  className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none"
                  placeholder="Product Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Price (USD)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={Number(product.price)}
                  className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Category</label>
              <CategorySelect categories={categories} defaultValue={product.category_id} />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Image URL</label>
              <input
                name="image_url"
                defaultValue={product.image_url || ""}
                className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none font-mono text-[12px]"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b4f3f]">Description</label>
              <textarea
                name="description"
                defaultValue={product.description || ""}
                className="w-full rounded-xl border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-[#c97c5d]/20 focus:border-[#c97c5d] transition-all outline-none resize-none"
                rows={5}
                placeholder="Describe your masterpiece..."
                required
              />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
              <Link href="/management" className="text-sm font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Cancel
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#2e2e2e] px-10 py-4 text-sm font-bold text-white hover:bg-black transition-all shadow-md active:scale-95"
              >
                <PencilSquareIcon className="w-4 h-4 text-[#c97c5d]" />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex flex-col items-center text-center">
            <h3 className="text-red-900 font-bold text-xs uppercase tracking-[0.2em] mb-4">Archive Section</h3>
            <p className="text-red-700/60 text-xs mb-6 leading-relaxed">
              Once a masterpiece is removed from the workshop, all history and reviews will be lost forever.
            </p>

            <form action={deleteProductAction} className="w-full">
              <input type="hidden" name="productId" value={productId} />
              <ConfirmDeleteButton />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}