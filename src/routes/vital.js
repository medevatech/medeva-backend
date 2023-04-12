const express = require(`express`);
const router = express.Router();
const { vitalControllers } = require(`../controllers/vital`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), vitalControllers.add);
router.get(`/`, vitalControllers.getAll);
router.get(`/:id`, vitalControllers.getById);
router.put(`/:id`, uploaded.array(), vitalControllers.edit);

module.exports = router;
