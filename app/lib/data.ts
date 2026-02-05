import { sql } from '@vercel/postgres';
import { ProductInfo } from './definitions';

export async function fetchProducts() {
  try {
    const data = await sql`
      SELECT 
        p.product_id AS id,
        p.product_name AS name,
        p.product_price AS price,
        p.product_description AS description,
        p.product_image_url AS image_url,
        c.category_name AS category,
        u.user_name AS seller
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN users u ON p.user_id = u.user_id
      ORDER BY p.product_name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await sql`
      SELECT 
        p.product_id AS id,
        p.product_name AS name,
        p.product_price AS price,
        p.product_description AS description,
        p.product_image_url AS image_url,
        c.category_name AS category,
        u.user_name AS seller
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN users u ON p.user_id = u.user_id
      WHERE p.product_id = ${id}
      LIMIT 1
    `;

    return data.rows[0] ?? null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export async function fetchReviewsByProductId(productId: string) {
  try {
    const data = await sql`
      SELECT 
        review_id AS id,
        reviewer_name AS name,
        rating,
        comment,
        created_at
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY created_at DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reviews.");
  }
}

export async function createReview(input: {
  productId: string;
  name: string;
  rating: number;
  comment: string;
}) {
  const { productId, name, rating, comment } = input;

  try {
    await sql`
      INSERT INTO reviews (product_id, reviewer_name, rating, comment)
      VALUES (${productId}, ${name}, ${rating}, ${comment})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create review.");
  }
}

const ITEMS_PER_PAGE = 3; // We don't have that many products yet
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql<ProductInfo>`
      SELECT
        p.product_id AS id,
        p.product_name AS name,
        p.product_price AS price,
        p.product_description AS description,
        p.product_image_url AS image_url,
        c.category_name AS category,
        u.user_name AS seller
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        JOIN users u ON p.user_id = u.user_id
      WHERE
        p.product_name ILIKE ${`%${query}%`} OR
        u.user_name ILIKE ${`%${query}%`} OR
        c.category_name ILIKE ${`%${query}%`} OR
        p.product_description ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN users u ON p.user_id = u.user_id
    WHERE
      product_name ILIKE ${`%${query}%`} OR
      user_name ILIKE ${`%${query}%`} OR
      category_name ILIKE ${`%${query}%`} OR
      product_description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}