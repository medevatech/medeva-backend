const express = require(`express`);
const router = express.Router();
const { resepControllers } = require(`../controllers/resep`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), resepControllers.add);
router.get(`/`, protect, resepControllers.getAll);
router.get(`/:id`, protect, resepControllers.getById);
router.get(
  `/kunjungan/:id_kunjungan`,
  protect,
  resepControllers.getByIdKunjungan
);
router.get(`/pasien/:id_pasien`, protect, resepControllers.getByIdPasien);
router.put(`/:id`, protect, uploaded.array(), resepControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  resepControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  resepControllers.editArchive
);
router.delete(`/:id`, protect, uploaded.array(), resepControllers.delete);

module.exports = router;
