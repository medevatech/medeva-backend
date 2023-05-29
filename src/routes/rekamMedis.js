const express = require(`express`);
const router = express.Router();
const { rekamMedisControllers } = require(`../controllers/rekamMedis`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), rekamMedisControllers.add);
router.get(`/`, rekamMedisControllers.getAll);
router.get(`/:id`, rekamMedisControllers.getById);
router.put(`/:id`, uploaded.array(), rekamMedisControllers.edit);
router.put(
  `/activate/:id`,
  uploaded.array(),
  rekamMedisControllers.editActivate
);
router.put(`/archive/:id`, uploaded.array(), rekamMedisControllers.editArchive);
router.delete(`/:id`, uploaded.array(), rekamMedisControllers.delete);

module.exports = router;
