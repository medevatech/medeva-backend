const express = require("express");
const router = express.Router();
const { nonDoctorController } = require("../controllers/shift");
const { protect } = require("../middleware/auth");

router.post("/", protect, nonDoctorController.create);
router.get("/", protect, nonDoctorController.get);
router.get("/:id", protect, nonDoctorController.getById);
router.get("/divisi/:id", protect, nonDoctorController.getByIdDivision);
router.get("/personal/:id", protect, nonDoctorController.getByIdEmployee);
router.get("/jaga/:id", protect, nonDoctorController.getByIdDoctorSchedule);
router.put("/:id", protect, nonDoctorController.update);
router.put("/archive/:id", protect, nonDoctorController.archive);
router.put("/activate/:id", protect, nonDoctorController.activate);

module.exports = router;
