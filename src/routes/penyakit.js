const express = require(`express`);
const router = express.Router();
const { penyakitControllers } = require(`../controllers/penyakit`);
const { protect } = require("../middleware/auth");
const { cache } = require("../middleware/redis");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), penyakitControllers.add);
router.get(`/`, protect, cache, penyakitControllers.getAll);
router.get(`/all`, protect, cache, penyakitControllers.getWithOutLimit);
router.get(`/:id`, protect, penyakitControllers.getById);
router.put(`/:id`, protect, uploaded.array(), penyakitControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  penyakitControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  penyakitControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), penyakitControllers.delete);

module.exports = router;
