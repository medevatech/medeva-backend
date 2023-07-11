const express = require(`express`);
const router = express.Router();
const { pemakaianBHPControllers } = require(`../controllers/pemakaianBHP.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pemakaianBHPControllers.add);
router.get(`/`, protect, pemakaianBHPControllers.getAll);
router.get(`/:id`, protect, pemakaianBHPControllers.getById);
router.get(
  `/klinik-bhp/:id_klinik_bhp`,
  protect,
  pemakaianBHPControllers.getByIdKlinikBHP
);
router.get(`/sales/:id_sales`, protect, pemakaianBHPControllers.getByIdSales);
router.get(
  `/sales-layanan/:id_sales_layanan`,
  protect,
  pemakaianBHPControllers.getByIdSalesLayanan
);
router.get(
  `/sales-paket/:id_sales_paket`,
  protect,
  pemakaianBHPControllers.getByIdSalesPaket
);
router.put(`/:id`, protect, uploaded.array(), pemakaianBHPControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pemakaianBHPControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pemakaianBHPControllers.editArchive
);
router.delete('/:id', protect, pemakaianBHPControllers.delete);

module.exports = router;
