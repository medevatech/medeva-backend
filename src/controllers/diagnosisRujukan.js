const { response } = require(`../middleware/common`);
const {
  insertDiagnosisRujukan,
  allDiagnosisRujukan,
  countAllDiagnosisRujukan,
  getDiagnosisRujukanById,
  findDiagnosisRujukanById,
  editDiagnosisRujukan,
} = require(`../models/diagnosisRujukan`);
const { v4: uuidv4 } = require('uuid');

const diagnosisRujukanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_rujukan: req.body.id_rujukan,
        id_penyakit: req.body.id_penyakit,
        tipe_wd: req.body.tipe_wd,
        tipe_dd: req.body.tipe_dd,
      };

      await insertDiagnosisRujukan(data);
      response(res, 200, true, data, 'insert diagnosis rujukan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert diagnosis rujukan failed');
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

      const result = await allDiagnosisRujukan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllDiagnosisRujukan();

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
        'get diagnosis rujukan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get diagnosis rujukan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getDiagnosisRujukanById({
        id,
      });

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanById(id);

      if (findDiagnosisRujukan) {
        response(res, 200, true, result.rows, 'get diagnosis rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id diagnosis rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get diagnosis rujukan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanById(id);

      if (findDiagnosisRujukan) {
        let data = {
          id,
          id_rujukan: req.body.id_rujukan,
        id_penyakit: req.body.id_penyakit,
        tipe_wd: req.body.tipe_wd,
        tipe_dd: req.body.tipe_dd,
        };

        await editDiagnosisRujukan(data);
        response(res, 200, true, data, 'edit diagnosis rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id diagnosis rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit diagnosis rujukan failed');
    }
  },
};

exports.diagnosisRujukanControllers = diagnosisRujukanControllers;
