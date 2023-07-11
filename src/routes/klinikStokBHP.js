const express = require(`express`);
const router = express.Router();
const { klinikStokBHPControllers } = require(`../controllers/klinikStokBHP.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikStokBHPControllers.add);
router.get(`/`, protect, klinikStokBHPControllers.getAll);
router.get(`/:id`, protect, klinikStokBHPControllers.getById);
router.get(
  `/purchase/:id_purchase`,
  protect,
  klinikStokBHPControllers.getByIdPurchase
);
router.get(
  `/klinik-bhp/:id_klinik_bhp`,
  protect,
  klinikStokBHPControllers.getByIdKlinikBHP
);
router.put(`/:id`, protect, uploaded.array(), klinikStokBHPControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikStokBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikStokBHPControllers.editArchive
);
router.delete('/:id', protect, klinikStokBHPControllers.delete);

module.exports = router;
