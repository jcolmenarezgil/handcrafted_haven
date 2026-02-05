import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { categories, users, products } from '../lib/seed';

export async function GET() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category_name TEXT NOT NULL UNIQUE
      );
    `;
    for (const cat of categories) {
      await client.sql`
        INSERT INTO categories (category_name) VALUES (${cat.name})
        ON CONFLICT (category_name) DO NOTHING;
      `;
    }

    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email TEXT NOT NULL UNIQUE,
        user_name TEXT NOT NULL,
        user_password TEXT NOT NULL,
        user_type TEXT,
        user_profile_image_url TEXT,
        seller_username TEXT UNIQUE,
        seller_description TEXT
      );
    `;
    for (const user of users) {
      await client.sql`
        INSERT INTO users (user_email, user_name, user_password, user_type, user_profile_image_url, seller_username, seller_description)
        VALUES (${user.email}, ${user.name}, ${user.password}, ${user.type}, ${user.profile_image}, ${user.seller_username}, ${user.seller_description})
        ON CONFLICT (user_email) DO NOTHING;
      `;
    }

    // 3. Mapeo de IDs (Para enlazar productos)
    const dbCats = await client.sql`SELECT category_id, category_name FROM categories`;
    const dbUsers = await client.sql`SELECT user_id, seller_username FROM users`;

    const catMap = Object.fromEntries(dbCats.rows.map(r => [r.category_name, r.category_id]));
    const userMap = Object.fromEntries(dbUsers.rows.map(r => [r.seller_username, r.user_id]));

    // 4. Create Products
await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_name TEXT NOT NULL,
        product_price DECIMAL(10,2) NOT NULL,
        product_description TEXT,
        product_image_url TEXT,
        category_id UUID REFERENCES categories(category_id),
        user_id UUID REFERENCES users(user_id)
      );
    `;

for (const prod of products) {
      const categoryId = catMap[prod.categoryName];
      const userId = userMap[prod.sellerName];

      await client.sql`
        INSERT INTO products (product_name, product_price, product_description, product_image_url, category_id, user_id)
        VALUES (${prod.name}, ${prod.price}, ${prod.description}, ${prod.image}, ${categoryId}, ${userId})
        ON CONFLICT DO NOTHING;
      `;
    }

    await client.sql`COMMIT`;
    return NextResponse.json({ message: "Handcrafted Haven: Base de datos poblada con éxito" });

  } catch (error) {
    await client.sql`ROLLBACK`;
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

  // 5. Create Reviews
  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      review_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
      reviewer_name TEXT NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}
