const express = require(`express`);
const router = express.Router();
const { layananJasaControllers } = require(`../controllers/layananJasa.js`);
const { protect } = require('../middleware/auth.js');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), layananJasaControllers.add);
router.get(`/`, protect, layananJasaControllers.getAll);
router.get(`/:id`, protect, layananJasaControllers.getById);
router.get(
  `/klinik-layanan/:id_klinik_layanan`,
  protect,
  layananJasaControllers.getByIdKlinikLayanan
);
router.put(`/:id`, protect, uploaded.array(), layananJasaControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  layananJasaControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  layananJasaControllers.editArchive
);
router.delete('/:id', protect, layananJasaControllers.delete);

module.exports = router;
