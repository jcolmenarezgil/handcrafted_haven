import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();

  try {
    // If your DB already has uuid-ossp, great. If not, this can fail on some providers,
    // so it's optional. Uncomment only if you know it's allowed.
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        review_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
        reviewer_name TEXT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // quick verify
    const check = await client.sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'reviews'
    `;

    return NextResponse.json({
      ok: true,
      created: check.rows.length === 1,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? String(error) },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
