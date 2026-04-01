import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/user-store';
import { verifyPassword } from '@/lib/password';
import { signAuthToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = String(body?.email || '');
  const password = String(body?.password || '');

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Неверные email или пароль' }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    return NextResponse.json({ error: 'Неверные email или пароль' }, { status: 401 });
  }

  const token = await signAuthToken({ sub: user.id, email: user.email, name: user.name, role: user.role });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
