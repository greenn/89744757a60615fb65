'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || 'Ошибка регистрации');
      return;
    }

    router.push('/account');
    router.refresh();
  }

  return (
    <main>
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Имя" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" minLength={8} placeholder="Пароль" required />
        <button type="submit" disabled={loading}>{loading ? 'Создаем...' : 'Создать аккаунт'}</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
