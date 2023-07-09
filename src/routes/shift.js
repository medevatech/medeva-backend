const express = require("express");
const router = express.Router();
const { nonDoctorController } = require("../controllers/jadwalNonDokter");
// const { protect } = require("../middleware/auth");

router.post("/", nonDoctorController.create);
router.get("/", nonDoctorController.get);
router.get("/:id", nonDoctorController.getById);
router.get("/divisi/:id", nonDoctorController.getByIdDivision);
router.get("/karyawan/:id", nonDoctorController.getByIdEmployee);
router.get("/jaga/:id", nonDoctorController.getByIdDoctorSchedule);
router.put("/:id", nonDoctorController.update);
router.put("/archive/:id", nonDoctorController.archive);
router.put("/activate/:id", nonDoctorController.activate);

module.exports = router;
