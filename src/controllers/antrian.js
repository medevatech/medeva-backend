const { response } = require("../middleware/common");
const {
  countAntrian,
  createAntrian,
  getAntrian,
  getTotalAntrian,
  getRestAntrian,
  getNowAntrian,
  getNextAntrian,
  updateAntrian,
} = require("../models/antrian");

const antrianController = {
  create: async (req, res, next) => {
    const {
      rows: [count],
    } = await countAntrian();
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
      await createAntrian(data);
      return response(res, 200, true, data, "Create antrian success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Create antrian failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const searchName = req.query.searchName || "";
      const searchDivisi = req.query.searchDivisi || "";
      const sortBy = req.query.sortBy || "prioritas";
      const sortOrder = req.query.sortOrder || "asc";
      const result = await getAntrian({
        searchName,
        searchDivisi,
        sortBy,
        sortOrder,
      });
      return response(res, 200, true, result.rows, "Get antrian success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Get antrian failed");
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
};

exports.antrianController = antrianController;
