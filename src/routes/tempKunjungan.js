const express = require(`express`);
const router = express.Router();
const { tempKunjunganControllers } = require(`../controllers/tempKunjungan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), tempKunjunganControllers.add);
router.get(`/`, tempKunjunganControllers.getAll);
router.get(`/:id`, tempKunjunganControllers.getById);
router.put(`/:id`, uploaded.array(), tempKunjunganControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  tempKunjunganControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  tempKunjunganControllers.editArchive
);
router.delete(`/:id`, uploaded.array(), tempKunjunganControllers.delete);

module.exports = router;
