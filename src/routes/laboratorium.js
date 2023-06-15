const express = require("express");
const router = express.Router();
const { laboratoriumController } = require("../controllers/laboratorium");
const { protect } = require("../middleware/auth");

router.post("/", protect, laboratoriumController.create);
router.get("/", protect, laboratoriumController.get);
router.get("/:id", protect, laboratoriumController.getById);
router.put("/:id", protect, laboratoriumController.update);
router.put("/archive/:id", protect, laboratoriumController.archive);
router.put("/activate/:id", protect, laboratoriumController.activate);
router.delete("/:id", protect, laboratoriumController.delete);

module.exports = router;
