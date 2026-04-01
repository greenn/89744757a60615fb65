import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = String(body?.email || '').trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
  }

  // Здесь должен быть вызов почтового провайдера + одноразовый reset token.
  // Ответ всегда одинаковый, чтобы не раскрывать существование email.
  return NextResponse.json({
    ok: true,
    message: 'Если аккаунт существует, мы отправили инструкцию на почту.',
  });
}
