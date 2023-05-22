const express = require(`express`);
const router = express.Router();
const { alergiPasienControllers } = require(`../controllers/alergiPasien`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), alergiPasienControllers.add);
router.get(`/`, alergiPasienControllers.getAll);
router.get(`/:id`, alergiPasienControllers.getById);
router.get(`/pasien/:id_pasien`, alergiPasienControllers.getByIdPasien);
router.put(`/:id`, uploaded.array(), alergiPasienControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  alergiPasienControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  alergiPasienControllers.editArchive
);
router.delete(`/:id`, uploaded.array(), alergiPasienControllers.delete);

module.exports = router;
