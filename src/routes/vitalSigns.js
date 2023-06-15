const express = require(`express`);
const router = express.Router();
const { vitalSignsControllers } = require(`../controllers/vitalSigns`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), vitalSignsControllers.add);
router.get(`/`, protect, vitalSignsControllers.getAll);
router.get(`/:id`, protect, vitalSignsControllers.getByIdVS);
router.get(`/pasien/:id_pasien`, protect, vitalSignsControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), vitalSignsControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  vitalSignsControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  vitalSignsControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), vitalSignsControllers.delete);

module.exports = router;
