const express = require(`express`);
const router = express.Router();
const { hargaLayananControllers } = require(`../controllers/hargaLayanan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), hargaLayananControllers.add);
router.get(`/`, hargaLayananControllers.getAll);
router.get(`/:id`, hargaLayananControllers.getById);
router.put(`/:id`, uploaded.array(), hargaLayananControllers.edit);
router.get(`/klinik/:id_klinik`, hargaLayananControllers.getByIdKlinik);

module.exports = router;