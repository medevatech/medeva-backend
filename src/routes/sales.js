const express = require(`express`);
const router = express.Router();
const { salesControllers } = require(`../controllers/sales.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), salesControllers.add);
router.get(`/`, protect, salesControllers.getAll);
router.get(`/:id`, protect, salesControllers.getById);
router.get(`/pasien/:id_pasien`, protect, salesControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), salesControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  salesControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  salesControllers.editArchive
);
router.delete('/:id', protect, salesControllers.delete);

module.exports = router;
