const { response } = require("../middleware/common");
const {
  createBuildingLandAssetClinic,
  getBuildingLandAssetClinic,
  getBuildingLandAssetClinicById,
  updateBuildingLandAssetClinic,
  archiveBuildingLandAssetClinic,
  activateBuildingLandAssetClinic,
} = require("../models/klinikAsetTanahBangunan");
const { v4: uuidv4 } = require("uuid");

const buildingLandAssetClinicController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const {
        id_klinik,
        nama,
        tanggal_beli,
        harga_beli,
        tipe,
        habis_masa_hidup,
        metode_depresiasi,
      } = req.body;
      const data = {
        id: id,
        id_clinic: id_klinik,
        name: nama,
        purchase_date: tanggal_beli,
        purchase_price: harga_beli,
        type: tipe,
        expired: habis_masa_hidup,
        depreciation_method: metode_depresiasi,
      };
      await createBuildingLandAssetClinic(data);
      response(
        res,
        200,
        true,
        data,
        "Tambah klinik aset tanah bangunan berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Tambah klinik aset tanah bangunan gagal");
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getBuildingLandAssetClinic();
      response(
        res,
        200,
        true,
        result.rows,
        "Get klinik aset tanah bangunan berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get klinik aset tanah bangunan gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getBuildingLandAssetClinicById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get klinik aset tanah bangunan berdasarkan id"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get klinik aset tanah bangunan berdasarkan id gagal"
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        id_klinik,
        nama,
        tanggal_beli,
        harga_beli,
        tipe,
        habis_masa_hidup,
        metode_depresiasi,
      } = req.body;
      const data = {
        id: id,
        id_clinic: id_klinik,
        name: nama,
        purchase_date: tanggal_beli,
        purchase_price: harga_beli,
        type: tipe,
        expired: habis_masa_hidup,
        depreciation_method: metode_depresiasi,
      };
      await updateBuildingLandAssetClinic(id, data);
      response(
        res,
        200,
        true,
        data,
        "Edit klinik aset tanah bangunan berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Edit klinik aset tanah bangunan gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveBuildingLandAssetClinic(id);
      response(res, 200, true, [], "Arsip klinik aset tanah bangunan berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Arsip klinik aset tanah bangunan gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateBuildingLandAssetClinic(id);
      response(
        res,
        200,
        true,
        [],
        "Aktivasi klinik aset tanah bangunan berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Aktivasi klinik aset tanah bangunan gagal"
      );
    }
  },
};

exports.buildingLandAssetClinicController = buildingLandAssetClinicController;
