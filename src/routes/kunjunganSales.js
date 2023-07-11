const express = require(`express`);
const router = express.Router();
const {
  kunjunganSalesControllers,
} = require(`../controllers/kunjunganSales.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), kunjunganSalesControllers.add);
router.get(`/`, protect, kunjunganSalesControllers.getAll);
router.get(`/:id`, protect, kunjunganSalesControllers.getById);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  kunjunganSalesControllers.getByIdKunjungan
);
router.get(`/sales/:id_sales`, protect, kunjunganSalesControllers.getByIdSales);
router.put(`/:id`, protect, uploaded.array(), kunjunganSalesControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  kunjunganSalesControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  kunjunganSalesControllers.editArchive
);
router.delete('/:id', protect, kunjunganSalesControllers.delete);

module.exports = router;
