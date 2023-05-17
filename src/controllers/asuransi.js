const { response } = require(`../middleware/common`);
const {
  insertAsuransi,
  allAsuransi,
  countAllAsuransi,
  getAsuransiById,
  findAsuransiById,
  editAsuransi,
} = require(`../models/asuransi`);
const { v4: uuidv4 } = require('uuid');

const asuransiControllers = {
  add: async (req, res, next) => {
    try {
      const { nama } = req.body;

      let data = {
        id: uuidv4(),
        nama,
      };

      await insertAsuransi(data);
      response(res, 200, true, data, 'insert asuransi success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert asuransi failed');
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

      const result = await allAsuransi({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAsuransi();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get asuransi success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get asuransi failed');
    }
  },
  getByIdAsuransi: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getAsuransiById({
        id,
      });

      const {
        rows: [findAsuransi],
      } = await findAsuransiById(id);

      if (findAsuransi) {
        response(res, 200, true, result.rows, 'get asuransi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get asuransi failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAsuransi],
      } = await findAsuransiById(id);

      if (findAsuransi) {
        let data = {
          nama: req.body.nama,
        };

        console.log(data);

        await editAsuransi(data);
        response(res, 200, true, data, 'edit asuransi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit asuransi failed');
    }
  },
};

exports.asuransiControllers = asuransiControllers;
