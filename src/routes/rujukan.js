const express = require(`express`);
const router = express.Router();
const { rujukanjControllers } = require(`../controllers/rujukan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), rujukanjControllers.add);
router.get(`/`, rujukanjControllers.getAll);
router.get(`/:id`, rujukanjControllers.getById);
router.put(`/:id`, uploaded.array(), rujukanjControllers.edit);
router.get(`/kunjungan/:id_kunjungan`, rujukanjControllers.getByIdKunjungan);

module.exports = router;
