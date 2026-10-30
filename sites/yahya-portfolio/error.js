import { ZodError } from 'zod';
import { env } from '../config/env.js';

export const notFound = (_req, res) => res.status(404).json({ message: 'Not found' });

// Never leaks stack traces, database errors or secrets to clients.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    const i = err.issues[0];
    const field = i.path.join('.');
    return res.status(400).json({ message: field ? `${field} ${i.message}` : i.message });
  }
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: 'Invalid data' });
  if (err.code === 11000) return res.status(409).json({ message: 'Already exists' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON' });
  if (err.type === 'entity.too.large') return res.status(413).json({ message: 'Request too large' });

  console.error(env.isProd ? err.message : err); // logged on the server only
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
}
