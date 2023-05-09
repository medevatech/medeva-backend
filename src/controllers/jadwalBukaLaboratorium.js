const { response } = require("../middleware/common");
const {
  createJBL,
  getJBL,
  countJBL,
  getJBLById,
  updateJBL,
  archiveJBL,
  activateJBL,
  deleteJBL,
} = require("../models/jadwalBukaLaboratorium");

const jblController = {
  create: async (req, res, next) => {
    try {
      let digits = "0123456789";
      let id = "JBL";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_laboratorium: req.body.id_laboratorium,
        hari: req.body.hari,
        jam_buka: req.body.jam_buka,
        jam_tutup: req.body.jam_tutup,
      };
      await createJBL(data);
      response(res, 200, true, data, "Create jadwal buka laboratorium success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create jadwal buka laboratorium failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "hari";
      const sortOrder = req.query.sortOrder || "desc";
      const searchHari = req.query.searchHari || "";
      const searchStatus = req.query.searchStatus || "";
      const searchLaboratorium = req.query.searchLaboratorium || "";
      const offset = (page - 1) * limit;
      const result = await getJBL({
        searchHari,
        searchStatus,
        searchLaboratorium,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countJBL();
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
        "Get jadwal buka laboratorium data success",
        pagination
      );
    } catch (err) {
      console.log("Get jadwal buka laboratorium data error", err);
      response(
        res,
        400,
        false,
        null,
        "Get jadwal buka laboratorium data failed"
      );
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getJBLById(req.params.id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal buka laboratorium data by ID success"
      );
    } catch (err) {
      console.log("Get jadwal buka laboratorium data by ID error", err);
      response(
        res,
        400,
        false,
        err,
        "Get jadwal buka laboratorium data by ID failed"
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_laboratorium = req.body.id_laboratorium;
      const hari = req.body.hari;
      const jam_buka = req.body.jam_buka;
      const jam_tutup = req.body.jam_tutup;
      const data = {
        id,
        id_laboratorium,
        hari,
        jam_buka,
        jam_tutup,
      };
      await updateJBL(data);
      response(
        res,
        200,
        true,
        data,
        "Update jadwal buka laboratorium data success"
      );
    } catch (err) {
      console.log("Update jadwal buka laboratorium data error", err);
      response(res, 400, false, "Update jadwal buka laboratorium data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveJBL(req.params.id);
      return response(
        res,
        200,
        true,
        null,
        "Archive jadwal buka laboratorium success"
      );
    } catch (err) {
      return response(
        res,
        400,
        false,
        err,
        "Archive jadwal buka laboratorium failed"
      );
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateJBL(req.params.id);
      return response(
        res,
        200,
        true,
        null,
        "Activate jadwal buka laboratorium success"
      );
    } catch (err) {
      return response(
        res,
        400,
        false,
        err,
        "Activate jadwal buka laboratorium failed"
      );
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteJBL(req.params.id);
      response(res, 200, true, null, "Delete jadwal buka laboratorium success");
    } catch (err) {
      console.log("Delete jadwal buka laboratorium error", err);
      response(res, 400, false, err, "Delete jadwal buka laboratorium failed");
    }
  },
};

exports.jblController = jblController;
