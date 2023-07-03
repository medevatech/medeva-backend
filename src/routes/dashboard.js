const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers/dashboard.js');
const { protect } = require('../middleware/auth.js');

router.get('/as-02', protect, dashboardController.getAS02);
router.get('/as-03', dashboardController.getAS03);
router.get(
  '/as-03/analisa-rujukan/:id_dokter',
  dashboardController.getAS03AnalisaRujukan
);
router.get('/as-04', dashboardController.getAS04);

module.exports = router;
