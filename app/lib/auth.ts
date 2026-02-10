import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const SESSION_COOKIE = "this_session";
const SESSION_DAYS = 14;

function mustGetAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET env var");
  return secret;
}

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

function expiresAtDate(days = SESSION_DAYS) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export type UserRole = "basic" | "seller" | "admin";

export type CurrentUser = {
  id: string;
  name: string;
  type: UserRole;
  email: string;
};

export async function createSession(userId: string) {
  const token = newToken();
  const secret = mustGetAuthSecret();
  const tokenHash = sha256(token + secret);

  const sessionId = crypto.randomUUID();
  const expiresAt = expiresAtDate();

  await sql`
    INSERT INTO sessions (session_id, user_id, session_token_hash, expires_at)
    VALUES (${sessionId}, ${userId}, ${tokenHash}, ${expiresAt.toISOString()})
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return sessionId;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  cookieStore.delete(SESSION_COOKIE);

  if (!token) return;

  const secret = mustGetAuthSecret();
  const tokenHash = sha256(token + secret);

  await sql`DELETE FROM sessions WHERE session_token_hash = ${tokenHash}`;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const secret = mustGetAuthSecret();
  const tokenHash = sha256(token + secret);

  const { rows } = await sql`
    SELECT
      u.user_id AS id,
      u.user_name AS name,
      u.user_type AS type,
      u.user_email AS email
    FROM sessions s
    JOIN users u ON u.user_id = s.user_id
    WHERE s.session_token_hash = ${tokenHash}
      AND s.expires_at > NOW()
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    type: user.type,
    email: user.email,
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireManager() {
  const user = await requireAuth();
  if (user.type !== "seller" && user.type !== "admin") redirect("/products");
  return { userId: user.id, role: user.type };
}
