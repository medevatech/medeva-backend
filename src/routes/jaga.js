const express = require("express");
const router = express.Router();
const { jagaController } = require("../controllers/jaga");

router.post("/", jagaController.create);
router.post("/", jagaController.create);
router.get("/", jagaController.get);
router.get("/:id", jagaController.getById);
router.put("/:id", jagaController.update);
router.delete("/:id", jagaController.delete);

module.exports = router;
