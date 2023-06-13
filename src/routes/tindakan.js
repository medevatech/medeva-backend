const express = require(`express`);
const router = express.Router();
const { tindakanControllers } = require(`../controllers/tindakan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), tindakanControllers.add);
router.get(`/`, protect, tindakanControllers.getAll);
router.get(`/:id`, protect, tindakanControllers.getById);
router.put(`/:id`, protect, uploaded.array(), tindakanControllers.edit);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  tindakanControllers.getByIdKunjungan
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  tindakanControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  tindakanControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), tindakanControllers.delete);

module.exports = router;
