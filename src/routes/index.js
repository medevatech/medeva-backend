const express = require('express');
const router = express.Router();
const pasienControllers = require('./pasien');

router.use('/pasien', pasienControllers);

module.exports = router;
