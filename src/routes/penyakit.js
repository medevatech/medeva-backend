const express = require(`express`);
const router = express.Router();
const { penyakitControllers } = require(`../controllers/penyakit`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), penyakitControllers.add);
router.get(`/`, penyakitControllers.getAll);
router.get(`/all`, penyakitControllers.getWithOutLimit);
router.get(`/:id`, penyakitControllers.getById);
router.put(`/:id`, uploaded.array(), penyakitControllers.edit);
router.put(`/activate/:id`, uploaded.array(), penyakitControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), penyakitControllers.editArchive);
router.delete(`/:id`, uploaded.array(), penyakitControllers.delete);

module.exports = router;
