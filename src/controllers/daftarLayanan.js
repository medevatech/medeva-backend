const { response } = require("../middleware/common");
const {
  createDaftarLayanan,
  findDaftarLayanan,
  countDaftarLayanan,
  getDaftarLayanan,
  getDaftarLayananById,
  updateDaftarLayanan,
  archiveDaftarLayanan,
  activateDaftarLayanan,
  deleteDaftarLayanan,
} = require("../models/daftarLayanan");

const daftarLayananController = {
  create: async (req, res, next) => {
    let {
      rows: [divisi],
    } = await findDaftarLayanan(req.body.nama_layanan);
    if (divisi) {
      response(res, 400, false, null, "Name of service is already used");
    }
    try {
      let digits = "0123456789";
      let id = "SVC";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_klinik: req.body.id_klinik,
        nama_layanan: req.body.nama_layanan,
        harga_layanan: req.body.harga_layanan,
      };
      await createDaftarLayanan(data);
      response(res, 200, true, data, "Create service success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create service failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "nama_layanan";
      const sortOrder = req.query.sortOrder || "desc";
      const searchName = req.query.searchName || "";
      const searchStatus = req.query.searchStatus || "";
      const searchKlinik = req.query.searchKlinik || "";
      const offset = (page - 1) * limit;
      const result = await getDaftarLayanan({
        searchName,
        searchStatus,
        searchKlinik,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countDaftarLayanan();
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
        "Get service data success",
        pagination
      );
    } catch (err) {
      console.log("Get service data error", err);
      response(res, 400, false, null, "Get service data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getDaftarLayananById(req.params.id);
      response(res, 200, true, result.rows, "Get service data by ID success");
    } catch (err) {
      console.log("Get service data by ID error", err);
      response(res, 400, false, err, "Get service data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_klinik = req.body.id_klinik;
      const nama_layanan = req.body.nama_layanan;
      const harga_layanan = req.body.harga_layanan;
      const data = {
        id,
        id_klinik,
        nama_layanan,
        harga_layanan,
      };
      await updateDaftarLayanan(data);
      response(res, 200, true, data, "Update service data success");
    } catch (err) {
      console.log("Update service data error", err);
      response(res, 400, false, "Update service data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveDaftarLayanan(req.params.id);
      return response(res, 200, true, null, "Archive service success");
    } catch (err) {
      return response(res, 400, false, err, "Archive service failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateDaftarLayanan(req.params.id);
      return response(res, 200, true, null, "Activate service success");
    } catch (err) {
      return response(res, 400, false, err, "Activate service failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteDaftarLayanan(req.params.id);
      response(res, 200, true, null, "Delete service success");
    } catch (err) {
      console.log("Delete service error", err);
      response(res, 400, false, err, "Delete service failed");
    }
  },
};

exports.daftarLayananController = daftarLayananController;
