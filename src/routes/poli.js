const express = require(`express`);
const router = express.Router();
const { poliControllers } = require(`../controllers/poli`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), poliControllers.add);
router.get(`/`, poliControllers.getAll);
router.get(`/:id`, poliControllers.getById);
router.put(`/:id`, uploaded.array(), poliControllers.edit);

module.exports = router;
