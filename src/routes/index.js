const express = require('express');
const router = express.Router();

const pasienControllers = require('./pasien');
const skriningControllers = require('./skrining');
const alergiControllers = require('./alergi');
const alergiPasienControllers = require('./alergiPasien');
const vitalSignsControllers = require('./vitalSigns');
const kunjunganControllers = require('./kunjungan');
const penyakitControllers = require('./penyakit');
const diagnosisControllers = require('./diagnosis');
const tempKunjunganControllers = require('./tempKunjungan');
const pemeriksaanControllers = require('./pemeriksaan');
const pemeriksaanPenunjangControllers = require('./pemeriksaanPenunjang');

router.use('/pasien', pasienControllers);
router.use('/skrining', skriningControllers);
router.use('/alergi', alergiControllers);
router.use('/alergi-pasien', alergiPasienControllers);
router.use('/vital-signs', vitalSignsControllers);
router.use('/kunjungan', kunjunganControllers);
router.use('/penyakit', penyakitControllers);
router.use('/diagnosis', diagnosisControllers);
router.use('/temp-kunjungan', tempKunjunganControllers);
router.use('/pemeriksaan', pemeriksaanControllers);
router.use('/pemeriksaan-penunjang', pemeriksaanPenunjangControllers);

module.exports = router;
