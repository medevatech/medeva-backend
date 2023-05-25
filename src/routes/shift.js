const express = require("express");
const router = express.Router();
const { shiftController } = require("../controllers/shift");

router.post("/", shiftController.create);
router.post("/", shiftController.create);
router.get("/", shiftController.get);
router.get("/:id", shiftController.getById);
router.get("/clinic/:id", shiftController.getByIdClinic);
router.put("/:id", shiftController.update);
router.put("/archive/:id", shiftController.archive);
router.put("/activate/:id", shiftController.activate);
router.delete("/:id", shiftController.delete);

module.exports = router;
