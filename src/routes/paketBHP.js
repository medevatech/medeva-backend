const express = require(`express`);
const router = express.Router();
const { paketBHPControllers } = require(`../controllers/paketBHP.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), paketBHPControllers.add);
router.get(`/`, protect, paketBHPControllers.getAll);
router.get(`/:id`, protect, paketBHPControllers.getById);
router.get(
  `/klinik-bhp/:id_klinik_bhp`,
  protect,
  paketBHPControllers.getByIdKlinikBHP
);
router.get(
  `/klinik-paket/:id_klinik_paket`,
  protect,
  paketBHPControllers.getByIdKlinikPaket
);
router.put(`/:id`, protect, uploaded.array(), paketBHPControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  paketBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  paketBHPControllers.editArchive
);
router.delete('/:id', protect, paketBHPControllers.delete);

module.exports = router;
