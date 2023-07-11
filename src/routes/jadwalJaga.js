const express = require("express");
const router = express.Router();
const { doctorScheduleController } = require("../controllers/jadwalJaga");
const { protect } = require("../middleware/auth");

router.post("/", protect, doctorScheduleController.create);
router.get("/", protect, doctorScheduleController.get);
router.get("/distinct", protect, doctorScheduleController.getDistinct);
router.get("/:id", protect, doctorScheduleController.getById);
router.get("/divisi/:id", protect, doctorScheduleController.getByIdDivision);
router.get("/personal/:id", protect, doctorScheduleController.getByIdDoctor);
router.get("/today/:id", protect, doctorScheduleController.getToday);
router.put("/:id", protect, doctorScheduleController.update);
router.put("/archive/:id", protect, doctorScheduleController.archive);
router.put("/activate/:id", protect, doctorScheduleController.activate);
router.delete("/:id", protect, doctorScheduleController.delete);

module.exports = router;
