const express = require("express");
const router = express.Router();
const { laboratoriumController } = require("../controllers/laboratorium");

router.post("/", laboratoriumController.create);
router.get("/", laboratoriumController.get);
router.get("/:id", laboratoriumController.getById);
router.put("/:id", laboratoriumController.update);
router.put("/archive/:id", laboratoriumController.archive);
router.put("/activate/:id", laboratoriumController.activate);
router.delete("/:id", laboratoriumController.delete);

module.exports = router;
