const express = require(`express`);
const router = express.Router();
const { pesertaControllers } = require(`../controllers/peserta`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), pesertaControllers.add);
router.get(`/`, pesertaControllers.getAll);
router.get(`/:id`, pesertaControllers.getById);
router.put(`/:id`, uploaded.array(), pesertaControllers.edit);
router.get(`/pasien/:id_pasien`, pesertaControllers.getByIdPasien);
router.delete(`/:id`, uploaded.array(), pesertaControllers.delete);

module.exports = router;
