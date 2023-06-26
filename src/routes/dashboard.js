const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers/dashboard.js');
const { protect } = require('../middleware/auth');

router.get('/as-02', dashboardController.get);

module.exports = router;
