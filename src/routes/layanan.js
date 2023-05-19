const express = require(`express`);
const router = express.Router();
const { layananControllers } = require(`../controllers/layanan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), layananControllers.add);
router.get(`/`, layananControllers.getAll);
router.get(`/:id`, layananControllers.getById);
router.put(`/:id`, uploaded.array(), layananControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, layananControllers.getByIdKunjungan);

module.exports = router;
