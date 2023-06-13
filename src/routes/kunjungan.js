const express = require(`express`);
const router = express.Router();
const { kunjunganControllers } = require(`../controllers/kunjungan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), kunjunganControllers.add);
router.get(`/`, protect, kunjunganControllers.getAll);
router.get(`/:id`, protect, kunjunganControllers.getByIdKunjungan);
router.get(`/pasien/:id_pasien`, protect, kunjunganControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), kunjunganControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  kunjunganControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  kunjunganControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), kunjunganControllers.delete);

module.exports = router;
