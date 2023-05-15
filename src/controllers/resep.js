const { response } = require(`../middleware/common`);
const {
  insertResep,
  allResep,
  countAllResep,
  getResepById,
  findResepById,
  editResep,
  getResepByIdKunjungan,
  findResepByIdKunjungan,
} = require(`../models/resep`);
const { v4: uuidv4 } = require('uuid');

const resepControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_obat: req.body.id_obat,
        jumlah: req.body.jumlah,
        satuan: req.body.satuan,
        frekuensi: req.body.frekuensi,
        periode: req.body.periode,
        metode_konsumsi: req.body.metode_konsumsi,
        aturan_pakai: req.body.aturan_pakai,
      };

      await insertResep(data);
      response(res, 200, true, data, 'insert resep success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert resep failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allResep({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllResep();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get resep success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get resep failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getResepById({
        id,
      });

      const {
        rows: [findResep],
      } = await findResepById(id);

      if (findResep) {
        response(res, 200, true, result.rows, 'get resep success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id resep not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get resep failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findResep],
      } = await findResepById(id);

      if (findResep) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_obat: req.body.id_obat,
          jumlah: req.body.jumlah,
          satuan: req.body.satuan,
          frekuensi: req.body.frekuensi,
          periode: req.body.periode,
          metode_konsumsi: req.body.metode_konsumsi,
          aturan_pakai: req.body.aturan_pakai,
        };

        await editResep(data);
        response(res, 200, true, data, 'edit resep success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id resep not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit resep failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getResepByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findResepKunjungan],
      } = await findResepByIdKunjungan(id_kunjungan);

      if (findResepKunjungan) {
        response(res, 200, true, result.rows, 'get resep success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get resep failed');
    }
  },
};

exports.resepControllers = resepControllers;