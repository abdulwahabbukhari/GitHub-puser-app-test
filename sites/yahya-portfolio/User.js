import mongoose from 'mongoose';

// "Admin" accounts are Users with role "admin" (full access) or "editor" (create/update only).
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    failedLogins: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
