// Removes keys that could be used for NoSQL operator injection ("$where", "a.b").
const clean = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) delete obj[key];
    else clean(obj[key]);
  }
  return obj;
};

export function sanitize(req, _res, next) {
  clean(req.body);
  clean(req.query);
  clean(req.params);
  next();
}
