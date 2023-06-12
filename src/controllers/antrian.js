const { response } = require("../middleware/common");
const {
  countAntrianDaily,
  countAntrianAll,
  createAntrian,
  getAntrian,
  getTotalAntrian,
  getRestAntrian,
  getNowAntrian,
  getNextAntrian,
  updateAntrian,
  deleteAntrian,
  updatePrioritasAntrian,
  getAntrianById,
} = require("../models/antrian");

const antrianController = {
  create: async (req, res, next) => {
    const {
      rows: [count],
    } = await countAntrianDaily();
    const total = parseInt(count.total);
    var no_antrian = "";
    if (total > 0) {
      no_antrian += total + 1;
    } else {
      no_antrian += 1;
    }
    try {
      let digits = "0123456789";
      let id = "ANT";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const tanggal = new Date().toISOString().slice(0, 10);
      const data = {
        id,
        id_jaga: req.body.id_jaga,
        id_pasien: req.body.id_pasien,
        tanggal,
        no_antrian,
        prioritas: req.body.prioritas,
      };
      if (data.id_jaga === "" || null) {
        response(res, 400, false, null, "Schedule ID can't be empty");
      } else if (data.id_pasien === "" || null) {
        response(res, 400, false, null, "Patient ID can't be null");
      } else {
        await createAntrian(data);
        return response(res, 200, true, data, "Create antrian success");
      }
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Create antrian failed");
    }
  },
  get: async (req, res, next) => {
    var dateDefault = new Date().toISOString().slice(0, 10);
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const searchName = req.query.searchName || "";
      const searchDivisi = req.query.searchDivisi || "";
      const searchJaga = req.query.searchJaga || "";
      const searchStatus = req.query.searchStatus || "1";
      const sortBy = req.query.sortBy || "prioritas";
      const sortOrder = req.query.sortOrder || "asc";
      const offset = (page - 1) * limit;
      // const dateNow = new Date().toISOString().slice(0, 10);
      const date = req.query.date || dateDefault;
      const result = await getAntrian({
        searchName,
        searchDivisi,
        searchJaga,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
        date,
      });
      const {
        rows: [countAll],
      } = await countAntrianAll();
      const totalData = parseInt(countAll.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      return response(
        res,
        200,
        true,
        result.rows,
        "Get antrian success",
        pagination
      );
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Get antrian failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getAntrianById(req.params.id);
      response(res, 200, true, result.rows, "Get antrian by ID success");
    } catch (err) {
      console.log("err", err);
      response(res, 400, false, null, "Get antrian by ID error");
    }
  },
  getTotal: async (req, res, next) => {
    const {
      rows: [count],
    } = await getTotalAntrian();
    const total = parseInt(count.total);
    try {
      return response(res, 200, true, total, "Get total antrian success");
    } catch (err) {
      return response(res, 400, false, err, "Get total antrian failed");
    }
  },
  getRest: async (req, res, next) => {
    const {
      rows: [count],
    } = await getRestAntrian();
    const total = parseInt(count.total);
    try {
      return response(res, 200, true, total, "Get total antrian success");
    } catch (err) {
      return response(res, 400, false, err, "Get total antrian failed");
    }
  },
  getNow: async (req, res, next) => {
    try {
      const result = await getNowAntrian();
      return response(res, 200, true, result.rows, "Get total antrian success");
    } catch (err) {
      return response(res, 400, false, err, "Get total antrian failed");
    }
  },
  getNext: async (req, res, next) => {
    try {
      const result = await getNextAntrian();
      return response(res, 200, true, result.rows, "Get total antrian success");
    } catch (err) {
      return response(res, 400, false, err, "Get total antrian failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      await updateAntrian(id);
      return response(res, 200, true, [], "Update antrian success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, null, "Update antrian failed");
    }
  },
  updateP: async (req, res, next) => {
    try {
      const id = req.params.id;
      const prioritas = req.body.prioritas;
      const data = {
        prioritas: prioritas,
      };
      await updatePrioritasAntrian(id, data);
      return response(res, 200, true, [], "Update prioritas antrian success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, null, "Update prioritas antrian failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteAntrian(id);
      return response(res, 200, true, [], "Delete antrian success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, null, "Delete antrian failed");
    }
  },
};

exports.antrianController = antrianController;
