const express = require(`express`);
const router = express.Router();
const { diagnosisControllers } = require(`../controllers/diagnosis`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), diagnosisControllers.add);
router.get(`/`, diagnosisControllers.getAll);
router.get(`/:id`, diagnosisControllers.getById);
router.put(`/:id`, uploaded.array(), diagnosisControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, diagnosisControllers.getByIdKunjungan);
router.put(
  `/activate/:id`,
  uploaded.array(),
  diagnosisControllers.editActivate
);
router.put(`/archive/:id`, uploaded.array(), diagnosisControllers.editArchive);
router.delete(`/:id`, uploaded.array(), diagnosisControllers.delete);

module.exports = router;
