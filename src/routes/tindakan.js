const express = require(`express`);
const router = express.Router();
const { tindakanControllers } = require(`../controllers/tindakan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), tindakanControllers.add);
router.get(`/`, tindakanControllers.getAll);
router.get(`/:id`, tindakanControllers.getById);
router.put(`/:id`, uploaded.array(), tindakanControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, tindakanControllers.getByIdKunjungan);

module.exports = router;
