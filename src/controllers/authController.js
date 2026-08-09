const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    if (User.findByUsername(username)) return res.status(409).json({ error: 'User exists' });
    const user = await User.create({ username, password, role });
    res.status(201).json(user);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = User.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    // Guardar datos mínimos en la sesión
    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.json({ message: 'Logged in', user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) { next(err); }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie(process.env.SESSION_NAME || 'sid');
    res.json({ message: 'Logged out' });
  });
};
