const express = require(`express`);
const router = express.Router();
const { rujukanjControllers } = require(`../controllers/rujukan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), rujukanjControllers.add);
router.get(`/`, protect, rujukanjControllers.getAll);
router.get(`/:id`, protect, rujukanjControllers.getById);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  rujukanjControllers.getByIdKunjungan
);
router.get(`/pasien/:id_pasien`, protect, rujukanjControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), rujukanjControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  rujukanjControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  rujukanjControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), rujukanjControllers.delete);

module.exports = router;
