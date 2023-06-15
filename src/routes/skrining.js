const express = require(`express`);
const router = express.Router();
const { skriningControllers } = require(`../controllers/skrining`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), skriningControllers.add);
router.get(`/`, protect, skriningControllers.getAll);
router.get(`/:id`, protect, skriningControllers.getById);
router.put(`/:id`, protect, uploaded.array(), skriningControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  skriningControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  skriningControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), skriningControllers.delete);

module.exports = router;
