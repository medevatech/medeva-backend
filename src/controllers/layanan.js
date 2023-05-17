const { response } = require("../middleware/common");
const {
  createLayanan,
  findLayanan,
  countLayanan,
  getLayanan,
  getLayananById,
  deleteLayanan,
} = require("../models/layanan");

const layananController = {
  create: async (req, res, next) => {
    try {
      let digits = "0123456789";
      let id = "LYN";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_kunjungan: req.body.id_kunjungan,
        id_daftar_layanan: req.body.id_daftar_layanan,
      };
      await createLayanan(data);
      response(res, 200, true, data, "Create layanan success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create layanan failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder || "desc";
      const searchId = req.query.searchId || "";
      const offset = (page - 1) * limit;
      const result = await getLayanan({
        searchId,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countLayanan();
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
        "Get layanan data success",
        pagination
      );
    } catch (err) {
      console.log("Get layanan data error", err);
      response(res, 400, false, null, "Get layanan data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getLayananById(req.params.id);
      response(res, 200, true, result.rows, "Get layanan data by ID success");
    } catch (err) {
      console.log("Get layanan data by ID error", err);
      response(res, 400, false, err, "Get layanan data by ID failed");
    }
  },
  //   update: async (req, res, next) => {
  //     try {
  //       const id = req.params.id;
  //       const id_klinik = req.body.id_klinik;
  //       const nama_layanan = req.body.nama_layanan;
  //       const harga_layanan = req.body.harga_layanan;
  //       const data = {
  //         id,
  //         id_klinik,
  //         nama_layanan,
  //         harga_layanan,
  //       };
  //       await updateDaftarLayanan(data);
  //       response(res, 200, true, data, "Update service data success");
  //     } catch (err) {
  //       console.log("Update service data error", err);
  //       response(res, 400, false, "Update service data failed");
  //     }
  //   },
  delete: async (req, res, next) => {
    try {
      await deleteLayanan(req.params.id);
      response(res, 200, true, null, "Delete layanan success");
    } catch (err) {
      console.log("Delete layanan error", err);
      response(res, 400, false, err, "Delete layanan failed");
    }
  },
};

exports.layananController = layananController;
