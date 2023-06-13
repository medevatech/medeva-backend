const express = require(`express`);
const router = express.Router();
const { rekamMedisControllers } = require(`../controllers/rekamMedis`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), rekamMedisControllers.add);
router.get(`/`, protect, rekamMedisControllers.getAll);
router.get(`/:id`, protect, rekamMedisControllers.getById);
router.put(`/:id`, protect, uploaded.array(), rekamMedisControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  rekamMedisControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  rekamMedisControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), rekamMedisControllers.delete);

module.exports = router;
