import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

import Header from "@/app/ui/header";
import SidebarNav from "@/app/ui/sidebar-nav";
import Footer from "@/app/ui/footer";
import ReviewForm from "@/app/ui/review-form";

import {
  fetchProductById,
  fetchReviewsByProductId,
  createReview,
} from "@/app/lib/data";

export default async function ProductPage(props: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const params = await props.params;
  const productId = params.id;

  const product = await fetchProductById(productId);
  if (!product) return notFound();

  const reviews = await fetchReviewsByProductId(productId);

  async function addReview(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "").trim();
    const comment = String(formData.get("comment") || "").trim();
    const rating = Number(formData.get("rating"));

    if (!name) return;
    if (!(rating >= 1 && rating <= 5)) return;

    await createReview({ productId, name, rating, comment });

    revalidatePath(`/dashboard/product/${productId}`);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr_220px]">
          <SidebarNav />

          <section className="space-y-6">
            {/* Product */}
            <div className="rounded-lg border p-5">
              <h1 className="text-2xl font-bold">{product.name}</h1>

              <div className="mt-5 rounded-lg border bg-slate-50 p-4">
                <div className="mb-3 aspect-[4/3] w-full rounded-md border bg-white relative overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-200 text-xs text-slate-500">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Price:</span> $
                    {Number(product.price).toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p>
                    <span className="font-semibold">Made by:</span>{" "}
                    {product.seller}
                  </p>
                  <p className="text-slate-600">
                    {product.description || "No description yet."}
                  </p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 lg:hidden">
                Add to Cart
              </button>
            </div>

            {/* Reviews */}
            <div className="rounded-lg border p-5">
              <h2 className="text-lg font-semibold">Comments / Reviews</h2>

              <div className="mt-4 space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-slate-600">No reviews yet.</p>
                ) : (
                  reviews.map((r: any) => (
                    <div key={r.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-yellow-600">
                          {"★".repeat(Number(r.rating))}
                          <span className="text-slate-300">
                            {"★".repeat(5 - Number(r.rating))}
                          </span>
                        </p>
                      </div>

                      {r.comment ? (
                        <p className="mt-2 text-sm text-slate-700">
                          {r.comment}
                        </p>
                      ) : null}

                      <p className="mt-2 text-[11px] text-slate-400">
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-md border bg-slate-50 p-4">
                <p className="font-semibold">Leave a review</p>
                <ReviewForm action={addReview} />
              </div>
            </div>

            <Footer />
          </section>

          {/* Right column */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-lg border p-4">
              <p className="text-sm font-semibold text-slate-700">Add to cart</p>
              <button className="mt-3 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Add to Cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
