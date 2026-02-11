"use client";

import { useState } from "react";
import StarRating from "@/app/ui/star-rating";

export default function ReviewForm({
  action,
}: {
  action: (fd: FormData) => void;
}) {
  const [rating, setRating] = useState(5);

  return (
    <form action={action} className="mt-3 space-y-3">
      <div className="flex items-center gap-3">
        <StarRating value={rating} onChange={setRating} />
        <span className="text-sm text-slate-600">{rating}/5</span>
      </div>

      <input type="hidden" name="rating" value={rating} />

      <input
        name="name"
        placeholder="Your name"
        className="w-full rounded-md border px-3 py-2 text-sm"
        required
      />

      <textarea
        name="comment"
        placeholder="Write a comment (optional)"
        className="w-full rounded-md border px-3 py-2 text-sm"
        rows={3}
      />

      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Post Review
      </button>
    </form>
  );
}
