const { response } = require("../middleware/common");
const {
  createJaga,
  getJaga,
  getJagaById,
  updateJaga,
  deleteJaga,
} = require("../models/jaga");

const jagaController = {
  create: async (req, res, next) => {
    try {
      let digits = "0123456789";
      let id = "JJG";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_klinik: req.body.id_klinik,
        id_divisi: req.body.id_divisi,
        id_shift: req.body.id_shift,
        id_karyawan: req.body.id_karyawan,
      };
      await createJaga(data);
      response(res, 200, true, data, "Create jaga success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create jaga failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const result = await getJaga({
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
        "Get jaga data success"
      );
    } catch (err) {
      console.log("Get jaga data error", err);
      response(res, 400, false, null, "Get jaga data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getJagaById(req.params.id);
      response(res, 200, true, result.rows, "Get jaga data by ID success");
    } catch (err) {
      console.log("Get jaga data by ID error", err);
      response(res, 400, false, err, "Get jaga data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.body.id;
      const id_klinik = req.body.id_klinik;
      const id_divisi = req.body.id_divisi;
      const id_shift = req.body.id_shift;
      const id_karyawan = req.body.id_karyawan;
      const data = {
        id,
        id_klinik,
        id_divisi,
        id_shift,
        id_karyawan,
      };
      await updateJaga(data);
      response(res, 200, true, data, "Update jaga data success");
    } catch (err) {
      console.log("Update jaga data error", err);
      response(res, 400, false, "Update jaga data failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteJaga(req.params.id);
      response(res, 200, true, null, "Delete jaga success");
    } catch (err) {
      console.log("Delete jaga error", err);
      response(res, 400, false, err, "Delete jaga failed");
    }
  },
};

exports.jagaController = jagaController;
