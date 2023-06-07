const { response } = require("../middleware/common");
const {
  createJaga,
  countJaga,
  getJaga,
  getJagaById,
  updateJaga,
  archiveJaga,
  activateJaga,
  deleteJaga,
  getJagaByIdDivisi,
  getJagaByIdKaryawan,
  getDistictSchedule,
  getScheduleByIdDivision,
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
        id_karyawan: req.body.id_karyawan,
        hari: req.body.hari,
        tanggal: req.body.tanggal,
        waktu_mulai: req.body.waktu_mulai,
        waktu_selesai: req.body.waktu_selesai,
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
      const searchName = req.query.searchName || "";
      const searchStatus = req.query.searchStatus || "";
      const searchDivisi = req.query.searchDivisi || "";
      const searchDivisiName = req.query.searchDivisiName || "";
      const offset = (page - 1) * limit;
      const result = await getJaga({
        searchName,
        searchStatus,
        searchDivisi,
        searchDivisiName,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countJaga();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      response(
        res,
        200,
        true,
        result.rows,
        "Get jaga data success",
        pagination
      );
    } catch (err) {
      console.log("Get jaga data error", err);
      response(res, 400, false, null, "Get jaga data failed");
    }
  },
  getDistinct: async (req, res, next) => {
    try {
      const result = await getDistictSchedule();
      response(res, 200, true, result.rows, "Get distinct schedule success");
    } catch (err) {
      console.log("err", err);
      response(res, 400, false, null, "Get distinct schedule error");
    }
  },
  getByIdDivision: async (req, res, next) => {
    try {
      const id = req.params.id;
      const searchDay = req.query.searchDay || "";
      console.log("serdei", searchDay);
      let searchDays = 0;
      if (searchDay === "Senin") {
        searchDays = 1;
      }
      if (searchDay === "Selasa") {
        searchDays = 2;
      }
      if (searchDay === "Rabu") {
        searchDays = 3;
      }
      const result = await getScheduleByIdDivision({
        id: id,
        searchDay: searchDays,
      });
      response(
        res,
        200,
        true,
        result.rows,
        "Get schedule by id division success"
      );
    } catch (err) {
      console.log("err", err);
      response(res, 400, false, null, "Get schedule by id division error");
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
  getByIdDivisi: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchStatus = req.query.searchStatus || "1";
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder || "asc";
    const offset = (page - 1) * limit;
    const id = req.params.id;
    // console.log(page, limit, sortBy, sortOrder, offset, id);
    try {
      const result = await getJagaByIdDivisi({
        id,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countJaga();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      response(
        res,
        200,
        true,
        result.rows,
        "Get jaga by ID divisi success",
        pagination
      );
    } catch (err) {
      console.log("Get jaga by ID divisi error", err);
      response(res, 400, false, err, "Get jaga by ID divisi failed");
    }
  },
  getByIdKaryawan: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchStatus = req.query.searchStatus || "1";
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder || "asc";
    const offset = (page - 1) * limit;
    const id = req.params.id;
    // console.log(page, limit, sortBy, sortOrder, offset, id);
    try {
      const result = await getJagaByIdKaryawan({
        id,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countJaga();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      response(
        res,
        200,
        true,
        result.rows,
        "Get jaga by ID karyawan success",
        pagination
      );
    } catch (err) {
      console.log("Get jaga by ID karyawan error", err);
      response(res, 400, false, err, "Get jaga by ID karyawan failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_karyawan = req.body.id_karyawan;
      const hari = req.body.hari;
      const tanggal = req.body.tanggal;
      const waktu_mulai = req.body.waktu_mulai;
      const waktu_selesai = req.body.waktu_selesai;
      const data = {
        id,
        id_karyawan,
        hari,
        tanggal,
        waktu_mulai,
        waktu_selesai,
      };
      await updateJaga(data);
      response(res, 200, true, data, "Update jaga data success");
    } catch (err) {
      console.log("Update jaga data error", err);
      response(res, 400, false, "Update jaga data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveJaga(req.params.id);
      return response(res, 200, true, null, "Archive jaga success");
    } catch (err) {
      return response(res, 400, false, err, "Archive jaga failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateJaga(req.params.id);
      return response(res, 200, true, null, "Activate jaga success");
    } catch (err) {
      return response(res, 400, false, err, "Activate jaga failed");
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
