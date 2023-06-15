const express = require(`express`);
const router = express.Router();
const { poliControllers } = require(`../controllers/poli`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), poliControllers.add);
router.get(`/`, protect, poliControllers.getAll);
router.get(`/:id`, protect, poliControllers.getById);
router.put(`/:id`, protect, uploaded.array(), poliControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  poliControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  poliControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), poliControllers.delete);

module.exports = router;
