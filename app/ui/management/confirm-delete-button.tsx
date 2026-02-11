"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom"; // Hook clave
import { TrashIcon, ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function ConfirmDeleteButton() {
  const [isConfirming, setIsConfirming] = useState(false);
  // useFormStatus nos dirá si el formulario padre se está enviando
  const { pending } = useFormStatus();

  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => setIsConfirming(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  return (
    <button
      type={isConfirming ? "submit" : "button"}
      disabled={pending}
      onClick={(e) => {
        if (!isConfirming) {
          e.preventDefault();
          setIsConfirming(true);
        }
      }}
      className={`
        relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-bold transition-all duration-300
        ${isConfirming
          ? "bg-red-600 text-white shadow-lg shadow-red-200"
          : "bg-white border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500"
        }
        ${pending ? "opacity-70 cursor-wait" : "active:scale-95"}
      `}
    >
      <div className="flex items-center gap-2">
        {pending ? (
          <>
            <ArrowPathIcon className="w-4 h-4 animate-spin" />
            <span>Removing...</span>
          </>
        ) : isConfirming ? (
          <>
            <ExclamationTriangleIcon className="w-4 h-4 animate-bounce" />
            <span>Confirm?</span>
          </>
        ) : (
          <>
            <TrashIcon className="w-4 h-4" />
            <span>Delete</span>
          </>
        )}
      </div>

      {isConfirming && !pending && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-[progress_4s_linear]" />
      )}
    </button>
  );
}