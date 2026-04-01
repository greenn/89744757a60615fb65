import { NextResponse } from 'next/server';
import { hashPassword, signSession, getSessionCookieName } from '../../../../lib/auth';
import { query } from '../../../../lib/db';
export async function POST(req) {
  const { displayName, email, password } = await req.json();
  if (!displayName || !email || !password || password.length < 8) return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
  const existing = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email.toLowerCase()]);
  if (existing.rowCount) return NextResponse.json({ error: 'Email уже используется' }, { status: 409 });
  const passwordHash = await hashPassword(password);
  const result = await query(`INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name`, [email.toLowerCase(), passwordHash, displayName]);
  const user = result.rows[0];
  const jwt = await signSession({ sub: String(user.id), email: user.email });
  const response = NextResponse.json({ ok: true, user });
  response.cookies.set(getSessionCookieName(), jwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
