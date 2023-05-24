const express = require(`express`);
const router = express.Router();
const { poliControllers } = require(`../controllers/poli`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), poliControllers.add);
router.get(`/`, poliControllers.getAll);
router.get(`/:id`, poliControllers.getById);
router.put(`/:id`, uploaded.array(), poliControllers.edit);
router.put(`/activate/:id`, uploaded.array(), poliControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), poliControllers.editArchive);
router.delete(`/:id`, uploaded.array(), poliControllers.delete);

module.exports = router;
