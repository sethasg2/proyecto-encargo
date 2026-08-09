const bcrypt = require('bcryptjs');
let users = [];
let idCounter = 1;

module.exports = {
  create: async ({ username, password, role = 'user' }) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: idCounter++, username, password: hashed, role };
    users.push(user);
    return { id: user.id, username: user.username, role: user.role };
  },
  findByUsername: (username) => users.find(u => u.username === username),
  findById: (id) => users.find(u => u.id === Number(id)),
  // Para pruebas: seed admin
  seedAdmin: async () => {
    if (!users.find(u => u.username === 'admin')) {
      await module.exports.create({ username: 'admin', password: 'adminpass', role: 'admin' });
      console.log('Admin seeded: username=admin password=adminpass');
    }
  },
  // Exponer usuarios (solo para debug en desarrollo)
  _all: () => users
};
