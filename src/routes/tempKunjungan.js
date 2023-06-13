const express = require(`express`);
const router = express.Router();
const { tempKunjunganControllers } = require(`../controllers/tempKunjungan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), tempKunjunganControllers.add);
router.get(`/`, protect, tempKunjunganControllers.getAll);
router.get(`/:id`, protect, tempKunjunganControllers.getById);
router.put(`/:id`, protect, uploaded.array(), tempKunjunganControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  tempKunjunganControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  tempKunjunganControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  tempKunjunganControllers.delete
);

module.exports = router;
