const express = require(`express`);
const router = express.Router();
const { rsPoliControllers } = require(`../controllers/rsPoli`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), rsPoliControllers.add);
router.get(`/`, protect, rsPoliControllers.getAll);
router.get(`/:id`, protect, rsPoliControllers.getById);
router.put(`/:id`, protect, uploaded.array(), rsPoliControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  rsPoliControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  rsPoliControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), rsPoliControllers.delete);

module.exports = router;
