const express = require(`express`);
const router = express.Router();
const {
  pemeriksaanPenunjangControllers,
} = require(`../controllers/pemeriksaanPenunjang`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), pemeriksaanPenunjangControllers.add);
router.get(`/`, pemeriksaanPenunjangControllers.getAll);
router.get(`/:id`, pemeriksaanPenunjangControllers.getById);
router.put(`/:id`, uploaded.array(), pemeriksaanPenunjangControllers.edit);
router.get(
  `/kunjungan/:id_kunjungan`,
  pemeriksaanPenunjangControllers.getByIdKunjungan
);
router.put(
  `/activate/:id`,
  uploaded.array(),
  pemeriksaanPenunjangControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  pemeriksaanPenunjangControllers.editArchive
);
router.delete(`/:id`, uploaded.array(), pemeriksaanPenunjangControllers.delete);

module.exports = router;
