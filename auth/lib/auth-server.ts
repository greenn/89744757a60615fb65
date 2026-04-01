import { cookies } from 'next/headers';
import { verifyAuthToken } from './jwt';

export async function getServerSessionUser() {
  const token = (await cookies()).get('auth_token')?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}
