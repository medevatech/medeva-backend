const express = require("express");
const router = express.Router();
const { practiceScheduleController } = require("../controllers/jadwalPraktik");

router.post("/", practiceScheduleController.create);
router.get("/", practiceScheduleController.get);

module.exports = router;
