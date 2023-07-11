const express = require("express");
const router = express.Router();
const { serviceClinicController } = require("../controllers/klinikJasa");

router.post("/", serviceClinicController.create);
router.get("/", serviceClinicController.get);
router.get("/:id", serviceClinicController.getById);
router.put("/:id", serviceClinicController.update);
router.put("/archive/:id", serviceClinicController.archive);
router.put("/activate/:id", serviceClinicController.activate);

module.exports = router;
