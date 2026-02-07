"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireSeller } from "@/app/lib/auth";
import { createProduct } from "@/app/lib/data";

export async function createProductAction(formData: FormData) {
  const { userId } = await requireSeller();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image_url = String(formData.get("image_url") || "").trim() || null;

  // price comes in as string from the form
  const priceRaw = String(formData.get("price") || "").trim();
  const price = Number(priceRaw);

  const category_id = String(formData.get("category_id") || "").trim();

  // basic validation
  if (!name) throw new Error("Name is required");
  if (!Number.isFinite(price) || price <= 0) throw new Error("Price must be > 0");
  if (!category_id) throw new Error("Category is required");

  const newId = await createProduct(userId, {
    name,
    price,
    description,
    image_url,
    category_id,
  });

  revalidatePath("/management");
  redirect("/management");
}
