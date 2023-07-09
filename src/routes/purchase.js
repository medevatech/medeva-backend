const express = require(`express`);
const router = express.Router();
const { purchaseControllers } = require(`../controllers/purchase.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), purchaseControllers.add);
router.get(`/`, protect, purchaseControllers.getAll);
router.get(`/:id`, protect, purchaseControllers.getById);
router.get(`/klinik/:id_klinik`, protect, purchaseControllers.getByIdKlinik);
router.get(`/vendor/:id_vendor`, protect, purchaseControllers.getByIdVendor);
router.put(`/:id`, protect, uploaded.array(), purchaseControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  purchaseControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  purchaseControllers.editArchive
);
router.delete('/:id', protect, purchaseControllers.delete);

module.exports = router;
