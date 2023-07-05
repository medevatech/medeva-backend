const express = require("express");
const router = express.Router();
const { doctorScheduleController } = require("../controllers/jadwalDokter");

router.post("/", doctorScheduleController.create);
router.get("/", doctorScheduleController.get);
router.get("/:id", doctorScheduleController.getById);
router.put("/:id", doctorScheduleController.update);
router.put("/archive/:id", doctorScheduleController.archive);
router.put("/activate/:id", doctorScheduleController.activate);
router.delete("/:id", doctorScheduleController.delete);

module.exports = router;
