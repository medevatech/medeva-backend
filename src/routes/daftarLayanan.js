const express = require(`express`);
const router = express.Router();
const { daftarLayananControllers } = require(`../controllers/daftarLayanan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), daftarLayananControllers.add);
router.get(`/`, daftarLayananControllers.getAll);
router.get(`/:id`, daftarLayananControllers.getById);
router.put(`/:id`, uploaded.array(), daftarLayananControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  daftarLayananControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  daftarLayananControllers.editArchive
);
router.delete('/:id', daftarLayananControllers.delete);

module.exports = router;
