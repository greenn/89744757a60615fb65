import { NextResponse } from 'next/server';
import { getSessionCookieName, verifySession } from './lib/auth';
export async function middleware(req) {
  const token = req.cookies.get(getSessionCookieName())?.value;
  const payload = await verifySession(token);
  if (!payload) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/account/:path*'] };
