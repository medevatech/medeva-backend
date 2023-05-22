const express = require(`express`);
const router = express.Router();
const { asuransiControllers } = require(`../controllers/asuransi`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), asuransiControllers.add);
router.get(`/`, asuransiControllers.getAll);
router.get(`/:id`, asuransiControllers.getByIdAsuransi);
router.put(`/:id`, uploaded.array(), asuransiControllers.edit);
router.put(`/activate/:id`, uploaded.array(), asuransiControllers.editActivate);
router.put(`/archive/:id`, uploaded.array(), asuransiControllers.editArchive);
router.delete(`/:id`, uploaded.array(), asuransiControllers.delete);

module.exports = router;
