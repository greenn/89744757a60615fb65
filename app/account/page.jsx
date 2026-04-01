import { getCurrentUser } from '../../lib/session';
export default async function AccountPage() {
  const user = await getCurrentUser();
  return <section className="card"><h1>Личный кабинет</h1><p>Вы вошли как: <strong>{user?.display_name || user?.email}</strong></p><p className="helper">Маршрут защищен middleware. Если сессия невалидна, произойдет редирект на /login.</p></section>;
}
