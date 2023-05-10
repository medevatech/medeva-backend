const express = require(`express`);
const router = express.Router();
const { rsPoliControllers } = require(`../controllers/rsPoli`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), rsPoliControllers.add);
router.get(`/`, rsPoliControllers.getAll);
router.get(`/:id`, rsPoliControllers.getById);
router.put(`/:id`, uploaded.array(), rsPoliControllers.edit);

module.exports = router;
