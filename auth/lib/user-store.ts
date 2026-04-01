import { hashPassword } from './password';

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  role?: string;
  created_at: string;
  updated_at: string;
};

const users = new Map<string, User>();

export async function createUser(input: { name: string; email: string; password: string }): Promise<User> {
  const email = input.email.toLowerCase().trim();
  if (users.has(email)) {
    throw new Error('EMAIL_EXISTS');
  }

  const now = new Date().toISOString();
  const user: User = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email,
    password_hash: await hashPassword(input.password),
    created_at: now,
    updated_at: now,
    role: 'user',
  };

  users.set(email, user);
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return users.get(email.toLowerCase().trim()) || null;
}
