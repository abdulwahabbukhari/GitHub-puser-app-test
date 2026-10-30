// Usage: npm run seed
// Creates the first admin (from ADMIN_EMAIL / ADMIN_PASSWORD), default settings, and starter content.
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Skill from './models/Skill.js';
import Service from './models/Service.js';
import Project from './models/Project.js';
import { getSettings } from './models/SiteSettings.js';

await connectDB();

if (env.adminEmail && env.adminPassword) {
  if (env.adminPassword.length < 12) {
    console.error('ADMIN_PASSWORD must be at least 12 characters.');
    process.exit(1);
  }
  const existing = await User.findOne({ email: env.adminEmail });
  if (existing) console.log(`Admin ${env.adminEmail} already exists - left unchanged.`);
  else {
    await User.create({
      name: env.adminName,
      email: env.adminEmail,
      passwordHash: await bcrypt.hash(env.adminPassword, 12),
      role: 'admin',
    });
    console.log(`Admin created: ${env.adminEmail}`);
  }
} else {
  console.log('ADMIN_EMAIL / ADMIN_PASSWORD not set - no admin created.');
}

await getSettings();

if ((await Skill.countDocuments()) === 0) {
  await Skill.insertMany([
    { order: 1, title: 'Website Development', description: 'Building responsive, clean websites that are easy to use and easy to maintain.', tags: ['Web Design', 'Responsive Layouts', 'Frontend'] },
    { order: 2, title: 'Photo & Video Editing', description: 'Editing photos and videos into polished visuals for personal and social-media use.', tags: ['Photo Editing', 'Video Editing', 'Social Visuals'] },
    { order: 3, title: 'Advertisement Making', description: 'Designing promotional creatives and digital advertisements with a clear message.', tags: ['Promotional Design', 'Ad Creatives'] },
    { order: 4, title: 'MS Office', description: 'Preparing documents, presentations and spreadsheets for study and work.', tags: ['Word', 'Excel', 'PowerPoint'] },
    { order: 5, title: 'English Communication', description: 'Clear written and spoken English for working with clients and audiences.', tags: ['Written English', 'Spoken English'] },
    { order: 6, title: 'Digital Content Creation', description: 'Planning and producing content for social media platforms.', tags: ['Social Media', 'Short-form Content'] },
  ]);
  console.log('Skills seeded');
}

if ((await Service.countDocuments()) === 0) {
  await Service.insertMany([
    { order: 1, icon: 'code', title: 'Website Development', description: 'Modern responsive websites designed for performance, usability and professional presentation.', details: 'From a simple personal page to a multi-section business site: planned around your content and built to work on every screen.' },
    { order: 2, icon: 'film', title: 'Photo & Video Editing', description: 'Clean and creative visual editing for personal and social-media content.', details: 'Colour, cropping, cuts and finishing touches so your photos and videos look consistent and ready to post.' },
    { order: 3, icon: 'megaphone', title: 'Advertisement Creation', description: 'Creative promotional designs and digital advertisements.', details: 'Posters, social ads and promotional graphics built around your offer and your audience.' },
    { order: 4, icon: 'file', title: 'MS Office Services', description: 'Professional documents, presentations and spreadsheet-related work.', details: 'Word documents, PowerPoint decks and Excel sheets that are tidy, well formatted and easy to read.' },
    { order: 5, icon: 'share', title: 'Social Media Content', description: 'Creative content and digital presentation for social platforms.', details: 'Content ideas and finished posts or clips shaped for the platform they will be shared on.' },
    { order: 6, icon: 'support', title: 'Digital Assistance', description: 'Practical help with everyday digital and technology tasks.', details: 'Hands-on help with the everyday digital tasks that slow you down.' },
  ]);
  console.log('Services seeded');
}

if ((await Project.countDocuments()) === 0) {
  await Project.insertMany(
    [1, 2, 3].map((n) => ({
      order: n,
      title: `Sample project ${n}`,
      description: 'Placeholder entry. Replace this title, description, image and links from the Admin Panel.',
      technologies: ['Add', 'Your', 'Tech'],
    }))
  );
  console.log('Placeholder projects seeded');
}

await mongoose.disconnect();
console.log('Seed complete');
