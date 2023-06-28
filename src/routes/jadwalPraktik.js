const express = require("express");
const router = express.Router();
const { practiceScheduleController } = require("../controllers/jadwalPraktik");

router.post("/", practiceScheduleController.create);

module.exports = router;
