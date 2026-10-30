import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';

try {
  await connectDB();
} catch (err) {
  console.error('Could not connect to MongoDB:', err.message);
  process.exit(1);
}

const server = app.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`));

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
