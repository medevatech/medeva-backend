const express = require("express");
const router = express.Router();
const { layananController } = require("../controllers/layanan");

router.post("/", layananController.create);
router.get("/", layananController.get);
router.get("/:id", layananController.getById);
router.delete("/:id", layananController.delete);

module.exports = router;
