const express = require("express");
const router = express.Router();
const {
  layananLaboratoriumController,
} = require("../controllers/layananLaboratorium");
const { protect } = require("../middleware/auth");

router.post("/", protect, layananLaboratoriumController.create);
router.get("/", protect, layananLaboratoriumController.get);
router.get("/distinct", protect, layananLaboratoriumController.getDistinct);
router.get("/laboratorium/:id", layananLaboratoriumController.getByIdLab);
router.get("/:id", protect, layananLaboratoriumController.getById);
router.put("/:id", protect, layananLaboratoriumController.update);
router.delete("/laboratorium/:id", layananLaboratoriumController.deleteByIdLab);
router.delete("/:id", protect, layananLaboratoriumController.delete);

module.exports = router;
