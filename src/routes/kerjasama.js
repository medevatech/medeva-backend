const express = require(`express`);
const router = express.Router();
const { kerjasamaControllers } = require(`../controllers/kerjasama`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), kerjasamaControllers.add);
router.get(`/`, protect, kerjasamaControllers.getAll);
router.get(`/:id`, protect, kerjasamaControllers.getById);
router.put(`/:id`, protect, uploaded.array(), kerjasamaControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editArchive
);
router.delete('/:id', protect, kerjasamaControllers.delete);

module.exports = router;
