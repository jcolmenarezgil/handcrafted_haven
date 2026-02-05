import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewCard from "@/app/ui/review-card";
import { fetchProductById } from "@/app/lib/data";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details',
};

export default async function ProductPage(props: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const params = await props.params;
  const product = await fetchProductById(params.id);
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">

      <div className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-[1fr_220px]">

          <section className="space-y-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            <div className="rounded-lg border p-5">
              <h1 className="text-2xl font-bold text-center">{product.name}</h1>

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

            <div className="rounded-lg border p-5">
              <h2 className="text-lg font-semibold">Comments / Reviews</h2>
              <div className="mt-4 space-y-4">
                <ReviewCard
                  name="Jamie"
                  rating="★★★★★"
                  text="Super high quality. Arrived quickly and looks even better in person."
                />
                <ReviewCard
                  name="Riley"
                  rating="★★★★☆"
                  text="Beautiful work. Packaging was great. Would buy again."
                />
              </div>

              <div className="mt-5 rounded-md border bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Leave a review</p>
                <p className="text-slate-600">
                  (We'll add the review form next.)
                </p>
              </div>
            </div>

          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-lg border p-4">
              <p className="text-sm font-semibold text-slate-700 text-center">
                Add to cart
              </p>
              <button className="mt-3 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Add to Cart
              </button>
            </div>
          </aside>
      </div>
    </main>
  );
}
