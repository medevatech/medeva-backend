const express = require(`express`);
const router = express.Router();
const { jadwalBukaRSControllers } = require(`../controllers/jadwalBukaRS`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), jadwalBukaRSControllers.add);
router.get(`/`, protect, jadwalBukaRSControllers.getAll);
router.get(`/:id`, protect, jadwalBukaRSControllers.getById);
router.put(`/:id`, protect, uploaded.array(), jadwalBukaRSControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  jadwalBukaRSControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  jadwalBukaRSControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  jadwalBukaRSControllers.delete
);

module.exports = router;
