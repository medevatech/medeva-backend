const express = require(`express`);
const router = express.Router();
const { rsControllers } = require(`../controllers/rs`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), rsControllers.add);
router.get(`/`, protect, rsControllers.getAll);
router.get(`/:id`, protect, rsControllers.getById);
router.put(`/:id`, protect, uploaded.array(), rsControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  rsControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  rsControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), rsControllers.delete);

module.exports = router;
