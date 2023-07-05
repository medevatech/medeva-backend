const express = require("express");
const router = express.Router();
const { klinikController } = require("../controllers/klinik");
const { protect } = require("../middleware/auth");

router.post("/", klinikController.create);
router.get("/", klinikController.get);
router.get("/:id", klinikController.getById);
router.put("/:id", klinikController.update);
router.delete("/:id", klinikController.delete);

module.exports = router;
