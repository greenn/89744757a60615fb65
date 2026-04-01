'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  async function handleSubmit(event) {
    event.preventDefault(); setError('');
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!response.ok) { const payload = await response.json(); setError(payload.error || 'Ошибка входа'); return; }
    router.push(next); router.refresh();
  }
  return <section className="card"><h1>Вход</h1><form onSubmit={handleSubmit}><input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input type="password" required placeholder="Пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{error ? <p className="error">{error}</p> : null}<button className="btn btn-primary" type="submit">Войти</button></form><p className="helper">Нет аккаунта? <Link href="/register">Зарегистрироваться</Link></p><p className="helper"><Link href="/forgot-password">Забыли пароль?</Link></p></section>;
}
