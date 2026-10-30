import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, message) =>
  rateLimit({ windowMs, limit, standardHeaders: 'draft-7', legacyHeaders: false, message: { message } });

export const apiLimiter = make(15 * 60 * 1000, 300, 'Too many requests. Please try again later.');
export const loginLimiter = make(15 * 60 * 1000, 10, 'Too many login attempts. Please try again in 15 minutes.');
export const contactLimiter = make(60 * 60 * 1000, 5, 'You have sent too many messages. Please try again later.');
