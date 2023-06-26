const express = require('express');
const router = express.Router();
const { jagaController } = require('../controllers/jaga');
const { protect } = require('../middleware/auth');

router.post('/', jagaController.create);
router.get('/', jagaController.get);
router.get('/distinct', jagaController.getDistinct);
router.get('/dvs/:id', jagaController.getByIdDivision);
router.get('/:id', jagaController.getById);
router.get('/on-divisi/:id', jagaController.getByIdDivisi);
router.get('/on-employee/:id', jagaController.getByIdKaryawan);
router.put('/:id', jagaController.update);
router.put('/archive/:id', jagaController.archive);
router.put('/activate/:id', jagaController.activate);
router.delete('/:id', jagaController.delete);

module.exports = router;
