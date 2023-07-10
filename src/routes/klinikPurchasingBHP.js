const express = require(`express`);
const router = express.Router();
const {
  klinikPurchasingBHPControllers,
} = require(`../controllers/klinikPurchasingBHP.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikPurchasingBHPControllers.add);
router.get(`/`, protect, klinikPurchasingBHPControllers.getAll);
router.get(`/:id`, protect, klinikPurchasingBHPControllers.getById);
router.get(
  `/purchase/:id_purchase`,
  protect,
  klinikPurchasingBHPControllers.getByIdPurchase
);
router.get(
  `/klinik-bhp/:id_klinik_bhp`,
  protect,
  klinikPurchasingBHPControllers.getByIdKlinikBHP
);
router.put(
  `/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingBHPControllers.edit
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikPurchasingBHPControllers.editArchive
);
router.delete('/:id', protect, klinikPurchasingBHPControllers.delete);

module.exports = router;
