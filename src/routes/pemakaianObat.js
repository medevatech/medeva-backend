const express = require(`express`);
const router = express.Router();
const { pemakaianObatControllers } = require(`../controllers/pemakaianObat.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pemakaianObatControllers.add);
router.get(`/`, protect, pemakaianObatControllers.getAll);
router.get(`/:id`, protect, pemakaianObatControllers.getById);
router.get(
  `/klinik-obat/:id_klinik_obat`,
  protect,
  pemakaianObatControllers.getByIdKlinikObat
);
router.get(`/sales/:id_sales`, protect, pemakaianObatControllers.getByIdSales);
router.get(
  `/sales-layanan/:id_sales_layanan`,
  protect,
  pemakaianObatControllers.getByIdSalesLayanan
);
router.get(
  `/sales-paket/:id_sales_paket`,
  protect,
  pemakaianObatControllers.getByIdSalesPaket
);
router.put(`/:id`, protect, uploaded.array(), pemakaianObatControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pemakaianObatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pemakaianObatControllers.editArchive
);
router.delete('/:id', protect, pemakaianObatControllers.delete);

module.exports = router;
