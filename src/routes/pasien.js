const express = require(`express`);
const router = express.Router();
const { pasienControllers } = require(`../controllers/pasien`);
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/redis');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pasienControllers.add);
router.get(`/`, protect, cache, pasienControllers.getAll);
router.get(`/:id`, protect, pasienControllers.getById);
router.put(`/:id`, protect, uploaded.array(), pasienControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pasienControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pasienControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), pasienControllers.delete);

module.exports = router;
