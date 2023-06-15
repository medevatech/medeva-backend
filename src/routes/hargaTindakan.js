const express = require(`express`);
const router = express.Router();
const { hargaTindakanControllers } = require(`../controllers/hargaTindakan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), hargaTindakanControllers.add);
router.get(`/`, protect, hargaTindakanControllers.getAll);
router.get(`/:id`, protect, hargaTindakanControllers.getById);
router.put(`/:id`, protect, uploaded.array(), hargaTindakanControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  hargaTindakanControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  hargaTindakanControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  hargaTindakanControllers.delete
);

module.exports = router;
