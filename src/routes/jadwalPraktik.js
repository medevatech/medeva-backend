const express = require("express");
const router = express.Router();
const { practiceScheduleController } = require("../controllers/jadwalPraktik");

router.post("/", practiceScheduleController.create);
router.get("/", practiceScheduleController.get);
router.put("/:id", practiceScheduleController.update);
router.put("/archive/:id", practiceScheduleController.archive);
router.put("/activate/:id", practiceScheduleController.activate);
router.delete("/:id", practiceScheduleController.delete);

module.exports = router;
