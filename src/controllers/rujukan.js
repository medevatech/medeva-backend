const { response } = require(`../middleware/common`);
const {
  insertRujukan,
  allRujukan,
  countAllRujukan,
  getRujukanById,
  findRujukanById,
  editRujukan,
} = require(`../models/rujukan`);
const { v4: uuidv4 } = require('uuid');

const rujukanjControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_rs: req.body.id_rs,
        id_poli: req.body.id_poli,
      };

      await insertRujukan(data);
      response(res, 200, true, data, 'insert rujukan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert rujukan failed');
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

      const result = await allRujukan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllRujukan();

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
        'get rujukan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rujukan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getRujukanById({
        id,
      });

      const {
        rows: [findRujukan],
      } = await findRujukanById(id);

      if (findRujukan) {
        response(res, 200, true, result.rows, 'get rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rujukan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRujukan],
      } = await findRujukanById(id);

      if (findRujukan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_rs: req.body.id_rs,
          id_poli: req.body.id_poli
        };

        await editRujukan(data);
        response(res, 200, true, data, 'edit rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit rujukan failed');
    }
  },
};

exports.rujukanjControllers = rujukanjControllers;
