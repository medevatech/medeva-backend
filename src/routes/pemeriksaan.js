const express = require(`express`);
const router = express.Router();
const { pemeriksaanControllers } = require(`../controllers/pemeriksaan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), pemeriksaanControllers.add);
router.get(`/`, pemeriksaanControllers.getAll);
router.get(`/:id`, pemeriksaanControllers.getById);
router.put(`/:id`, uploaded.array(), pemeriksaanControllers.edit);
router.get(
  `/layanan-lab/:id_layanan_lab`,
  pemeriksaanControllers.getByIdLayananLab
);

module.exports = router;
