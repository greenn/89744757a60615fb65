import { NextResponse } from 'next/server';
import { getSessionCookieName, signSession, verifyPassword } from '../../../../lib/auth';
import { query } from '../../../../lib/db';
export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
  const result = await query(`SELECT id, email, display_name, password_hash FROM users WHERE email = $1 LIMIT 1`, [email.toLowerCase()]);
  const user = result.rows[0];
  if (!user) return NextResponse.json({ error: 'Неверные учетные данные' }, { status: 401 });
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return NextResponse.json({ error: 'Неверные учетные данные' }, { status: 401 });
  const jwt = await signSession({ sub: String(user.id), email: user.email });
  const response = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, display_name: user.display_name } });
  response.cookies.set(getSessionCookieName(), jwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
