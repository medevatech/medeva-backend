const { response } = require("../middleware/common");
const {
  createShift,
  getShift,
  getShiftById,
  updateShift,
  deleteShift,
} = require("../models/shift");

const shiftController = {
  create: async (req, res, next) => {
    try {
      let digits = "0123456789";
      let id = "SHF";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_klinik: req.body.id_klinik,
        id_divisi: req.body.id_divisi,
        hari: req.body.hari,
        tanggal: req.body.tanggal,
        waktu_mulai: req.body.waktu_mulai,
        waktu_selesai: req.body.waktu_selesai,
      };
      await createShift(data);
      response(res, 200, true, data, "Create shift success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create shift failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "hari";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const result = await getShift({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(
        res,
        200,
        true,
        { result: result.rows },
        "Get shift data success"
      );
    } catch (err) {
      console.log("Get shift data error", err);
      response(res, 400, false, null, "Get shift data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getShiftById(req.params.id);
      response(res, 200, true, result.rows, "Get shift data by ID success");
    } catch (err) {
      console.log("Get shift data by ID error", err);
      response(res, 400, false, err, "Get shift data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.body.id;
      const id_klinik = req.body.id_klinik;
      const id_divisi = req.body.id_divisi;
      const hari = req.body.hari;
      const tanggal = req.body.tanggal;
      const waktu_mulai = req.body.waktu_mulai;
      const waktu_selesai = req.body.waktu_selesai;
      const data = {
        id,
        id_klinik,
        id_divisi,
        hari,
        tanggal,
        waktu_mulai,
        waktu_selesai,
      };
      await updateShift(data);
      response(res, 200, true, data, "Update shift data success");
    } catch (err) {
      console.log("Update shift data error", err);
      response(res, 400, false, "Update shift data failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteShift(req.params.id);
      response(res, 200, true, null, "Delete shift success");
    } catch (err) {
      console.log("Delete shift error", err);
      response(res, 400, false, err, "Delete shift failed");
    }
  },
};

exports.shiftController = shiftController;
