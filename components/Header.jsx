import Link from 'next/link';
import { getCurrentUser } from '../lib/session';
import LogoutButton from './LogoutButton';
const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/projects', label: 'Проекты' },
  { href: '/services', label: 'Услуги' },
  { href: '/process', label: 'Процесс' },
  { href: '/contacts', label: 'Контакты' }
];
export default async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="header"><div className="container header-row"><div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><Link href="/" style={{ fontWeight: 700 }}>Portfolio UX</Link><nav className="nav">{navItems.map((item) => (<Link key={item.href} href={item.href}>{item.label}</Link>))}</nav></div><div className="auth-block">{user ? (<><Link href="/account" title={user.display_name || user.email}><span className="avatar">{(user.display_name || user.email).slice(0, 1).toUpperCase()}</span></Link><LogoutButton /></>) : (<><Link className="btn" href="/login">Войти</Link><Link className="btn btn-primary" href="/register">Регистрация</Link></>)}</div></div></header>
  );
}
