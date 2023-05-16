const express = require(`express`);
const router = express.Router();
const { hargaTindakanControllers } = require(`../controllers/hargaTindakan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), hargaTindakanControllers.add);
router.get(`/`, hargaTindakanControllers.getAll);
router.get(`/:id`, hargaTindakanControllers.getById);
router.put(`/:id`, uploaded.array(), hargaTindakanControllers.edit);
router.get(`/klinik/:id_klinik`, hargaTindakanControllers.getByIdKlinik);

module.exports = router;