const express = require('express');
const router = express.Router();
const { tataLaksanaController } = require('../controllers/tataLaksana.js');
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.get('/:id_pasien', tataLaksanaController.getByIdPasien);
router.put(
  '/:id_pasien',
  uploaded.array(),
  tataLaksanaController.editStatusByIdPasien
);

module.exports = router;
