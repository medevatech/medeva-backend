const express = require(`express`);
const router = express.Router();
const { kunjunganControllers } = require(`../controllers/kunjungan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), kunjunganControllers.add);
router.get(`/`, kunjunganControllers.getAll);
router.get(`/:id`, kunjunganControllers.getById);
router.put(`/:id`, uploaded.array(), kunjunganControllers.edit);

module.exports = router;
