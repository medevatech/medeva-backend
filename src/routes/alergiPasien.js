const express = require(`express`);
const router = express.Router();
const { alergiPasienControllers } = require(`../controllers/alergiPasien`);
const { protect } = require("../middleware/auth");
let multer = require("multer");
let uploaded = multer();

router.post(`/`, protect, uploaded.array(), alergiPasienControllers.add);
router.get(`/`, protect, alergiPasienControllers.getAll);
router.get(`/:id`, protect, alergiPasienControllers.getById);
router.get(
  `/pasien/:id_pasien`,
  protect,
  alergiPasienControllers.getByIdPasien
);
router.put(`/:id`, protect, uploaded.array(), alergiPasienControllers.edit);
router.put(
  `/activate/:id`,
  protect,
  uploaded.array(),
  alergiPasienControllers.editActivate
);
router.put(
  `/archive/:id`,
  protect,
  uploaded.array(),
  alergiPasienControllers.editArchive
);
router.delete(
  `/:id`,
  protect,
  uploaded.array(),
  alergiPasienControllers.delete
);

module.exports = router;
