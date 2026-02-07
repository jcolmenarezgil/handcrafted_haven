"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireSeller } from "@/app/lib/auth";
import { createProduct, createCategory } from "@/app/lib/data";

export async function createProductAction(formData: FormData) {
  const { userId } = await requireSeller();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image_url = String(formData.get("image_url") || "").trim() || null;

  const priceRaw = String(formData.get("price") || "").trim();
  const price = Number(priceRaw);

  const category_id_raw = String(formData.get("category_id") || "").trim();
  const category_other = String(formData.get("category_other") || "").trim();

  if (!name) throw new Error("Name is required");
  if (!Number.isFinite(price) || price <= 0) throw new Error("Price must be > 0");

  let category_id = category_id_raw;

  // 👇 if they chose "other", create/find category and use its id
  if (category_id_raw === "__other__") {
    if (!category_other) throw new Error("Please type a category name");
    category_id = await createCategory(category_other);
  }

  if (!category_id) throw new Error("Category is required");

  await createProduct(userId, {
    name,
    price,
    description,
    image_url,
    category_id,
  });

  revalidatePath("/management");
  revalidatePath("/management/new"); // refresh dropdown list
  redirect("/management");
}