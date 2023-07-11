const { response } = require("../middleware/common");
const {
  findLaboratorium,
  createLaboratorium,
  getLaboratorium,
  countLaboratorium,
  getLaboratoriumById,
  updateLaboratorium,
  archiveLaboratorium,
  activateLaboratorium,
  deleteLaboratorium,
} = require("../models/laboratorium");
const { v4: uuidv4 } = require("uuid");

const laboratoriumController = {
  create: async (req, res, next) => {
    let {
      rows: [laboratorium],
    } = await findLaboratorium(req.body.tipe);
    if (laboratorium) {
      response(res, 400, false, null, "Name of lab is already used");
    }
    try {
      const id = uuidv4();
      const data = {
        id: id,
        nama: req.body.nama,
        nomor_telepon: req.body.nomor_telepon,
        alamat: req.body.alamat,
      };
      await createLaboratorium(data);
      response(res, 200, true, data, "Create lab success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create lab failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "nama";
      const sortOrder = req.query.sortOrder || "desc";
      const searchName = req.query.searchName || "";
      const searchStatus = req.query.searchStatus || "";
      const offset = (page - 1) * limit;
      const result = await getLaboratorium({
        searchName,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countLaboratorium();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      response(res, 200, true, result.rows, "Get lab data success", pagination);
    } catch (err) {
      console.log("Get lab data error", err);
      response(res, 400, false, null, "Get lab data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getLaboratoriumById(req.params.id);
      response(res, 200, true, result.rows, "Get lab data by ID success");
    } catch (err) {
      console.log("Get lab data by ID error", err);
      response(res, 400, false, err, "Get lab data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const nama = req.body.nama;
      const nomor_telepon = req.body.nomor_telepon;
      const alamat = req.body.alamat;
      const data = {
        id,
        nama,
        nomor_telepon,
        alamat,
      };
      await updateLaboratorium(data);
      response(res, 200, true, data, "Update lab data success");
    } catch (err) {
      console.log("Update lab data error", err);
      response(res, 400, false, "Update lab data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveLaboratorium(req.params.id);
      return response(res, 200, true, null, "Archive lab success");
    } catch (err) {
      return response(res, 400, false, err, "Archive lab failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateLaboratorium(req.params.id);
      return response(res, 200, true, null, "Activate lab success");
    } catch (err) {
      return response(res, 400, false, err, "Activate lab failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteLaboratorium(req.params.id);
      response(res, 200, true, null, "Delete lab success");
    } catch (err) {
      console.log("Delete lab error", err);
      response(res, 400, false, err, "Delete lab failed");
    }
  },
};

exports.laboratoriumController = laboratoriumController;
