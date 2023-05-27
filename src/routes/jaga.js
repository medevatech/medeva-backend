const express = require("express");
const router = express.Router();
const { jagaController } = require("../controllers/jaga");

router.post("/", jagaController.create);
router.get("/", jagaController.get);
router.get("/:id", jagaController.getById);
router.get("/on-divisi/:id", jagaController.getByIdDivisi);
router.put("/:id", jagaController.update);
router.put("/archive/:id", jagaController.archive);
router.put("/activate/:id", jagaController.activate);
router.delete("/:id", jagaController.delete);

module.exports = router;
