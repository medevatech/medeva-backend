const express = require(`express`);
const router = express.Router();
const { pasienControllers } = require(`../controllers/pasien`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), pasienControllers.addPasien);
router.get(`/`, pasienControllers.getAll);
router.get(`/:id`, pasienControllers.getById);
router.put(`/:id`, uploaded.array(), pasienControllers.editPasien);

module.exports = router;
