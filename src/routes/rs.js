const express = require(`express`);
const router = express.Router();
const { rsControllers } = require(`../controllers/rs`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), rsControllers.add);
router.get(`/`, rsControllers.getAll);
router.get(`/:id`, rsControllers.getById);
router.put(`/:id`, uploaded.array(), rsControllers.edit);

module.exports = router;
