import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { loginSchema } from '../utils/validators.js';
import { COOKIE, cookieOptions, SESSION_MS } from '../middleware/auth.js';

const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;
// Compared against when the email is unknown, so response time does not reveal valid accounts.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

export async function login(req, res) {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email });

  if (user?.lockUntil && user.lockUntil > new Date()) {
    return res.status(429).json({ message: 'Account temporarily locked after failed attempts. Try again in 15 minutes.' });
  }

  const valid = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !valid) {
    if (user) {
      user.failedLogins += 1;
      if (user.failedLogins >= MAX_FAILS) {
        user.lockUntil = new Date(Date.now() + LOCK_MS);
        user.failedLogins = 0;
      }
      await user.save();
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  user.failedLogins = 0;
  user.lockUntil = null;
  await user.save();

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { algorithm: 'HS256', expiresIn: '2h' });
  res.cookie(COOKIE, token, { ...cookieOptions(), maxAge: SESSION_MS });
  res.json({ user: { name: user.name, email: user.email, role: user.role } });
}

export function logout(_req, res) {
  res.clearCookie(COOKIE, cookieOptions());
  res.json({ ok: true });
}

export const me = (req, res) => res.json({ user: { name: req.user.name, email: req.user.email, role: req.user.role } });
