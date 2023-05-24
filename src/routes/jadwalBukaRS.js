const express = require(`express`);
const router = express.Router();
const { jadwalBukaRSControllers } = require(`../controllers/jadwalBukaRS`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), jadwalBukaRSControllers.add);
router.get(`/`, jadwalBukaRSControllers.getAll);
router.get(`/:id`, jadwalBukaRSControllers.getById);
router.put(`/:id`, uploaded.array(), jadwalBukaRSControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  jadwalBukaRSControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  jadwalBukaRSControllers.editArchive
);
router.delete(`/:id`, uploaded.array(), jadwalBukaRSControllers.delete);

module.exports = router;
