const { response } = require(`../middleware/common`);
const {
  insertDiagnosis,
  allDiagnosis,
  countAllDiagnosis,
  getDiagnosisById,
  findDiagnosisById,
  editDiagnosis,
} = require(`../models/diagnosis`);
const { v4: uuidv4 } = require('uuid');

const diagnosisControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_penyakit: req.body.id_penyakit,
      };

      await insertDiagnosis(data);
      response(res, 200, true, data, 'insert diagnosis success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert diagnosis failed');
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

      const result = await allDiagnosis({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllDiagnosis();

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
        'get diagnosis success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get diagnosis failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getDiagnosisById({
        id,
      });

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisById(id);

      if (findDiagnosis) {
        response(res, 200, true, result.rows, 'get diagnosis success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id diagnosis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get diagnosis failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisById(id);

      if (findDiagnosis) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_penyakit: req.body.nama_penyakit,
        };

        await editDiagnosis(data);
        response(res, 200, true, data, 'edit diagnosis success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id diagnosis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit diagnosis failed');
    }
  },
};

exports.diagnosisControllers = diagnosisControllers;
