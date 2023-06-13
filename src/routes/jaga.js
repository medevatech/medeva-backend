const express = require("express");
const router = express.Router();
const { jagaController } = require("../controllers/jaga");
const { protect } = require("../middleware/auth");

router.post("/", protect, jagaController.create);
router.get("/", protect, jagaController.get);
router.get("/distinct", protect, jagaController.getDistinct);
router.get("/dvs/:id", protect, jagaController.getByIdDivision);
router.get("/:id", protect, jagaController.getById);
router.get("/on-divisi/:id", protect, jagaController.getByIdDivisi);
router.get("/on-employee/:id", protect, jagaController.getByIdKaryawan);
router.put("/:id", protect, jagaController.update);
router.put("/archive/:id", protect, jagaController.archive);
router.put("/activate/:id", protect, jagaController.activate);
router.delete("/:id", protect, jagaController.delete);

module.exports = router;
