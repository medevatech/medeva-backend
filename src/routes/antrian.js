const express = require("express");
const router = express.Router();
const { antrianController } = require("../controllers/antrian");
const { protect } = require("../middleware/auth");

router.post("/", protect, antrianController.create);
router.get("/", protect, antrianController.get);
router.get("/:id", protect, antrianController.getById);
router.get("/total", protect, antrianController.getTotal);
router.get("/rest", protect, antrianController.getRest);
router.get("/now", protect, antrianController.getNow);
router.get("/next", protect, antrianController.getNext);
router.put("/:id", protect, antrianController.update);
router.put("/prioritas/:id", protect, antrianController.updateP);
router.delete("/:id", protect, antrianController.delete);

module.exports = router;
