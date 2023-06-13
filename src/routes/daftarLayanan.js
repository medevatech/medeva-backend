const express = require(`express`);
const router = express.Router();
const { daftarLayananControllers } = require(`../controllers/daftarLayanan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), daftarLayananControllers.add);
router.get(`/`, protect, daftarLayananControllers.getAll);
router.get(`/:id`, protect, daftarLayananControllers.getById);
router.put(`/:id`, protect, uploaded.array(), daftarLayananControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  daftarLayananControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  daftarLayananControllers.editArchive
);
router.delete("/:id", protect, daftarLayananControllers.delete);

module.exports = router;
