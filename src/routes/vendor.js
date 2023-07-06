const express = require(`express`);
const router = express.Router();
const { vendorControllers } = require(`../controllers/vendor.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), vendorControllers.add);
router.get(`/`, protect, vendorControllers.getAll);
router.get(`/:id`, protect, vendorControllers.getById);
router.put(`/:id`, protect, uploaded.array(), vendorControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  vendorControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  vendorControllers.editArchive
);
router.delete('/:id', protect, vendorControllers.delete);

module.exports = router;
