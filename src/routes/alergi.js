const express = require(`express`);
const router = express.Router();
const { alergiControllers } = require(`../controllers/alergi`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/add`, uploaded.array(), alergiControllers.add);
router.get(`/`, alergiControllers.getAll);
router.get(`/:id`, alergiControllers.getById);
router.put(`/:id`, uploaded.array(), alergiControllers.edit);

module.exports = router;
