const express = require(`express`);
const router = express.Router();
const { vitalSignsControllers } = require(`../controllers/vitalSigns`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), vitalSignsControllers.add);
router.get(`/`, vitalSignsControllers.getAll);
router.get(`/:id`, vitalSignsControllers.getByIdVS);
router.get(`/pasien/:id_pasien`, vitalSignsControllers.getByIdPasien);
router.put(`/:id`, uploaded.array(), vitalSignsControllers.edit);

module.exports = router;
