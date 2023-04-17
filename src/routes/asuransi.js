const express = require(`express`);
const router = express.Router();
const { asuransiControllers } = require(`../controllers/asuransi`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), asuransiControllers.add);
router.get(`/`, asuransiControllers.getAll);
router.get(`/:id`, asuransiControllers.getById);
router.put(`/:id`, uploaded.array(), asuransiControllers.edit);

module.exports = router;
