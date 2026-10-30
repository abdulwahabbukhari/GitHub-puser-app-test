import { Router } from 'express';
import { ah } from '../utils/asyncHandler.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { loginLimiter, contactLimiter } from '../middleware/rateLimit.js';
import { crud } from '../controllers/crud.js';
import * as auth from '../controllers/authController.js';
import * as pub from '../controllers/publicController.js';
import * as admin from '../controllers/adminController.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import SocialLink from '../models/SocialLink.js';
import { projectSchema, skillSchema, serviceSchema, socialSchema } from '../utils/validators.js';

const router = Router();

// ---- Public ----
router.get('/health', (_req, res) => res.json({ ok: true }));
router.get('/public', ah(pub.publicData));
router.post('/contact', contactLimiter, ah(pub.sendMessage));

// ---- Auth ----
router.post('/auth/login', loginLimiter, ah(auth.login));
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAuth, auth.me);

// ---- Admin (authentication required) ----
const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.get('/stats', ah(admin.stats));

// Editors and admins can list/create/update; only admins can delete.
const mount = (path, controller) => {
  adminRouter.get(`/${path}`, ah(controller.list));
  adminRouter.post(`/${path}`, ah(controller.create));
  adminRouter.put(`/${path}/:id`, ah(controller.update));
  adminRouter.delete(`/${path}/:id`, requireRole('admin'), ah(controller.remove));
};
mount('projects', crud(Project, projectSchema));
mount('skills', crud(Skill, skillSchema));
mount('services', crud(Service, serviceSchema));
mount('social', crud(SocialLink, socialSchema));

adminRouter.get('/messages', ah(admin.listMessages));
adminRouter.patch('/messages/:id/read', ah(admin.markRead));
adminRouter.delete('/messages/:id', requireRole('admin'), ah(admin.deleteMessage));

adminRouter.get('/settings', ah(admin.getSiteSettings));
adminRouter.put('/settings', requireRole('admin'), ah(admin.updateSiteSettings));

router.use('/admin', adminRouter);
export default router;
