'use client';
import { useState } from 'react';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    if (response.ok) setMessage('Если email существует, мы отправили инструкции по восстановлению.');
  }
  return <section className="card"><h1>Восстановление пароля</h1><form onSubmit={handleSubmit}><input type="email" required placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} /><button className="btn btn-primary" type="submit">Отправить инструкции</button></form>{message ? <p className="helper">{message}</p> : null}</section>;
}
