const { response } = require("../middleware/common");
const {
  createServiceClinic,
  countServiceClinic,
  getServiceClinic,
  getServiceClinicById,
  updateServiceClinic,
  archiveServiceClinic,
  activateServiceClinic,
} = require("../models/klinikJasa");
const { v4: uuidv4 } = require("uuid");

const serviceClinicController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const { id_klinik, nama, harga } = req.body;
      const data = {
        id: id,
        id_clinic: id_klinik,
        name: nama,
        price: harga,
      };
      await createServiceClinic(data);
      response(res, 200, true, data, "Tambah klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Tambah klinik jaga gagal");
    }
  },
  get: async (req, res, next) => {
    try {
      const search = req.query.search || "";
      const searchClinic = req.query.searchKlinik || "";
      const searchStatus = req.query.searchStatus || "";
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "desc";
      const offset = (page - 1) * limit;
      const result = await getServiceClinic({
        search,
        searchClinic,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countServiceClinic({
        search,
        searchClinic,
        searchStatus,
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
        "Get klinik jasa berhasil",
        pagination
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get klinik jasa gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getServiceClinicById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get klinik jasa berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get klinik jasa berdasarkan id gagal");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { id_klinik, nama, harga } = req.body;
      const data = {
        id_clinic: id_klinik,
        name: nama,
        price: harga,
      };
      await updateServiceClinic(id, data);
      response(res, 200, true, data, "Edit klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Edit klinik jasa gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveServiceClinic(id);
      response(res, 200, true, [], "Arsip klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi klinik jasa gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateServiceClinic(id);
      response(res, 200, true, [], "Aktivasi klinik jasa berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi klinik jasa gagal");
    }
  },
};

exports.serviceClinicController = serviceClinicController;
