import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true, maxlength: 40 },
    url: { type: String, required: true, trim: true, maxlength: 500 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('SocialLink', socialLinkSchema);
