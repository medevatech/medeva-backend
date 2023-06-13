const express = require(`express`);
const router = express.Router();
const {
  pemeriksaanPenunjangControllers,
} = require(`../controllers/pemeriksaanPenunjang`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(
  `/`,
  protect,
  uploaded.array(),
  pemeriksaanPenunjangControllers.add
);
router.get(`/`, protect, pemeriksaanPenunjangControllers.getAll);
router.get(`/:id`, protect, pemeriksaanPenunjangControllers.getById);
router.put(
  `/:id`,
  protect,
  uploaded.array(),
  pemeriksaanPenunjangControllers.edit
);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  pemeriksaanPenunjangControllers.getByIdKunjungan
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pemeriksaanPenunjangControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pemeriksaanPenunjangControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  pemeriksaanPenunjangControllers.delete
);

module.exports = router;
