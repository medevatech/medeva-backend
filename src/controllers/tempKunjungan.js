const { response } = require(`../middleware/common`);
const {
  insertTempKunjungan,
  allTempKunjungan,
  countAllTempKunjungan,
  getTempKunjunganById,
  findTempKunjunganById,
  editTempKunjungan,
} = require(`../models/tempKunjungan`);
const { v4: uuidv4 } = require('uuid');

const tempKunjunganControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_vs: req.body.id_vs,
      };

      await insertTempKunjungan(data);
      response(res, 200, true, data, 'insert temp kunjungan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert temp kunjungan failed');
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

      const result = await allTempKunjungan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllTempKunjungan();

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
        'get temp kunjungan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get temp kunjungan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getTempKunjunganById({
        id,
      });

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganById(id);

      if (findTempKunjungan) {
        response(res, 200, true, result.rows, 'get temp kunjungan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get temp kunjungan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganById(id);

      if (findTempKunjungan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_vs: req.body.id_vs,
        };

        await editTempKunjungan(data);
        response(res, 200, true, data, 'edit temp kunjungan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit temp kunjungan failed');
    }
  },
};

exports.tempKunjunganControllers = tempKunjunganControllers;
