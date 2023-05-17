const express = require(`express`);
const router = express.Router();
const { daftarTindakanControllers } = require(`../controllers/daftarTindakan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), daftarTindakanControllers.add);
router.get(`/`, daftarTindakanControllers.getAll);
router.get(`/:id`, daftarTindakanControllers.getById);
router.put(`/:id`, uploaded.array(), daftarTindakanControllers.edit);

module.exports = router;
