const { response } = require("../middleware/common");
const {
  createKlinik,
  findKlinik,
  countKlinik,
  getKlinik,
  getKlinikById,
  updateKlinik,
  deleteKlinik,
} = require("../models/klinik");
const { v4: uuidv4 } = require("uuid");

const klinikController = {
  create: async (req, res, next) => {
    let {
      rows: [klinik],
    } = await findKlinik(req.body.nama_klinik);
    if (klinik) {
      response(res, 400, false, null, "Name of clinic is already used");
    }
    try {
      const data = {
        id: uuidv4(),
        nama_klinik: req.body.nama_klinik,
        tipe: req.body.tipe,
        alamat: req.body.alamat,
        nomor_telepon: req.body.nomor_telepon,
      };
      await createKlinik(data);
      response(res, 200, true, data, "Create clinic success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create clinic failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const result = await getKlinik({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countKlinik();
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
        "Get clinic data success",
        pagination
      );
    } catch (err) {
      console.log("Get clinic data error", err);
      response(res, 400, false, null, "Get clinic data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getKlinikById(req.params.id);
      response(res, 200, true, result.rows, "Get clinic data by ID success");
    } catch (err) {
      console.log("Get clinic data by ID error", err);
      response(res, 400, false, err, "Get clinic data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const nama_klinik = req.body.nama_klinik;
      const tipe = req.body.tipe;
      const alamat = req.body.alamat;
      const nomor_telepon = req.body.nomor_telepon;
      const data = {
        id,
        nama_klinik,
        tipe,
        alamat,
        nomor_telepon,
      };
      await updateKlinik(data);
      response(res, 200, true, data, "Update clinic data success");
    } catch (err) {
      console.log("Update clinic data error", err);
      response(res, 400, false, "Update clinic data failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteKlinik(req.params.id);
      response(res, 200, true, null, "Delete clinic success");
    } catch (err) {
      console.log("Delete clinic error", err);
      response(res, 400, false, err, "Delete clinic failed");
    }
  },
};

exports.klinikController = klinikController;
