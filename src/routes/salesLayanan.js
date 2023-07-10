const express = require(`express`);
const router = express.Router();
const { salesLayananControllers } = require(`../controllers/salesLayanan.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), salesLayananControllers.add);
router.get(`/`, protect, salesLayananControllers.getAll);
router.get(`/:id`, protect, salesLayananControllers.getById);
router.get(`/sales/:id_sales`, protect, salesLayananControllers.getByIdSales);
router.get(
  `/klinik-layanan/:id_klinik_layanan`,
  protect,
  salesLayananControllers.getByIdKlinikLayanan
);
router.put(`/:id`, protect, uploaded.array(), salesLayananControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  salesLayananControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  salesLayananControllers.editArchive
);
router.delete('/:id', protect, salesLayananControllers.delete);

module.exports = router;
