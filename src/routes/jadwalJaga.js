const express = require("express");
const router = express.Router();
const { doctorScheduleController } = require("../controllers/jadwalJaga");

router.post("/", doctorScheduleController.create);
router.get("/", doctorScheduleController.get);
router.get("/distinct", doctorScheduleController.getDistinct);
router.get("/:id", doctorScheduleController.getById);
router.get("/divisi/:id", doctorScheduleController.getByIdDivision);
router.get("/personal/:id", doctorScheduleController.getByIdDoctor);
router.put("/:id", doctorScheduleController.update);
router.put("/archive/:id", doctorScheduleController.archive);
router.put("/activate/:id", doctorScheduleController.activate);
router.delete("/:id", doctorScheduleController.delete);

module.exports = router;
