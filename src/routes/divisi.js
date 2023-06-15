const express = require("express");
const router = express.Router();
const { divisiController } = require("../controllers/divisi");
const { protect } = require("../middleware/auth");

router.post("/", protect, divisiController.create);
router.get("/", protect, divisiController.get);
router.get("/distinct", protect, divisiController.getDistinct);
router.get("/:id", protect, divisiController.getById);
router.get("/clinic/:id", protect, divisiController.getByIdClinic);
router.put("/:id", protect, divisiController.update);
router.put("/archive/:id", protect, divisiController.archive);
router.put("/activate/:id", protect, divisiController.activate);
router.delete("/:id", protect, divisiController.delete);

module.exports = router;
