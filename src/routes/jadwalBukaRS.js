const express = require(`express`);
const router = express.Router();
const { jadwalBukaRSControllers } = require(`../controllers/jadwalBukaRS`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), jadwalBukaRSControllers.add);
router.get(`/`, jadwalBukaRSControllers.getAll);
router.get(`/:id`, jadwalBukaRSControllers.getById);
router.put(`/:id`, uploaded.array(), jadwalBukaRSControllers.edit);

module.exports = router;
