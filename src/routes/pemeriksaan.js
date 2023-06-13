const express = require(`express`);
const router = express.Router();
const { pemeriksaanControllers } = require(`../controllers/pemeriksaan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pemeriksaanControllers.add);
router.get(`/`, protect, pemeriksaanControllers.getAll);
router.get(`/:id`, protect, pemeriksaanControllers.getById);
router.put(`/:id`, protect, uploaded.array(), pemeriksaanControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pemeriksaanControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pemeriksaanControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), pemeriksaanControllers.delete);

module.exports = router;
