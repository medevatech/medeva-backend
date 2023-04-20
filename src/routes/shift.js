const express = require("express");
const router = express.Router();
const { shiftController } = require("../controllers/shift");

router.post("/", shiftController.create);
router.post("/", shiftController.create);
router.get("/", shiftController.get);
router.get("/:id", shiftController.getById);
router.put("/:id", shiftController.update);
router.delete("/:id", shiftController.delete);

module.exports = router;
