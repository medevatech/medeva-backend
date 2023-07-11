const express = require(`express`);
const router = express.Router();
const {
  klinikStokObatControllers,
} = require(`../controllers/klinikStokObat.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikStokObatControllers.add);
router.get(`/`, protect, klinikStokObatControllers.getAll);
router.get(`/:id`, protect, klinikStokObatControllers.getById);
router.get(
  `/klinik-purchasing-obat/:id_klinik_purchasing_obat`,
  protect,
  klinikStokObatControllers.getByIdKlinikPurchasingObat
);
router.get(
  `/klinik-obat/:id_klinik_obat`,
  protect,
  klinikStokObatControllers.getByIdKlinikObat
);
router.put(`/:id`, protect, uploaded.array(), klinikStokObatControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikStokObatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikStokObatControllers.editArchive
);
router.delete('/:id', protect, klinikStokObatControllers.delete);

module.exports = router;
