const express = require(`express`);
const router = express.Router();
const { klinikPaketControllers } = require(`../controllers/klinikPaket.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), klinikPaketControllers.add);
router.get(`/`, protect, klinikPaketControllers.getAll);
router.get(`/:id`, protect, klinikPaketControllers.getById);
router.put(`/:id`, protect, uploaded.array(), klinikPaketControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  klinikPaketControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  klinikPaketControllers.editArchive
);
router.delete('/:id', protect, klinikPaketControllers.delete);

module.exports = router;
