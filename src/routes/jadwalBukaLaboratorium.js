const express = require("express");
const router = express.Router();
const { jblController } = require("../controllers/jadwalBukaLaboratorium");

router.post("/", jblController.create);
router.get("/", jblController.get);
router.get("/:id", jblController.getById);
router.put("/:id", jblController.update);
router.put("/archive/:id", jblController.archive);
router.put("/activate/:id", jblController.activate);
router.delete("/:id", jblController.delete);

module.exports = router;
