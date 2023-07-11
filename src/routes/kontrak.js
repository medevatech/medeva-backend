const express = require("express");
const router = express.Router();
const { contractController } = require("../controllers/kontrak");
const { protect } = require("../middleware/auth");

router.post("/", protect, contractController.create);
router.get("/", protect, contractController.get);
router.get("/:id", protect, contractController.getById);
router.get("/karyawan/:id", protect, contractController.getByIdEmployee);
router.put("/:id", protect, contractController.update);
router.put("/archive/:id", protect, contractController.archive);
router.put("/activate/:id", protect, contractController.activate);
router.delete("/:id", protect, contractController.delete);

module.exports = router;
