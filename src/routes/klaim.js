const express = require(`express`);
const router = express.Router();
const { klaimControllers } = require(`../controllers/klaim.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klaimControllers.add);
router.get(`/`, protect, klaimControllers.getAll);
router.get(`/:id`, protect, klaimControllers.getById);
router.get(`/sales/:id_sales`, protect, klaimControllers.getByIdSales);
router.get(`/asuransi/:id_asuransi`, protect, klaimControllers.getByIdAsuransi);
router.get(
  `/asuransi-kelas/:id_asuransi_kelas`,
  protect,
  klaimControllers.getByIdAsuransiKelas
);
router.put(`/:id`, protect, uploaded.array(), klaimControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klaimControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klaimControllers.editArchive
);
router.delete('/:id', protect, klaimControllers.delete);

module.exports = router;
