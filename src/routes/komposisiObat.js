const express = require("express");
const router = express.Router();
const {
  medicineCompositionController,
} = require("../controllers/komposisiObat");

router.post("/", medicineCompositionController.create);
router.get("/", medicineCompositionController.get);
router.get("/:id", medicineCompositionController.getById);
router.put("/:id", medicineCompositionController.update);
router.put("/archive/:id", medicineCompositionController.archive);
router.put("/activate/:id", medicineCompositionController.activate);

module.exports = router;
