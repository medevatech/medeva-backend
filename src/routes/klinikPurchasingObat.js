const express = require(`express`);
const router = express.Router();
const {
  klinikPurchasingObatControllers,
} = require(`../controllers/klinikPurchasingObat.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(
  `/`,
  protect,
  uploaded.array(),
  klinikPurchasingObatControllers.add
);
router.get(`/`, protect, klinikPurchasingObatControllers.getAll);
router.get(`/:id`, protect, klinikPurchasingObatControllers.getById);
router.get(
  `/purchase/:id_purchase`,
  protect,
  klinikPurchasingObatControllers.getByIdPurchase
);
router.get(
  `/klinik-obat/:id_klinik_obat`,
  protect,
  klinikPurchasingObatControllers.getByIdKlinikObat
);
router.put(
  `/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingObatControllers.edit
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingObatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingObatControllers.editArchive
);
router.delete('/:id', protect, klinikPurchasingObatControllers.delete);

module.exports = router;
