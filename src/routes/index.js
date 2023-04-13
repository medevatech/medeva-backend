const express = require('express');
const router = express.Router();
const pasienControllers = require('./pasien');
const asuransiControllers = require('./asuransi');

router.use('/pasien', pasienControllers);
router.use('/asuransi', asuransiControllers);

module.exports = router;
