import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    revalidatePath(`/products/${productId}`);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>

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
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p>
            <span className="font-semibold">Made by:</span> {product.seller}
          </p>
          <p className="text-slate-600">
            {product.description || "No description yet."}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 rounded-lg border p-5">
        <h2 className="text-lg font-semibold">Comments / Reviews</h2>

        <div className="mt-4 space-y-3">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-600">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
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
                  <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
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
    </main>
  );
}
