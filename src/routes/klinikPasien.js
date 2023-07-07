const express = require(`express`);
const router = express.Router();
const { klinikPasienControllers } = require(`../controllers/klinikPasien.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikPasienControllers.add);
router.get(`/`, protect, klinikPasienControllers.getAll);
router.get(`/:id`, protect, klinikPasienControllers.getById);
router.get(
  `/klinik/:id_klinik`,
  protect,
  klinikPasienControllers.getByIdKlinik
);
router.get(
  `/pasien/:id_pasien`,
  protect,
  klinikPasienControllers.getByIdPasien
);
router.put(`/:id`, protect, uploaded.array(), klinikPasienControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikPasienControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikPasienControllers.editArchive
);
router.delete('/:id', protect, klinikPasienControllers.delete);

module.exports = router;
