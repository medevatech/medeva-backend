const express = require("express");
const router = express.Router();
const { daftarLayananController } = require("../controllers/daftarLayanan");

router.post("/", daftarLayananController.create);
router.get("/", daftarLayananController.get);
router.get("/:id", daftarLayananController.getById);
router.put("/:id", daftarLayananController.update);
router.put("/archive/:id", daftarLayananController.archive);
router.put("/activate/:id", daftarLayananController.activate);
router.delete("/:id", daftarLayananController.delete);

module.exports = router;
