const express = require(`express`);
const router = express.Router();
const { tempKunjunganControllers } = require(`../controllers/tempKunjungan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), tempKunjunganControllers.add);
router.get(`/`, tempKunjunganControllers.getAll);
router.get(`/:id`, tempKunjunganControllers.getById);
router.put(`/:id`, uploaded.array(), tempKunjunganControllers.edit);

module.exports = router;
