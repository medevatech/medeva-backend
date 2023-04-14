const { response } = require(`../middleware/common`);
const {
  insertPoli,
  allPoli,
  countAllPoli,
  getPoliById,
  findPoliById,
  editPoli,
} = require(`../models/poli`);
const { v4: uuidv4 } = require('uuid');

const poliControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
      };

      await insertPoli(data);
      response(res, 200, true, data, 'insert poli success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert poli failed');
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

      const result = await allPoli({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPoli();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get poli success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get poli failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPoliById({
        id,
      });

      const {
        rows: [findPoli],
      } = await findPoliById(id);

      if (findPoli) {
        response(res, 200, true, result.rows, 'get poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get poli failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPoli],
      } = await findPoliById(id);

      if (findPoli) {
        let data = {
          id,
          nama: req.body.nama,
        };

        await editPoli(data);
        response(res, 200, true, data, 'edit poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit poli failed');
    }
  },
};

exports.poliControllers = poliControllers;
