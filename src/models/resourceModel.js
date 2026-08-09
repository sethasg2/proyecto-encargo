let resources = [];
let idCounter = 1;

module.exports = {
  list: () => resources,
  get: (id) => resources.find(r => r.id === Number(id)),
  create: (data) => {
    const item = { id: idCounter++, ...data, createdAt: new Date().toISOString() };
    resources.push(item);
    return item;
  },
  update: (id, data) => {
    const idx = resources.findIndex(r => r.id === Number(id));
    if (idx === -1) return null;
    resources[idx] = { ...resources[idx], ...data, updatedAt: new Date().toISOString() };
    return resources[idx];
  },
  remove: (id) => {
    const idx = resources.findIndex(r => r.id === Number(id));
    if (idx === -1) return false;
    resources.splice(idx, 1);
    return true;
  }
};
