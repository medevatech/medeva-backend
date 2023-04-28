const express = require("express");
const router = express.Router();
const { antrianController } = require("../controllers/antrian");

router.post("/", antrianController.create);
router.get("/", antrianController.get);
router.get("/total", antrianController.getTotal);
router.get("/rest", antrianController.getRest);
router.get("/now", antrianController.getNow);
router.get("/next", antrianController.getNext);
router.put("/:id", antrianController.update);

module.exports = router;
