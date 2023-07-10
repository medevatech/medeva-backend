const express = require(`express`);
const router = express.Router();
const { terdaftarControllers } = require(`../controllers/terdaftar.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), terdaftarControllers.add);
router.get(`/`, protect, terdaftarControllers.getAll);
router.get(`/:id`, protect, terdaftarControllers.getById);
router.get(`/pasien/:id_pasien`, protect, terdaftarControllers.getByIdPasien);
router.get(`/klinik/:id_klinik`, protect, terdaftarControllers.getByIdKlinik);
router.put(`/:id`, protect, uploaded.array(), terdaftarControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  terdaftarControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  terdaftarControllers.editArchive
);
router.delete('/:id', protect, terdaftarControllers.delete);

module.exports = router;
