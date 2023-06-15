const express = require(`express`);
const router = express.Router();
const { obatControllers } = require(`../controllers/obat`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), obatControllers.add);
router.get(`/`, protect, obatControllers.getAll);
router.get(`/:id`, protect, obatControllers.getById);
router.put(`/:id`, protect, uploaded.array(), obatControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  obatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  obatControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), obatControllers.delete);

module.exports = router;
