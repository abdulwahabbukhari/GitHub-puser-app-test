import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export const COOKIE = 'admin_token';

export const cookieOptions = () => ({
  httpOnly: true, // not readable from JavaScript
  secure: env.isProd, // HTTPS only in production
  sameSite: 'strict',
  path: '/',
});
export const SESSION_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE];
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    const user = await User.findById(payload.sub).select('name email role');
    if (!user) return res.status(401).json({ message: 'Authentication required' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Authentication required' });
  }
}

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'You do not have permission to do this' });

// CSRF defence in depth: SameSite=Strict cookie + a custom header that cross-site forms cannot send.
export function csrfGuard(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.get('X-Requested-With') !== 'portfolio-client') return res.status(403).json({ message: 'Forbidden' });
  next();
}
