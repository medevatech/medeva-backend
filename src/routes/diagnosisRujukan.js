const express = require(`express`);
const router = express.Router();
const {
  diagnosisRujukanControllers,
} = require(`../controllers/diagnosisRujukan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), diagnosisRujukanControllers.add);
router.get(`/`, diagnosisRujukanControllers.getAll);
router.get(`/:id`, diagnosisRujukanControllers.getById);
router.put(`/:id`, uploaded.array(), diagnosisRujukanControllers.edit);
router.get(`/rujukan/:id_rujukan`, diagnosisRujukanControllers.getByIdRujukan);
router.put(
  `/activate/:id`,
  uploaded.array(),
  diagnosisRujukanControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  diagnosisRujukanControllers.editArchive
);
router.delete(`/:id`, uploaded.array(), diagnosisRujukanControllers.delete);

module.exports = router;
