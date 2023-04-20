const express = require("express");
const router = express.Router();
const { divisiController } = require("../controllers/divisi");

router.post("/", divisiController.create);
router.get("/", divisiController.get);
router.get("/:id", divisiController.getById);
router.put("/:id", divisiController.update);
router.delete("/:id", divisiController.delete);

module.exports = router;
