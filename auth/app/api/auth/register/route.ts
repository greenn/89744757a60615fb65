import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/user-store';
import { signAuthToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password || String(password).length < 8) {
    return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
  }

  try {
    const user = await createUser({ name, email, password });
    const token = await signAuthToken({ sub: user.id, email: user.email, name: user.name, role: user.role });

    const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
    res.cookies.set('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
      return NextResponse.json({ error: 'Пользователь уже существует' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
