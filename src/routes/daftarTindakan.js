const express = require(`express`);
const router = express.Router();
const { daftarTindakanControllers } = require(`../controllers/daftarTindakan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), daftarTindakanControllers.add);
router.get(`/`, protect, daftarTindakanControllers.getAll);
router.get(`/:id`, protect, daftarTindakanControllers.getById);
router.put(`/:id`, protect, uploaded.array(), daftarTindakanControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  daftarTindakanControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  daftarTindakanControllers.editArchive
);
router.delete("/:id", protect, daftarTindakanControllers.delete);

module.exports = router;
