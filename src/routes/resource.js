const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/resourceController');
const { ensureAuth, requireRole } = require('../middlewares/authMiddleware');
const cache = require('../middlewares/cacheMiddleware');

router.get('/', ensureAuth, cache(() => 'resources:all', 30), ctrl.list);
router.get('/:id', ensureAuth, ctrl.get);
router.post('/', ensureAuth, ctrl.create);
router.put('/:id', ensureAuth, ctrl.update);
router.delete('/:id', ensureAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
