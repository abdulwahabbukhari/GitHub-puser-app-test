import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import SocialLink from '../models/SocialLink.js';
import Message from '../models/Message.js';
import { getSettings } from '../models/SiteSettings.js';
import { contactSchema } from '../utils/validators.js';

const sort = { order: 1, createdAt: 1 };

// One request returns everything the public site needs.
export async function publicData(_req, res) {
  const [settings, skills, services, projects, socials] = await Promise.all([
    getSettings().then((s) => s.toObject()),
    Skill.find().sort(sort).lean(),
    Service.find().sort(sort).lean(),
    Project.find({ published: true }).sort(sort).lean(),
    SocialLink.find().sort(sort).lean(),
  ]);
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ settings, skills, services, projects, socials });
}

export async function sendMessage(req, res) {
  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (req.body?.website) return res.status(201).json({ ok: true });
  const data = contactSchema.parse(req.body);
  await Message.create(data);
  res.status(201).json({ ok: true });
}
