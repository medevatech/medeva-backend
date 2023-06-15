const express = require("express");
const router = express.Router();
const { jblController } = require("../controllers/jadwalBukaLaboratorium");
const { protect } = require("../middleware/auth");

router.post("/", protect, jblController.create);
router.get("/", protect, jblController.get);
router.get("/:id", protect, jblController.getById);
router.put("/:id", protect, jblController.update);
router.put("/archive/:id", protect, jblController.archive);
router.put("/activate/:id", protect, jblController.activate);
router.delete("/:id", protect, jblController.delete);

module.exports = router;
