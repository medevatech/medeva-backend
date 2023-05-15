const express = require(`express`);
const router = express.Router();
const { resepControllers } = require(`../controllers/resep`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), resepControllers.add);
router.get(`/`, resepControllers.getAll);
router.get(`/:id`, resepControllers.getById);
router.put(`/:id`, uploaded.array(), resepControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, resepControllers.getByIdKunjungan);

module.exports = router;
