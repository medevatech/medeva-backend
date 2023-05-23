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
router.put(`/activate/:id`, uploaded.array(), layananControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), layananControllers.editArchive);
router.delete(`/:id`, uploaded.array(), layananControllers.delete);

module.exports = router;
