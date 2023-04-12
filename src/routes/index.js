const express = require('express');
const router = express.Router();

const pasienControllers = require('./pasien');
const skriningControllers = require('./skrining');
const alergiControllers = require('./alergi');
const alergiPasienControllers = require('./alergiPasien');
const vitalSignsControllers = require('./vitalSigns');
const kunjunganControllers = require('./kunjungan');

router.use('/pasien', pasienControllers);
router.use('/skrining', skriningControllers);
router.use('/alergi', alergiControllers);
router.use('/alergi-pasien', alergiPasienControllers);
router.use('/vital-signs', vitalSignsControllers);
router.use('/kunjungan', kunjunganControllers);

module.exports = router;
