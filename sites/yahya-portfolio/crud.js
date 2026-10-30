// Generic CRUD controller used for projects, services, skills and social links.
export const crud = (Model, schema) => ({
  list: async (_req, res) => res.json(await Model.find().sort({ order: 1, createdAt: -1 }).lean()),

  create: async (req, res) => {
    const data = schema.parse(req.body);
    res.status(201).json(await Model.create(data));
  },

  update: async (req, res) => {
    const data = schema.partial().parse(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  },

  remove: async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  },
});
