import './globals.css';
import Header from '../components/Header';
export const metadata = { title: 'Product Designer Portfolio', description: 'Портфолио с системой авторизации' };
export default function RootLayout({ children }) {
  return <html lang="ru"><body><Header /><main><div className="container">{children}</div></main></body></html>;
}
