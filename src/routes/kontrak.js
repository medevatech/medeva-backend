const express = require("express");
const router = express.Router();
const { contractController } = require("../controllers/kontrak");

router.post("/", contractController.create);
router.get("/", contractController.get);
router.get("/:id", contractController.getById);
router.get("/karyawan/:id", contractController.getByIdEmployee);
router.put("/:id", contractController.update);
router.put("/archive/:id", contractController.archive);
router.put("/activate/:id", contractController.activate);
router.delete("/:id", contractController.delete);

module.exports = router;
