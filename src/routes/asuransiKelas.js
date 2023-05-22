const express = require(`express`);
const router = express.Router();
const { asuransiKelasControllers } = require(`../controllers/asuransiKelas.js`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), asuransiKelasControllers.add);
router.get(`/`, asuransiKelasControllers.getAll);
router.get(`/:id`, asuransiKelasControllers.getById);
router.put(`/:id`, uploaded.array(), asuransiKelasControllers.edit);
router.get(`/asuransi/:id_asuransi`, asuransiKelasControllers.getByIdAsuransi);

module.exports = router;
