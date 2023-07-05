const express = require(`express`);
const router = express.Router();
const { klinikLayananControllers } = require(`../controllers/klinikLayanan.js`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikLayananControllers.add);
router.get(`/`, protect, klinikLayananControllers.getAll);
router.get(`/:id`, protect, klinikLayananControllers.getById);
router.get(
  `/klinik/:id_klinik`,
  protect,
  klinikLayananControllers.getByIdKlinik
);
router.get(
  `/daftar-layanan/:id_daftar_layanan`,
  protect,
  klinikLayananControllers.getByIdDaftarLayanan
);
router.put(`/:id`, protect, uploaded.array(), klinikLayananControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikLayananControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikLayananControllers.editArchive
);
router.delete('/:id', protect, klinikLayananControllers.delete);

module.exports = router;
