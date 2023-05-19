const { response } = require(`../middleware/common`);
const {
  insertLayanan,
  allLayanan,
  countAllLayanan,
  getLayananById,
  findLayananById,
  editLayanan,
  getLayananByIdKunjungan,
  findLayananByIdKunjungan,
} = require(`../models/layanan`);
const { v4: uuidv4 } = require('uuid');

const layananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        catatan: req.body.catatan,
      };

      await insertLayanan(data);
      response(res, 200, true, data, 'insert layanan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert layanan failed');
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

      const result = await allLayanan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllLayanan();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get layanan success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getLayananById({
        id,
      });

      const {
        rows: [findLayanan],
      } = await findLayananById(id);

      if (findLayanan) {
        response(res, 200, true, result.rows, 'get layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayanan],
      } = await findLayananById(id);

      if (findLayanan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          catatan: req.body.catatan,
        };

        await editLayanan(data);
        response(res, 200, true, data, 'edit layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit layanan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getLayananByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findLayananKunjungan],
      } = await findLayananByIdKunjungan(id_kunjungan);

      if (findLayananKunjungan) {
        response(res, 200, true, result.rows, 'get layanan success');
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
      response(res, 404, false, error, 'get layanan failed');
    }
  },
};

exports.layananControllers = layananControllers;
