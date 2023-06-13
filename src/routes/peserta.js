const express = require(`express`);
const router = express.Router();
const { pesertaControllers } = require(`../controllers/peserta`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), pesertaControllers.add);
router.get(`/`, protect, pesertaControllers.getAll);
router.get(`/:id`, protect, pesertaControllers.getById);
router.put(`/:id`, protect, uploaded.array(), pesertaControllers.edit);
router.get(`/pasien/:id_pasien`, protect, pesertaControllers.getByIdPasien);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  pesertaControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  pesertaControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), pesertaControllers.delete);

module.exports = router;
