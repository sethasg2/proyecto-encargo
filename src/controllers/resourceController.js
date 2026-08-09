const Resource = require('../models/resourceModel');

exports.list = (req, res) => res.json(Resource.list());

exports.get = (req, res) => {
  const item = Resource.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

exports.create = (req, res) => {
  const item = Resource.create(req.body);
  res.status(201).json(item);
};

exports.update = (req, res) => {
  const item = Resource.update(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

exports.remove = (req, res) => {
  const ok = Resource.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
};
