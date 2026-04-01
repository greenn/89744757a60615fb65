import { NextResponse } from 'next/server';
export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
  return NextResponse.json({ ok: true });
}
