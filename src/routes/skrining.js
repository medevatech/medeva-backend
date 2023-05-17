const express = require(`express`);
const router = express.Router();
const { skriningControllers } = require(`../controllers/skrining`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), skriningControllers.add);
router.get(`/`, skriningControllers.getAll);
router.get(`/:id`, skriningControllers.getById);
router.put(`/:id`, uploaded.array(), skriningControllers.edit);

module.exports = router;
