const express = require(`express`);
const router = express.Router();
const { alergiPasienControllers } = require(`../controllers/alergiPasien`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), alergiPasienControllers.add);
router.get(`/`, alergiPasienControllers.getAll);
router.get(`/:id`, alergiPasienControllers.getById);
router.put(`/:id`, uploaded.array(), alergiPasienControllers.edit);

module.exports = router;
