"use client";

export default function ConfirmDeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this product? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="
        inline-flex
        h-9
        items-center
        justify-center
        rounded-md
        bg-red-600
        px-4
        text-sm
        font-semibold
        text-white
        hover:bg-red-700
        active:bg-red-800
        focus:outline-none
        focus:ring-2
        focus:ring-red-500
        focus:ring-offset-1
      "
    >
      Delete
    </button>
  );
}
