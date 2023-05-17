const express = require(`express`);
const router = express.Router();
const { daftarTindakanControllers } = require(`../controllers/daftarTindakan`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), daftarTindakanControllers.add);
router.get(`/`, daftarTindakanControllers.getAll);
router.get(`/:id`, daftarTindakanControllers.getById);
router.put(`/:id`, uploaded.array(), daftarTindakanControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  daftarTindakanControllers.editActivate
);
router.put(
  `/archive/:id`,
  uploaded.array(),
  daftarTindakanControllers.editArchive
);
router.delete('/:id', daftarTindakanControllers.delete);

module.exports = router;
