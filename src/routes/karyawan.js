const express = require("express");
const router = express.Router();
const { karyawanController } = require("../controllers/karyawan");
const upload = require("../middleware/upload");
const { protect, dev_man_adm } = require("../middleware/auth");

router.post("/", protect, karyawanController.add);
router.post("/login", karyawanController.login);
router.get("/", protect, karyawanController.get);
router.get("/:id", protect, karyawanController.getById);
router.put("/:id", protect, karyawanController.update);
router.put(
  "/photo/:id",
  protect,
  upload.single("foto"),
  karyawanController.updatePhoto
);
router.put("/password/:id", protect, karyawanController.updatePassword);
router.put("/archive/:id", protect, karyawanController.archive);
router.put("/activate/:id", protect, karyawanController.activate);
router.delete("/:id", protect, karyawanController.delete);

module.exports = router;
