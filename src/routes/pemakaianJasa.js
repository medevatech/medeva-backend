const express = require(`express`);
const router = express.Router();
const { pemakaianJasaControllers } = require(`../controllers/pemakaianJasa.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pemakaianJasaControllers.add);
router.get(`/`, protect, pemakaianJasaControllers.getAll);
router.get(`/:id`, protect, pemakaianJasaControllers.getById);
router.get(
  `/layanan-jasa/:id_layanan_jasa`,
  protect,
  pemakaianJasaControllers.getByIdLayananJasa
);
router.get(`/sales/:id_sales`, protect, pemakaianJasaControllers.getByIdSales);
router.get(
  `/sales-layanan/:id_sales_layanan`,
  protect,
  pemakaianJasaControllers.getByIdSalesLayanan
);
router.get(
  `/sales-paket/:id_sales_paket`,
  protect,
  pemakaianJasaControllers.getByIdSalesPaket
);
router.put(`/:id`, protect, uploaded.array(), pemakaianJasaControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pemakaianJasaControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pemakaianJasaControllers.editArchive
);
router.delete('/:id', protect, pemakaianJasaControllers.delete);

module.exports = router;
