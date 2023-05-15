const { response } = require(`../middleware/common`);
const {
  insertTindakan,
  allTindakan,
  countAllTindakan,
  getTindakanById,
  findTindakanById,
  editTindakan,
  getTindakanByIdKunjungan,
  findTindakanByIdKunjungan,
} = require(`../models/tindakan`);
const { v4: uuidv4 } = require('uuid');

const tindakanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        catatan: req.body.catatan,
      };

      await insertTindakan(data);
      response(res, 200, true, data, 'insert tindakan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert tindakan failed');
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

      const result = await allTindakan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllTindakan();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get tindakan success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getTindakanById({
        id,
      });

      const {
        rows: [findTindakan],
      } = await findTindakanById(id);

      if (findTindakan) {
        response(res, 200, true, result.rows, 'get tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTindakan],
      } = await findTindakanById(id);

      if (findTindakan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          catatan: req.body.catatan,
        };

        await editTindakan(data);
        response(res, 200, true, data, 'edit tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit tindakan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getTindakanByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findTindakanKunjungan],
      } = await findTindakanByIdKunjungan(id_kunjungan);

      if (findTindakanKunjungan) {
        response(res, 200, true, result.rows, 'get tindakan success');
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
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
};

exports.tindakanControllers = tindakanControllers;
