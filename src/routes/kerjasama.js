const express = require(`express`);
const router = express.Router();
const { kerjasamaControllers } = require(`../controllers/kerjasama.js`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), kerjasamaControllers.add);
router.get(`/`, protect, kerjasamaControllers.getAll);
router.get(`/:id`, protect, kerjasamaControllers.getById);
router.get(
  `/asuransi/:id_asuransi`,
  protect,
  kerjasamaControllers.getByIdAsuransi
);
router.get(
  `/asuransi_kelas/:id_asuransi_kelas`,
  protect,
  kerjasamaControllers.getByIdAsuransiKelas
);
router.get(`/klinik/:id_klinik`, protect, kerjasamaControllers.getByIdKlinik);
router.put(`/:id`, protect, uploaded.array(), kerjasamaControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editArchive
);
router.put(
  `/klinik/activate/:id_klinik`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editActivateByIdKlinik
);
router.put(
  `/klinik/archive/:id_klinik`,
  protect,
  uploaded.array(),
  kerjasamaControllers.editArchiveByIdKlinik
);
router.delete('/:id', protect, kerjasamaControllers.delete);
router.delete(
  '/klinik/:id_klinik',
  protect,
  kerjasamaControllers.deleteByIdKlinik
);

module.exports = router;
