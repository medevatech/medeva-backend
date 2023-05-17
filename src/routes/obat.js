const express = require(`express`);
const router = express.Router();
const { obatControllers } = require(`../controllers/obat`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), obatControllers.add);
router.get(`/`, obatControllers.getAll);
router.get(`/:id`, obatControllers.getById);
router.put(`/:id`, uploaded.array(), obatControllers.edit);

module.exports = router;
