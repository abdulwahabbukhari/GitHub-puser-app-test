import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import SocialLink from '../models/SocialLink.js';
import Message from '../models/Message.js';
import { getSettings } from '../models/SiteSettings.js';
import SiteSettings from '../models/SiteSettings.js';
import { settingsSchema } from '../utils/validators.js';

export async function stats(_req, res) {
  const [projects, messages, unread, services, skills, socials] = await Promise.all([
    Project.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Service.countDocuments(),
    Skill.countDocuments(),
    SocialLink.countDocuments(),
  ]);
  res.json({ projects, messages, unread, services, skills, socials });
}

export const listMessages = async (_req, res) => res.json(await Message.find().sort({ createdAt: -1 }).lean());

export async function markRead(req, res) {
  const read = req.body?.read !== false;
  const doc = await Message.findByIdAndUpdate(req.params.id, { read }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}

export async function deleteMessage(req, res) {
  const doc = await Message.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
}

export const getSiteSettings = async (_req, res) => res.json(await getSettings());

export async function updateSiteSettings(req, res) {
  const data = settingsSchema.parse(req.body);
  await getSettings(); // make sure the singleton exists
  res.json(await SiteSettings.findOneAndUpdate({}, data, { new: true, runValidators: true }));
}
