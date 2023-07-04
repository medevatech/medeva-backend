const express = require(`express`);
const router = express.Router();
const { klinikObatControllers } = require(`../controllers/klinikObat.js`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikObatControllers.add);
router.get(`/`, protect, klinikObatControllers.getAll);
router.get(`/:id`, protect, klinikObatControllers.getById);
router.get(`/klinik/:id_klinik`, protect, klinikObatControllers.getByIdKlinik);
router.get(`/obat/:id_obat`, protect, klinikObatControllers.getByIdObat);
router.put(`/:id`, protect, uploaded.array(), klinikObatControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikObatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikObatControllers.editArchive
);
router.delete('/:id', protect, klinikObatControllers.delete);

module.exports = router;
