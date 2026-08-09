exports.ensureAuth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ error: 'Authentication required' });
};

exports.requireRole = (role) => (req, res, next) => {
  const user = req.session && req.session.user;
  if (!user) return res.status(401).json({ error: 'Authentication required' });
  if (user.role !== role) return res.status(403).json({ error: 'Forbidden: insufficient role' });
  next();
};

exports.requireAnyRole = (...roles) => (req, res, next) => {
  const user = req.session && req.session.user;
  if (!user) return res.status(401).json({ error: 'Authentication required' });
  if (!roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden: insufficient role' });
  next();
};
