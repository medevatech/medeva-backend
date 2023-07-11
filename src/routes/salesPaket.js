const express = require(`express`);
const router = express.Router();
const { salesPaketControllers } = require(`../controllers/salesPaket.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), salesPaketControllers.add);
router.get(`/`, protect, salesPaketControllers.getAll);
router.get(`/:id`, protect, salesPaketControllers.getById);
router.get(`/sales/:id_sales`, protect, salesPaketControllers.getByIdSales);
router.get(
  `/klinik-paket/:id_klinik_paket`,
  protect,
  salesPaketControllers.getByIdKlinikPaket
);
router.put(`/:id`, protect, uploaded.array(), salesPaketControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  salesPaketControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  salesPaketControllers.editArchive
);
router.delete('/:id', protect, salesPaketControllers.delete);

module.exports = router;
