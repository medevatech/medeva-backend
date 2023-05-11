const express = require("express");
const router = express.Router();
const {
  layananLaboratoriumController,
} = require("../controllers/layananLaboratorium");

router.post("/", layananLaboratoriumController.create);
router.get("/", layananLaboratoriumController.get);
router.get("/distinct", layananLaboratoriumController.getDistinct);
router.get("/:id", layananLaboratoriumController.getById);
router.put("/:id", layananLaboratoriumController.update);
router.delete("/:id", layananLaboratoriumController.delete);

module.exports = router;
