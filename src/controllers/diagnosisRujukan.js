const { response } = require(`../middleware/common`);
const {
  insertDiagnosisRujukan,
  allDiagnosisRujukan,
  countAllDiagnosisRujukan,
  getDiagnosisRujukanByIdDiagnosisRujukan,
  findDiagnosisRujukanByIdDiagnosisRujukan,
  editDiagnosisRujukan,
  getDiagnosisRujukanByIdRujukan,
  findDiagnosisRujukanByIdRujukan,
  editDiagnosisRujukanActiveArchive,
  deleteDiagnosisRujukan,
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
        is_active: 1,
      };

      if (data.id_penyakit == '') {
        response(
          res,
          200,
          true,
          data,
          'insert diagnosis rujukan but id_penyakit null'
        );
      } else if (data.tipe_wd !== true && data.tipe_wd !== false) {
        response(
          res,
          200,
          true,
          data,
          'insert diagnosis rujukan but tipe_wd not correct'
        );
      } else if (data.tipe_dd !== true && data.tipe_dd !== false) {
        response(
          res,
          200,
          true,
          data,
          'insert diagnosis rujukan but tipe_dd not correct'
        );
      } else {
        await insertDiagnosisRujukan(data);
        response(res, 200, true, data, 'insert diagnosis rujukan success');
      }
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
      const searchPenyakit = req.query.searchPenyakit || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allDiagnosisRujukan({
        search,
        searchPenyakit,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllDiagnosisRujukan(search, searchPenyakit, searchStatus);

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

      const result = await getDiagnosisRujukanByIdDiagnosisRujukan({
        id,
      });

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanByIdDiagnosisRujukan(id);

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
      } = await findDiagnosisRujukanByIdDiagnosisRujukan(id);

      if (findDiagnosisRujukan) {
        let data = {
          id,
          id_rujukan: req.body.id_rujukan,
          id_penyakit: req.body.id_penyakit,
          tipe_wd: req.body.tipe_wd,
          tipe_dd: req.body.tipe_dd,
          is_active: 1,
        };

        if (data.id_penyakit == '') {
          await deleteDiagnosisRujukan(data);
          response(res, 200, true, data, 'delete diagnosis rujukan success');
        } else if (data.tipe_wd !== true && data.tipe_wd !== false) {
          await deleteDiagnosisRujukan(data);
          response(res, 200, true, data, 'delete diagnosis rujukan success');
        } else if (data.tipe_dd !== true && data.tipe_dd !== false) {
          await deleteDiagnosisRujukan(data);
          response(res, 200, true, data, 'delete diagnosis rujukan success');
        } else {
          await editDiagnosisRujukan(data);
          response(res, 200, true, data, 'edit diagnosis rujukan success');
        }
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
  getByIdRujukan: async (req, res) => {
    try {
      const id_rujukan = req.params.id_rujukan;

      const result = await getDiagnosisRujukanByIdRujukan({
        id_rujukan,
      });

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanByIdRujukan(id_rujukan);

      if (findDiagnosisRujukan) {
        response(res, 200, true, result.rows, 'get diagnosis rujukan success');
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
      response(res, 404, false, error, 'get diagnosis rujukan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanByIdDiagnosisRujukan(id);

      if (findDiagnosisRujukan) {
        let data = {
          id,
          is_active: 1,
        };

        await editDiagnosisRujukanActiveArchive(data);
        response(res, 200, true, data, 'activate diagnosis rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active diagnosis rujukan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanByIdDiagnosisRujukan(id);

      if (findDiagnosisRujukan) {
        let data = {
          id,
          is_active: 0,
        };

        await editDiagnosisRujukanActiveArchive(data);
        response(res, 200, true, data, 'archive diagnosis rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive diagnosis rujukan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findDiagnosisRujukan],
      } = await findDiagnosisRujukanByIdDiagnosisRujukan(id);

      if (findDiagnosisRujukan) {
        let data = {
          id,
        };

        await deleteDiagnosisRujukan(data);
        response(res, 200, true, data, 'delete diagnosis rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete diagnosis rujukan failed');
    }
  },
};

exports.diagnosisRujukanControllers = diagnosisRujukanControllers;
