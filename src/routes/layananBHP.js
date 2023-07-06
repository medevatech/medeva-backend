const express = require(`express`);
const router = express.Router();
const { layananBHPControllers } = require(`../controllers/layananBHP.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), layananBHPControllers.add);
router.get(`/`, protect, layananBHPControllers.getAll);
router.get(`/:id`, protect, layananBHPControllers.getById);
router.get(
  `/klinik-bhp/:id_klinik_bhp`,
  protect,
  layananBHPControllers.getByIdKlinikBHP
);
router.get(
  `/klinik-layanan/:id_klinik_layanan`,
  protect,
  layananBHPControllers.getByIdKlinikLayanan
);
router.put(`/:id`, protect, uploaded.array(), layananBHPControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  layananBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  layananBHPControllers.editArchive
);
router.delete('/:id', protect, layananBHPControllers.delete);

module.exports = router;
