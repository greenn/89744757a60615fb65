'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [error, setError] = useState('');
  async function handleSubmit(event) {
    event.preventDefault(); setError('');
    const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!response.ok) { const payload = await response.json(); setError(payload.error || 'Ошибка регистрации'); return; }
    router.push('/account'); router.refresh();
  }
  return <section className="card"><h1>Регистрация</h1><form onSubmit={handleSubmit}><input type="text" required placeholder="Имя" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /><input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input type="password" required minLength={8} placeholder="Пароль (минимум 8 символов)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{error ? <p className="error">{error}</p> : null}<button className="btn btn-primary" type="submit">Создать аккаунт</button></form><p className="helper">Уже есть аккаунт? <Link href="/login">Войти</Link></p></section>;
}
