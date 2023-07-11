const { response } = require("../middleware/common");
const {
  createMedicineComposition,
  getMedicineComposition,
  getMedicineCompositionById,
  updateMedicineComposition,
  archiveMedicineComposition,
  activateMedicineComposition,
} = require("../models/komposisiObat");
const { v4: uuidv4 } = require("uuid");

const medicineCompositionController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const { id_bahan_obat, id_obat, per_jumlah, per_satuan, jumlah, satuan } =
        req.body;
      const data = {
        id: id,
        id_medicine_ingredients: id_bahan_obat,
        id_medicine: id_obat,
        per_ammount: per_jumlah,
        per_piece: per_satuan,
        ammount: jumlah,
        piece: satuan,
      };
      await createMedicineComposition(data);
      response(res, 200, true, data, "Tambah komposisi obat berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Tambah komposisi obat gagal");
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getMedicineComposition();
      response(res, 200, true, result.rows, "Get komposisi obat berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get komposisi obat gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getMedicineCompositionById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get komposisi obal berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get komposisi obat berdasarkan id gagal"
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { id_bahan_obat, id_obat, per_jumlah, per_satuan, jumlah, satuan } =
        req.body;
      const data = {
        id_medicine_ingredients: id_bahan_obat,
        id_medicine: id_obat,
        per_ammount: per_jumlah,
        per_piece: per_satuan,
        ammount: jumlah,
        piece: satuan,
      };
      await updateMedicineComposition(id, data);
      response(res, 200, true, data, "Edit komposisi obat berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Edit komposisi obat gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveMedicineComposition(id);
      response(res, 200, true, [], "Arsip komposisi obat berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Arsip komposisi obat gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateMedicineComposition(id);
      response(res, 200, true, [], "Aktivasi komposisi obat berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi komposisi obat gagal");
    }
  },
};

exports.medicineCompositionController = medicineCompositionController;
