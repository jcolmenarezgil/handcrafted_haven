import { sql } from '@vercel/postgres';
import { ArtisanCardInfo, ProductInfo } from './definitions';

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

export type SellerProduct = {
  id: string;
  name: string;
  price: string; 
  description: string | null;
  image_url: string | null;
  category: string;
};

export async function fetchProductsBySeller(userId: string): Promise<SellerProduct[]> {
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
  return data.rows as SellerProduct[];
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

const ITEMS_PER_P_PAGE = 5; // We don't have that many products yet
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
  category: string,
  minPrice: string,
  maxPrice: string,
  orderBy: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_P_PAGE;

  try {    
    const { rows } = await sql<ProductInfo>`
      SELECT
        p.product_id AS id,
        p.product_name AS name,
        p.product_price AS price,
        p.product_description AS description,
        p.product_image_url AS image_url,
        c.category_name AS category,
        u.user_name AS seller,
        COALESCE(AVG(r.rating), 0) AS rating
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        JOIN users u ON p.user_id = u.user_id
        LEFT JOIN reviews r ON r.product_id = p.product_id
      WHERE
        (p.product_name ILIKE ${`%${query}%`} OR
        c.category_name ILIKE ${`%${query}%`} OR
        p.product_description ILIKE ${`%${query}%`})
      AND 
      (${category} = '' OR p.category_id::text = ${category})
      AND
        (${minPrice} = 0 OR p.product_price >= ${minPrice})
      AND
        (${maxPrice} = 99999 OR p.product_price <= ${maxPrice})
      GROUP BY
        p.product_id, p.product_name, c.category_name, u.user_name, p.product_price, p.product_image_url, p.product_description
      ORDER BY 
        CASE WHEN ${orderBy} = 'price_asc' THEN p.product_price END ASC,
        CASE WHEN ${orderBy} = 'price_desc' THEN p.product_price END DESC,
        name ASC
      LIMIT ${ITEMS_PER_P_PAGE} OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductsPages(
  query: string,
  category: string,
  minPrice: string,
  maxPrice: string,) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN users u ON p.user_id = u.user_id
    WHERE
      (product_name ILIKE ${`%${query}%`} OR
      category_name ILIKE ${`%${query}%`} OR
      product_description ILIKE ${`%${query}%`})
      AND
      (${category} = '' OR p.category_id::text = ${category})
      AND
      (${minPrice} = 0 OR p.product_price >= ${minPrice})
      AND
      (${maxPrice} = 99999 OR p.product_price <= ${maxPrice})
  `;

    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_P_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of artisans.');
  }
}

const ITEMS_PER_A_PAGE = 5; // We don't have that many artisans yet
export async function fetchFilteredArtisans(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_A_PAGE;

  try {
    const { rows } = await sql<ArtisanCardInfo>`
      SELECT
        u.user_id AS id,
        u.user_name AS name,
        u.user_profile_image_url AS profile_image,
        u.seller_username AS business_name,
        u.seller_description AS description,
        COALESCE(AVG(r.rating), 0) AS rating
      FROM users u
      LEFT JOIN products p ON p.user_id = u.user_id
      LEFT JOIN reviews r ON r.product_id = p.product_id
      WHERE
        u.user_name ILIKE ${`%${query}%`} OR
        u.seller_username ILIKE ${`%${query}%`}
      GROUP BY
        u.user_id
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_A_PAGE} OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artisans.');
  }
}

export async function fetchArtisansPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      user_name ILIKE ${`%${query}%`} OR
      seller_username ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_A_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of artisans.');
  }
}

export type Category = { id: string; name: string };

export async function fetchCategories(): Promise<Category[]> {
  const data = await sql`
    SELECT category_id AS id, category_name AS name
    FROM categories
    ORDER BY category_name ASC
  `;
  return data.rows as Category[];
}

export async function createCategory(name: string): Promise<string> {
  const clean = name.trim();
  if (!clean) throw new Error("Category name is required");

  const inserted = await sql`
    INSERT INTO categories (category_name)
    VALUES (${clean})
    ON CONFLICT (category_name) DO UPDATE SET category_name = EXCLUDED.category_name
    RETURNING category_id AS id
  `;

  return inserted.rows[0].id as string;
}

export async function fetchProductByIdForSeller(userId: string, productId: string) {
  const data = await sql`
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.product_price AS price,
      p.product_description AS description,
      p.product_image_url AS image_url,
      p.category_id AS category_id
    FROM products p
    WHERE p.product_id = ${productId} AND p.user_id = ${userId}
    LIMIT 1
  `;
  return data.rows[0] ?? null;
}
