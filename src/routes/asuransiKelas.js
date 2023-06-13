const express = require(`express`);
const router = express.Router();
const { asuransiKelasControllers } = require(`../controllers/asuransiKelas.js`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), asuransiKelasControllers.add);
router.get(`/`, protect, asuransiKelasControllers.getAll);
router.get(`/:id`, protect, asuransiKelasControllers.getById);
router.put(`/:id`, protect, uploaded.array(), asuransiKelasControllers.edit);
router.get(
  `/asuransi/:id_asuransi`,
  protect,
  asuransiKelasControllers.getByIdAsuransi
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  asuransiKelasControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  asuransiKelasControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  asuransiKelasControllers.delete
);

module.exports = router;
