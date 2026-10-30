import { z } from 'zod';

// Removes HTML tags and control characters, then trims.
const strip = (s) =>
  s.replace(/<[^>]*>/g, '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();

export const text = (max = 200) => z.string().transform(strip).pipe(z.string().max(max));
export const reqText = (max = 200) =>
  z.string().transform(strip).pipe(z.string().min(1, 'is required').max(max));

const httpUrl = /^https?:\/\/[^\s]+$/i;
export const url = z.string().trim().max(500).refine((v) => v === '' || httpUrl.test(v), 'must be an http(s) URL');
export const imageUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === '' || httpUrl.test(v) || /^\/[^\s]*$/.test(v), 'must be an http(s) URL or a /path');
export const tags = z.array(text(40)).max(20);
const order = z.number().int().min(0).max(9999);

export const projectSchema = z
  .object({
    title: reqText(120),
    description: text(1000).default(''),
    image: imageUrl.default(''),
    technologies: tags.default([]),
    projectUrl: url.default(''),
    liveUrl: url.default(''),
    githubUrl: url.default(''),
    order: order.default(0),
    published: z.boolean().default(true),
  })
  .strict();

export const skillSchema = z
  .object({ title: reqText(100), description: text(500).default(''), tags: tags.default([]), order: order.default(0) })
  .strict();

export const serviceSchema = z
  .object({
    title: reqText(100),
    description: text(500).default(''),
    details: text(800).default(''),
    icon: text(30).default('code'),
    order: order.default(0),
  })
  .strict();

export const socialSchema = z
  .object({
    platform: reqText(40),
    url: url.refine((v) => v !== '', 'is required'),
    order: order.default(0),
  })
  .strict();

export const contactSchema = z.object({
  name: reqText(100),
  email: z.string().trim().toLowerCase().email('must be a valid email').max(200),
  subject: reqText(150),
  message: reqText(3000).pipe(z.string().min(10, 'must be at least 10 characters')),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(1).max(128),
});

export const settingsSchema = z
  .object({
    heroName: reqText(80),
    headline: text(160),
    tagline: text(300),
    intro: text(1000),
    aboutText: text(3000),
    education: text(80),
    role: text(80),
    focus: text(80),
    availability: text(80),
    email: z.string().trim().max(200).refine((v) => v === '' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), 'must be a valid email'),
    whatsapp: z.string().trim().regex(/^\d{8,15}$/, 'must be digits only in international format, e.g. 923259126918'),
    seoTitle: text(120),
    seoDescription: text(300),
  })
  .partial()
  .strict();
