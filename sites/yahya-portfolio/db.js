import mongoose from 'mongoose';
import { env } from './env.js';

// Strips query operators ($ne, $gt ...) from user-supplied filters (NoSQL injection defence).
mongoose.set('sanitizeFilter', true);
mongoose.set('strictQuery', true);

export async function connectDB() {
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
  console.log('MongoDB connected');
}
