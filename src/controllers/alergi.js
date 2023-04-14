const { response } = require(`../middleware/common`);
const {
  insertAlergi,
  allAlergi,
  countAllAlergi,
  getAlergiById,
  findAlergiById,
  editAlergi,
} = require(`../models/alergi`);
const { v4: uuidv4 } = require('uuid');

const alergiControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        kategori: req.body.kategori,
      };

      await insertAlergi(data);
      response(res, 200, true, data, 'insert alergi success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert alergi failed');
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

      const result = await allAlergi({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAlergi();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get alergi success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getAlergiById({
        id,
      });

      const {
        rows: [findAlergi],
      } = await findAlergiById(id);

      if (findAlergi) {
        response(res, 200, true, result.rows, 'get alergi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergi],
      } = await findAlergiById(id);

      if (findAlergi) {
        let data = {
          id,
          nama: req.body.nama,
          kategori: req.body.kategori,
        };

        await editAlergi(data);
        response(res, 200, true, data, 'edit alergi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit alergi failed');
    }
  },
};

exports.alergiControllers = alergiControllers;
