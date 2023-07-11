const express = require("express");
const router = express.Router();
const {
  buildingLandAssetClinicController,
} = require("../controllers/klinikAsetTanahBangunan");

router.post("/", buildingLandAssetClinicController.create);
router.get("/", buildingLandAssetClinicController.get);
router.get("/:id", buildingLandAssetClinicController.getById);
router.put("/:id", buildingLandAssetClinicController.update);
router.put("/archive/:id", buildingLandAssetClinicController.archive);
router.put("/activate/:id", buildingLandAssetClinicController.activate);

module.exports = router;
