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

module.exports = router;
