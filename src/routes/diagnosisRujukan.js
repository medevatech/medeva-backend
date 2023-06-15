const express = require(`express`);
const router = express.Router();
const {
  diagnosisRujukanControllers,
} = require(`../controllers/diagnosisRujukan`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), diagnosisRujukanControllers.add);
router.get(`/`, protect, diagnosisRujukanControllers.getAll);
router.get(`/:id`, protect, diagnosisRujukanControllers.getById);
router.put(`/:id`, protect, uploaded.array(), diagnosisRujukanControllers.edit);
router.get(
  `/rujukan/:id_rujukan`,
  protect,
  diagnosisRujukanControllers.getByIdRujukan
);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  diagnosisRujukanControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  diagnosisRujukanControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  diagnosisRujukanControllers.delete
);

module.exports = router;
