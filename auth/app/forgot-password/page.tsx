'use client';

import { FormEvent, useState } from 'react';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data?.message || 'Если аккаунт существует, мы отправили инструкцию на почту.');
  }

  return (
    <main>
      <h1>Восстановление пароля</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Отправить</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
