const { response } = require("../middleware/common");
const {
  createDivisi,
  findDivisi,
  countDivisi,
  getDivisi,
  getDivisiById,
  updateDivisi,
  archiveDivisi,
  activateDivisi,
  deleteDivisi,
  getDivisiByIdClinic,
  getDistictDivision,
  countDivisiDisticnt,
} = require("../models/divisi");
const { v4: uuidv4 } = require("uuid");

const divisiController = {
  create: async (req, res, next) => {
    let {
      rows: [divisi],
    } = await findDivisi(req.body.tipe);
    if (divisi) {
      response(res, 400, false, null, "Name of division is already used");
    }
    try {
      const data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        tipe: req.body.tipe,
      };
      if (data.tipe === "") {
        response(res, 400, false, null, "Name of division can't be null");
      } else {
        await createDivisi(data);
        response(res, 200, true, data, "Create division success");
      }
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create division failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const searchStatus = req.query.searchStatus || "";
      const searchKlinik = req.query.searchKlinik || "";
      const searchDivisi = req.query.searchDivisi || "";
      const offset = (page - 1) * limit;
      const result = await getDivisi({
        search,
        searchStatus,
        searchDivisi,
        searchKlinik,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countDivisi({ search, searchKlinik, searchStatus });
      console.log({ count });
      const totalData = parseInt(count.total);
      console.log(totalData);
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
        "Get division data success",
        pagination
      );
    } catch (err) {
      console.log("Get division data error", err);
      response(res, 400, false, null, "Get division data failed");
    }
  },
  getDistinct: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "tipe";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const searchStatus = req.query.searchStatus || "";
      const searchKlinik = req.query.searchKlinik || "";
      const searchDivisi = req.query.searchDivisi || "";
      const offset = (page - 1) * limit;
      const result = await getDistictDivision({
        search,
        searchStatus,
        searchDivisi,
        searchKlinik,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countDivisiDisticnt({ search, searchKlinik, searchStatus });
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
        "Get distinct division success",
        pagination
      );
    } catch (err) {
      console.log("err", err);
      response(res, 400, false, null, "Get distinct division error");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getDivisiById(req.params.id);
      response(res, 200, true, result.rows, "Get division data by ID success");
    } catch (err) {
      console.log("Get division data by ID error", err);
      response(res, 400, false, err, "Get division data by ID failed");
    }
  },
  getByIdClinic: async (req, res, next) => {
    try {
      const result = await getDivisiByIdClinic(req.params.id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get division data by ID clinic success"
      );
    } catch (err) {
      console.log("Get division data by ID clinic error", err);
      response(res, 400, false, err, "Get division data by ID clinic failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_klinik = req.body.id_klinik;
      const tipe = req.body.tipe;
      const data = {
        id,
        id_klinik,
        tipe,
      };
      await updateDivisi(data);
      response(res, 200, true, data, "Update division data success");
    } catch (err) {
      console.log("Update division data error", err);
      response(res, 400, false, "Update division data failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveDivisi(req.params.id);
      return response(res, 200, true, null, "Archive divisi success");
    } catch (err) {
      return response(res, 400, false, err, "Archive divisi failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateDivisi(req.params.id);
      return response(res, 200, true, null, "Activate divisi success");
    } catch (err) {
      return response(res, 400, false, err, "Activate divisi failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteDivisi(req.params.id);
      response(res, 200, true, null, "Delete division success");
    } catch (err) {
      console.log("Delete division error", err);
      response(res, 400, false, err, "Delete division failed");
    }
  },
};

exports.divisiController = divisiController;
