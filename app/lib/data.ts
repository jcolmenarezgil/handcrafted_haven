import { sql } from '@vercel/postgres';

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

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  image_url: string | null;
  category_id: string; 
};

export async function fetchProductsBySeller(userId: string) {
  const data = await sql`
    SELECT 
      p.product_id AS id,
      p.product_name AS name,
      p.product_price AS price,
      p.product_description AS description,
      p.product_image_url AS image_url,
      c.category_name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.user_id = ${userId}
    ORDER BY p.product_name ASC
  `;
  return data.rows;
}

export async function createProduct(userId: string, input: ProductInput) {
  const { name, price, description, image_url, category_id } = input;

  const result = await sql`
    INSERT INTO products (product_name, product_price, product_description, product_image_url, category_id, user_id)
    VALUES (${name}, ${price}, ${description}, ${image_url}, ${category_id}, ${userId})
    RETURNING product_id AS id
  `;

  return result.rows[0]?.id as string;
}

export async function updateProduct(userId: string, productId: string, input: ProductInput) {
  const { name, price, description, image_url, category_id } = input;

  // Makes sure the user can only update their own products
  const result = await sql`
    UPDATE products
    SET
      product_name = ${name},
      product_price = ${price},
      product_description = ${description},
      product_image_url = ${image_url},
      category_id = ${category_id}
    WHERE product_id = ${productId} AND user_id = ${userId}
    RETURNING product_id
  `;

  return result.rows.length === 1;
}

export async function deleteProduct(userId: string, productId: string) {
  const result = await sql`
    DELETE FROM products
    WHERE product_id = ${productId} AND user_id = ${userId}
    RETURNING product_id
  `;
  return result.rows.length === 1;
}
