const express = require("express");
const router = express.Router();
const { klinikController } = require("../controllers/klinik");
const { protect } = require("../middleware/auth");

router.post("/", protect, klinikController.create);
router.get("/", protect, klinikController.get);
router.get("/:id", protect, klinikController.getById);
router.put("/:id", protect, klinikController.update);
router.delete("/:id", protect, klinikController.delete);

module.exports = router;
