const { response } = require("../middleware/common");
const {
  createLayananLaboratorium,
  getLayananLaboratorium,
  getDistinctLayananLaboratorium,
  countLayananLaboratorium,
  getLayananLaboratoriumById,
  updateLayananLaboratorium,
  deleteLayananLaboratorium,
  getLayananLaboratoriumByIdLab,
  countLayananLaboratoriumByIdLab,
  deleteLayananLaboratoriumByIdLab,
  archiveLayananLaboratorium,
  activateLayananLaboratoriun,
} = require("../models/layananLaboratorium");
const { v4: uuidv4 } = require("uuid");

const layananLaboratoriumController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const data = {
        id,
        id_lab: req.body.id_lab,
        id_pemeriksaan: req.body.id_pemeriksaan,
        kategori: req.body.kategori,
      };
      await createLayananLaboratorium(data);
      response(res, 200, true, data, "Create layanan lab success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create layanan lab failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const searchStatus = req.query.searchStatus || 1;
      const offset = (page - 1) * limit;
      const result = await getLayananLaboratorium({
        searchStatus,
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countLayananLaboratorium({ search, searchStatus });
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
        "Get layanan lab data success",
        pagination
      );
    } catch (err) {
      console.log("Get layanan lab data error", err);
      response(res, 400, false, null, "Get layanan lab data failed");
    }
  },
  getDistinct: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "kategori";
      const sortOrder = req.query.sortOrder || "desc";
      const searchLaboratorium = req.query.searchLaboratorium || "";
      const searchPemeriksaan = req.query.searchPemeriksaan || "";
      const searchKategori = req.query.searchKategori || "";
      const offset = (page - 1) * limit;
      const result = await getDistinctLayananLaboratorium({
        searchLaboratorium,
        searchPemeriksaan,
        searchKategori,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countLayananLaboratorium();
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
        "Get layanan lab data success",
        pagination
      );
    } catch (err) {
      console.log("Get layanan lab data error", err);
      response(res, 400, false, null, "Get layanan lab data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getLayananLaboratoriumById(req.params.id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get layanan lab data by ID success"
      );
    } catch (err) {
      console.log("Get layanan lab data by ID error", err);
      response(res, 400, false, err, "Get layanan lab data by ID failed");
    }
  },
  getByIdLab: async (req, res, next) => {
    try {
      const id = req.params.id;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "desc";
      const offset = (page - 1) * limit;
      const result = await getLayananLaboratoriumByIdLab({
        id,
        sortBy,
        sortOrder,
        offset,
        limit,
      });
      const {
        rows: [count],
      } = await countLayananLaboratoriumByIdLab({
        id,
      });
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
        "Get layanan laboratorium berdasarkan id laboratorium berhasil",
        pagination
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get layanan laboratorium berdasarkan id laboratorium gagal"
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_labo = req.body.id_labo;
      const id_pemeriksaan = req.body.id_pemeriksaan;
      const kategori = req.body.kategori;
      const data = {
        id,
        id_labo,
        id_pemeriksaan,
        kategori,
      };
      await updateLayananLaboratorium(data);
      response(res, 200, true, data, "Update layanan lab data success");
    } catch (err) {
      console.log("Update layanan lab data error", err);
      response(res, 400, false, "Update layanan lab data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveLayananLaboratorium(id);
      response(res, 200, true, [], "Arsip layanan laboratorium berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Arsip layanan laboratorium gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateLayananLaboratoriun(id);
      response(req, 200, true, [], "Aktivasi layanan laboratorium berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi layanan laboratorium gagal");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteLayananLaboratorium(req.params.id);
      response(res, 200, true, null, "Delete layanan lab success");
    } catch (err) {
      console.log("Delete layanan lab error", err);
      response(res, 400, false, err, "Delete layanan lab failed");
    }
  },
  deleteByIdLab: async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteLayananLaboratoriumByIdLab(id);
      response(
        res,
        200,
        true,
        [],
        "Hapus layanan laboratorium berdasarkan id laboratorium berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Hapus layanan laboratorium berdasarkan id laboratorium gagal"
      );
    }
  },
};

exports.layananLaboratoriumController = layananLaboratoriumController;
