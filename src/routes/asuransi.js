const express = require(`express`);
const router = express.Router();
const { asuransiControllers } = require(`../controllers/asuransi`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), asuransiControllers.add);
router.get(`/`, protect, asuransiControllers.getAll);
router.get(`/:id`, protect, asuransiControllers.getByIdAsuransi);
router.put(`/:id`, protect, uploaded.array(), asuransiControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  asuransiControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  asuransiControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), asuransiControllers.delete);

module.exports = router;
