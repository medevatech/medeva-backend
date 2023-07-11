const { response } = require("../middleware/common");
const {
  createServiceClinic,
  getServiceClinic,
  getServiceClinicById,
  updateServiceClinic,
  archiveServiceClinic,
  activateServiceClinic,
} = require("../models/klinikJasa");
const { v4: uuidv4 } = require("uuid");

const serviceClinicController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const { id_klinik, nama, harga } = req.body;
      const data = {
        id: id,
        id_clinic: id_klinik,
        name: nama,
        price: harga,
      };
      await createServiceClinic(data);
      response(res, 200, true, data, "Tambah klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Tambah klinik jaga gagal");
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getServiceClinic();
      response(res, 200, true, result.rows, "Get klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get klniik jasa gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getServiceClinicById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get klinik jasa berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get klinik jasa berdasarkan id gagal");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { id_klinik, nama, harga } = req.body;
      const data = {
        id_clinic: id_klinik,
        name: nama,
        price: harga,
      };
      await updateServiceClinic(id, data);
      response(res, 200, true, data, "Edit klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Edit klinik jasa gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveServiceClinic(id);
      response(res, 200, true, [], "Arsip klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi klinik jasa gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateServiceClinic(id);
      response(res, 200, true, [], "Aktivasi klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi klinik jasa gagal");
    }
  },
};

exports.serviceClinicController = serviceClinicController;
