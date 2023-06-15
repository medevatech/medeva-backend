const express = require(`express`);
const router = express.Router();
const { alergiControllers } = require(`../controllers/alergi`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), alergiControllers.add);
router.get(`/`, protect, alergiControllers.getAll);
router.get(`/:id`, protect, alergiControllers.getById);
router.put(`/:id`, protect, uploaded.array(), alergiControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  alergiControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  alergiControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), alergiControllers.delete);

module.exports = router;
