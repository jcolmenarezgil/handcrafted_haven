"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireSeller } from "@/app/lib/auth";
import {
  createProduct,
  createCategory,
  updateProduct,
  deleteProduct,
  fetchProductByIdForSeller,
} from "@/app/lib/data";

const DEFAULT_IMAGE =
  "https://pv9c8slz3a7mqr1m.public.blob.vercel-storage.com/products/Gemini_Generated_Image_ryk4txryk4txryk4-v0nBeKGwWtFZ63sMeMBy75YSWQwCPe.png";

export async function createProductAction(formData: FormData) {
  const { userId } = await requireSeller();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priceRaw = String(formData.get("price") || "").trim();
  const price = Number(priceRaw);

  const category_id_raw = String(formData.get("category_id") || "").trim();
  const category_other = String(formData.get("category_other") || "").trim();

  if (!name) throw new Error("Name is required");
  if (!description) throw new Error("Description is required");
  if (!Number.isFinite(price) || price <= 0) throw new Error("Price must be > 0");

  let category_id = category_id_raw;

  if (category_id_raw === "__other__") {
    if (!category_other) throw new Error("Please type a category name");
    category_id = await createCategory(category_other);
  }

  if (!category_id) throw new Error("Category is required");

  const imageUrlRaw = String(formData.get("image_url") || "").trim();
  const image_url = imageUrlRaw !== "" ? imageUrlRaw : DEFAULT_IMAGE;

  await createProduct(userId, {
    name,
    price,
    description,
    image_url,
    category_id,
  });

  revalidatePath("/management");
  revalidatePath("/management/new");
  redirect("/management");
}

export async function updateProductAction(formData: FormData) {
  const { userId } = await requireSeller();

  const productId = String(formData.get("productId") || "").trim();
  if (!productId) throw new Error("Missing productId");

  // Make sure seller owns it
  const existing = await fetchProductByIdForSeller(userId, productId);
  if (!existing) throw new Error("Product not found or not yours");

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(String(formData.get("price") || "").trim());

  const category_id_raw = String(formData.get("category_id") || "").trim();
  const category_other = String(formData.get("category_other") || "").trim();

  if (!name) throw new Error("Name is required");
  if (!description) throw new Error("Description is required");
  if (!Number.isFinite(price) || price <= 0) throw new Error("Price must be > 0");

  let category_id = category_id_raw;
  if (category_id_raw === "__other__") {
    if (!category_other) throw new Error("Please type a category name");
    category_id = await createCategory(category_other);
  }
  if (!category_id) throw new Error("Category is required");

  // If user leaves image blank on edit, KEEP the existing image
  const imageUrlRaw = String(formData.get("image_url") || "").trim();
  const image_url = imageUrlRaw !== "" ? imageUrlRaw : (existing.image_url || DEFAULT_IMAGE);

  await updateProduct(userId, productId, {
    name,
    price,
    description,
    image_url,
    category_id,
  });

  revalidatePath("/management");
  redirect("/management");
}

export async function deleteProductAction(formData: FormData) {
  const { userId } = await requireSeller();

  const productId = String(formData.get("productId") || "").trim();
  if (!productId) throw new Error("Missing productId");

  await deleteProduct(userId, productId);

  revalidatePath("/management");
  redirect("/management");
}
