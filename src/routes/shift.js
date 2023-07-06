const express = require("express");
const router = express.Router();
const { nonDoctorController } = require("../controllers/jadwalNonDokter");
// const { protect } = require("../middleware/auth");

router.post("/", nonDoctorController.create);
// router.get("/", protect, shiftController.get);
// router.get("/:id", protect, shiftController.getById);
// router.get("/clinic/:id", protect, shiftController.getByIdClinic);
// router.put("/:id", protect, shiftController.update);
// router.put("/archive/:id", protect, shiftController.archive);
// router.put("/activate/:id", protect, shiftController.activate);
// router.delete("/:id", protect, shiftController.delete);

module.exports = router;
