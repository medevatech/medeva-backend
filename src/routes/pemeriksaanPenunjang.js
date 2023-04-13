const express = require(`express`);
const router = express.Router();
const {
  pemeriksaanPenunjangControllers,
} = require(`../controllers/pemeriksaanPenunjang`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), pemeriksaanPenunjangControllers.add);
router.get(`/`, pemeriksaanPenunjangControllers.getAll);
router.get(`/:id`, pemeriksaanPenunjangControllers.getById);
router.put(`/:id`, uploaded.array(), pemeriksaanPenunjangControllers.edit);

module.exports = router;
