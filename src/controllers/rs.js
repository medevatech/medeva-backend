const { response } = require(`../middleware/common`);
const {
  insertRS,
  allRS,
  countAllRS,
  getRSById,
  findRSById,
  editRS,
} = require(`../models/rs`);
const { v4: uuidv4 } = require('uuid');

const rsControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        tipe: req.body.tipe,
        alamat: req.body.alamat,
        nomor_telepon: req.body.nomor_telepon,
      };

      await insertRS(data);
      response(res, 200, true, data, 'insert rs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert rs failed');
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

      const result = await allRS({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllRS();

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
        'get rs success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rs failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getRSById({
        id,
      });

      const {
        rows: [findRS],
      } = await findRSById(id);

      if (findRS) {
        response(res, 200, true, result.rows, 'get rs success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rs failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRS],
      } = await findRSById(id);

      if (findRS) {
        let data = {
          id,
          nama: req.body.nama,
          tipe: req.body.tipe,
          alamat: req.body.alamat,
          nomor_telepon: req.body.nomor_telepon,
        };

        await editRS(data);
        response(res, 200, true, data, 'edit rs success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit rs failed');
    }
  },
};

exports.rsControllers = rsControllers;
