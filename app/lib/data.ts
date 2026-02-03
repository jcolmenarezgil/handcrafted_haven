import { sql } from '@vercel/postgres';

export async function fetchProducts() {
  try {
    const data = await sql`
      SELECT 
        p.product_id AS id,
        p.product_name AS name,
        p.product_price AS price,
        p.product_description AS description,
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