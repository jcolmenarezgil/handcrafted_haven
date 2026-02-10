import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ChevronRightIcon, ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";

import ReviewForm from "@/app/ui/products/review-form";
import { fetchProductById, fetchReviewsByProductId, createReview } from "@/app/lib/data";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id: productId } = await props.params;
  const product = await fetchProductById(productId);
  if (!product) return notFound();

  const reviews = await fetchReviewsByProductId(productId);

  async function addReview(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "").trim();
    const comment = String(formData.get("comment") || "").trim();
    const rating = Number(formData.get("rating"));
    if (!name || !(rating >= 1 && rating <= 5)) return;

    await createReview({ productId, name, rating, comment });
    revalidatePath(`/products/${productId}`);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link
          href="/products"
          className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
        >
          Inventory
        </Link>
        <ChevronRightIcon className="w-3 h-3" />

        <Link
          href={`/products?category=${product.category_id}`}
          className="hover:text-[#c97c5d] transition-colors"
        >
          {product.category}
        </Link>

        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-[#6b4f3f] truncate max-w-50">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#faf7f2] border border-slate-100 shadow-sm group">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">No Image</div>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className="text-[#c97c5d] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Handcrafted by {product.seller}
          </h2>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#2e2e2e] leading-tight mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-light text-[#2e2e2e]">${Number(product.price).toFixed(2)}</span>
            <div className="h-8 w-px bg-slate-200" />
            <span className="px-3 py-1 rounded-full bg-[#8fae9e]/10 text-[#8fae9e] text-[10px] font-bold uppercase tracking-wider border border-[#8fae9e]/20">
              In Stock
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg mb-8 font-light italic">
            &quot;{product.description || "No description provided for this unique piece."}&quot;
          </p>

          <div className="h-px bg-slate-100 w-full mb-8" />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b4f3f] hover:text-[#c97c5d] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Return to Gallery
          </Link>
        </div>
      </div>

      <section className="mt-20 max-w-3xl">
        <h2 className="font-serif text-2xl italic text-[#2e2e2e] mb-10 border-b border-slate-100 pb-4">
          User&apos;s Feedback
        </h2>

        <div className="space-y-8">
          {reviews.length === 0 ? (
            <div className="bg-[#faf7f2] p-8 rounded-2xl text-center border border-dashed border-slate-200">
              <p className="text-slate-500 italic text-sm">Be the first to value this masterpiece.</p>
            </div>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="relative pl-6 border-l-2 border-[#c97c5d]/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm text-[#2e2e2e]">{r.name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-3 h-3 ${i < Number(r.rating) ? 'text-[#c97c5d]' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed">&quot;{r.comment}&quot;</p>
                <time className="block mt-2 text-[9px] uppercase tracking-widest text-slate-400">
                  {new Date(r.created_at).toLocaleDateString()}
                </time>
              </div>
            ))
          )}
        </div>

        <div className="mt-16 bg-[#faf7f2] rounded-3xl p-8 border border-slate-100">
          <h3 className="font-serif italic text-xl text-[#2e2e2e] mb-2">Leave your mark</h3>
          <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider">Share your thoughts with the creator</p>
          <ReviewForm action={addReview} />
        </div>
      </section>
    </main>
  );
}