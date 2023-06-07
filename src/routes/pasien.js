const express = require(`express`);
const router = express.Router();
const { pasienControllers } = require(`../controllers/pasien`);
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/redis');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), pasienControllers.add);
router.get(`/`, cache, pasienControllers.getAll);
router.get(`/:id`, pasienControllers.getById);
router.put(`/:id`, uploaded.array(), pasienControllers.edit);
router.put(`/activate/:id`, uploaded.array(), pasienControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), pasienControllers.editArchive);
router.delete(`/:id`, uploaded.array(), pasienControllers.delete);

module.exports = router;
