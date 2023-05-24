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
router.put(`/activate/:id`, uploaded.array(), rsPoliControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), rsPoliControllers.editArchive);
router.delete(`/:id`, uploaded.array(), rsPoliControllers.delete);

module.exports = router;
