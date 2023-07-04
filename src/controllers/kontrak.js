const { response } = require("../middleware/common");
const {
  createContract,
  getContract,
  getContractById,
  updateContract,
  archiveContract,
  activateContract,
  deleteContract,
} = require("../models/kontrak");
const { v4: uuidv4 } = require("uuid");

const contractController = {
  create: async (req, res, next) => {
    try {
      const { id_clinic, id_employee } = req.body;
      const id = uuidv4();
      const data = {
        id: id,
        id_clinic: id_clinic,
        id_employee: id_employee,
      };
      await createContract(data);
      response(res, 200, true, data, "Tambah kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Tambah kontrak gagal");
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getContract();
      response(res, 200, true, result.rows, "Get data kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get data kontrak gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getContractById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get data kontrak berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(ress, 400, false, null, "Get data kontrak berdasarkan id gagal");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { id_clinic, id_employee } = req.body;
      const data = {
        id_clinic: id_clinic,
        id_employee: id_employee,
      };
      await updateContract(id, data);
      response(res, 200, true, data, "Update data kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Update data kontrak gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveContract(id);
      response(res, 200, true, [], "Arsip kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Arsip kontrak gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateContract(id);
      response(res, 200, true, [], "Aktivasi kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi kontrak gagal");
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteContract(id);
      response(res, 200, true, [], "Hapus kontrak berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Hapus kontrak gagal");
    }
  },
};

exports.contractController = contractController;
