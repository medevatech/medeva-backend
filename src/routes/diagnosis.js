const express = require(`express`);
const router = express.Router();
const { diagnosisControllers } = require(`../controllers/diagnosis`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), diagnosisControllers.add);
router.get(`/`, protect, diagnosisControllers.getAll);
router.get(`/:id`, protect, diagnosisControllers.getById);
router.put(`/:id`, protect, uploaded.array(), diagnosisControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, diagnosisControllers.getByIdKunjungan);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  diagnosisControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  diagnosisControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), diagnosisControllers.delete);

module.exports = router;
