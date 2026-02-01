import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Validating query connection",
    status: 200
  });
}