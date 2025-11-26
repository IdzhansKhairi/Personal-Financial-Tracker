// lib/auth.ts
import bcrypt from "bcrypt";
import crypto from "crypto";
import { openDB } from "./db";
import { cookies } from "next/headers";

const SALT_ROUNDS = 10;
const SESSION_DURATION_DAYS = 7;
const SESSION_COOKIE_NAME = "session_token";

export interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  is_active: number;
  created_at: string;
}

export interface Session {
  id: number;
  user_id: number;
  session_token: string;
  expires_at: string;
  created_at: string;
}

export interface SessionWithUser extends Session {
  user: User;
}

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate a cryptographically secure session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Create a new session for a user
export async function createSession(userId: number): Promise<string> {
  const db = await openDB();
  const sessionToken = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await db.run(
    `INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)`,
    [userId, sessionToken, expiresAt.toISOString()]
  );

  await db.close();
  return sessionToken;
}

// Get session by token and validate expiration
export async function getSessionByToken(token: string): Promise<SessionWithUser | null> {
  const db = await openDB();

  const session = await db.get<SessionWithUser>(
    `SELECT
      s.*,
      u.id as user_id,
      u.username,
      u.email,
      u.phone_number,
      u.first_name,
      u.last_name,
      u.is_active
    FROM sessions s
    INNER JOIN users u ON s.user_id = u.id
    WHERE s.session_token = ? AND s.expires_at > datetime('now') AND u.is_active = 1`,
    [token]
  );

  await db.close();

  if (!session) {
    return null;
  }

  // Restructure to match SessionWithUser interface
  const result: SessionWithUser = {
    id: session.id,
    user_id: session.user_id,
    session_token: session.session_token,
    expires_at: session.expires_at,
    created_at: session.created_at,
    user: {
      id: session.user_id,
      username: session.username,
      email: session.email,
      phone_number: session.phone_number,
      first_name: session.first_name,
      last_name: session.last_name,
      is_active: session.is_active,
      created_at: session.created_at,
    },
  };

  return result;
}

// Delete a session (logout)
export async function deleteSession(token: string): Promise<void> {
  const db = await openDB();
  await db.run(`DELETE FROM sessions WHERE session_token = ?`, [token]);
  await db.close();
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
  const db = await openDB();
  await db.run(`DELETE FROM sessions WHERE expires_at < datetime('now')`);
  await db.close();
}

// Verify user credentials and return user if valid
export async function verifyUserCredentials(
  username: string,
  password: string
): Promise<User | null> {
  const db = await openDB();

  const user = await db.get<User & { password_hash: string }>(
    `SELECT * FROM users WHERE username = ? AND is_active = 1`,
    [username]
  );

  await db.close();

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  // Remove password_hash from returned user object
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Get current session from cookies
export async function getCurrentSession(): Promise<SessionWithUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return getSessionByToken(token);
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  const session = await getCurrentSession();
  return session?.user ?? null;
}
