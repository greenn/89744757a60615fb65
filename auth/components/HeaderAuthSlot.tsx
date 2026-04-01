import Link from 'next/link';
import { getServerSessionUser } from '@/lib/auth-server';

export async function HeaderAuthSlot() {
  const user = await getServerSessionUser();

  if (!user) {
    return (
      <div>
        <Link href="/login">Войти</Link>
        <Link href="/register">Регистрация</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/account">{user.name}</Link>
      <form action="/api/auth/logout" method="post" style={{ display: 'inline-block', marginLeft: 8 }}>
        <button type="submit">Выйти</button>
      </form>
    </div>
  );
}
