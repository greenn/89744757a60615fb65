import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
const encoder = new TextEncoder();
const SESSION_COOKIE = 'portfolio_session';
function jwtSecret() { const secret = process.env.JWT_SECRET; if (!secret) throw new Error('JWT_SECRET is not set'); return encoder.encode(secret); }
export function getSessionCookieName() { return SESSION_COOKIE; }
export async function hashPassword(password) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password, hash) { return bcrypt.compare(password, hash); }
export async function signSession(payload) { return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(jwtSecret()); }
export async function verifySession(token) { if (!token) return null; try { const { payload } = await jwtVerify(token, jwtSecret()); return payload; } catch { return null; } }
