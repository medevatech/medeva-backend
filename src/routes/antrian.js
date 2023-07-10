const express = require("express");
const router = express.Router();
const { antrianController } = require("../controllers/antrian");
const { protect } = require("../middleware/auth");

// router.post("/", protect, antrianController.create);
// router.get("/", protect, antrianController.get);
// router.get("/:id", protect, antrianController.getById);
// router.get("/division/:id", protect, antrianController.getByScheduleId);
// router.get("/total", protect, antrianController.getTotal);
// router.get("/rest", protect, antrianController.getRest);
// router.get("/now", protect, antrianController.getNow);
// router.get("/next", protect, antrianController.getNext);
// router.put("/:id", protect, antrianController.update);
// router.put("/prioritas/:id", protect, antrianController.updateP);
// router.delete("/:id", protect, antrianController.delete);

router.post("/", antrianController.create);
router.get("/", antrianController.get);
router.get("/:id", antrianController.getById);
router.get("/divisi/:id", antrianController.getByScheduleId);
router.get("/total", antrianController.getTotal);
router.get("/rest", antrianController.getRest);
router.get("/now", antrianController.getNow);
router.get("/next", antrianController.getNext);
router.put("/:id", antrianController.update);
router.put("/prioritas/:id", antrianController.updateP);
router.delete("/:id", antrianController.delete);

module.exports = router;
