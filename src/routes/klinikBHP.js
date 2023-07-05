const express = require(`express`);
const router = express.Router();
const { klinikBHPControllers } = require(`../controllers/klinikBHP.js`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikBHPControllers.add);
router.get(`/`, protect, klinikBHPControllers.getAll);
router.get(`/:id`, protect, klinikBHPControllers.getById);
router.get(`/klinik/:id_klinik`, protect, klinikBHPControllers.getByIdKlinik);
router.put(`/:id`, protect, uploaded.array(), klinikBHPControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikBHPControllers.editArchive
);
router.delete('/:id', protect, klinikBHPControllers.delete);

module.exports = router;
