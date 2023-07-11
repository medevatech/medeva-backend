const express = require(`express`);
const router = express.Router();
const { bahanObatControllers } = require(`../controllers/bahanObat.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), bahanObatControllers.add);
router.get(`/`, protect, bahanObatControllers.getAll);
router.get(`/:id`, protect, bahanObatControllers.getById);
router.put(`/:id`, protect, uploaded.array(), bahanObatControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  bahanObatControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  bahanObatControllers.editArchive
);
router.delete('/:id', protect, bahanObatControllers.delete);

module.exports = router;
