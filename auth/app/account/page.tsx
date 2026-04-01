import { redirect } from 'next/navigation';
import { getServerSessionUser } from '@/lib/auth-server';

export default async function AccountPage() {
  const user = await getServerSessionUser();
  if (!user) redirect('/login');

  return (
    <main>
      <h1>Личный кабинет</h1>
      <p>Здравствуйте, {user.name}</p>
      <form action="/api/auth/logout" method="post">
        <button type="submit">Выйти</button>
      </form>
    </main>
  );
}
