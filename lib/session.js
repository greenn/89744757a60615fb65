import { cookies } from 'next/headers';
import { query } from './db';
import { getSessionCookieName, verifySession } from './auth';
export async function getCurrentUser() {
  const token = cookies().get(getSessionCookieName())?.value;
  const payload = await verifySession(token);
  if (!payload?.sub) return null;
  const result = await query('SELECT id, email, display_name, avatar_url FROM users WHERE id = $1 LIMIT 1', [payload.sub]);
  return result.rows[0] || null;
}
