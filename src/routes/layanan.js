const express = require(`express`);
const router = express.Router();
const { layananControllers } = require(`../controllers/layanan.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), layananControllers.add);
router.get(`/`, protect, layananControllers.getAll);
router.get(`/:id`, protect, layananControllers.getById);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  layananControllers.getByIdKunjungan
);
router.get(`/pasien/:id_pasien`, protect, layananControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), layananControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  layananControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  layananControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), layananControllers.delete);

module.exports = router;
