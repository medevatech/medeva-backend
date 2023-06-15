const express = require(`express`);
const router = express.Router();
const { hargaLayananControllers } = require(`../controllers/hargaLayanan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), hargaLayananControllers.add);
router.get(`/`, protect, hargaLayananControllers.getAll);
router.get(`/:id`, protect, hargaLayananControllers.getById);
router.put(`/:id`, protect, uploaded.array(), hargaLayananControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  hargaLayananControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  hargaLayananControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  hargaLayananControllers.delete
);

module.exports = router;
