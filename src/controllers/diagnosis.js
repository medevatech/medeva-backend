const { response } = require(`../middleware/common`);
const {
  insertDiagnosis,
  allDiagnosis,
  countAllDiagnosis,
  getDiagnosisByIdDiagnosis,
  findDiagnosisByIdDiagnosis,
  editDiagnosis,
  getDiagnosisByIdKunjungan,
  findDiagnosisByIdKunjungan,
  editDiagnosisActiveArchive,
  deleteDiagnosis,
} = require(`../models/diagnosis`);
const { v4: uuidv4 } = require('uuid');

const diagnosisControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_penyakit: req.body.id_penyakit,
        tipe_wd: req.body.tipe_wd,
        tipe_dd: req.body.tipe_dd,
        is_active: 1,
      };

      console.log(data.tipe_wd);

      if (data.id_penyakit == '') {
        response(res, 200, true, data, 'insert diagnosis but id_penyakit null');
      } else if (data.tipe_wd !== true && data.tipe_wd !== false) {
        response(
          res,
          200,
          true,
          data,
          'insert diagnosis but tipe_wd not correct'
        );
      } else if (data.tipe_dd !== true && data.tipe_dd !== false) {
        response(
          res,
          200,
          true,
          data,
          'insert diagnosis but tipe_dd not correct'
        );
      } else {
        await insertDiagnosis(data);
        response(res, 200, true, data, 'insert diagnosis success');
      }
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
      const searchPenyakit = req.query.searchPenyakit || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allDiagnosis({
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
      } = await countAllDiagnosis(search, searchPenyakit, searchStatus);

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

      const result = await getDiagnosisByIdDiagnosis({
        id,
      });

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisByIdDiagnosis(id);

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
      } = await findDiagnosisByIdDiagnosis(id);

      if (findDiagnosis) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_penyakit: req.body.id_penyakit,
          tipe_wd: req.body.tipe_wd,
          tipe_dd: req.body.tipe_dd,
          is_active: 1,
        };

        if (data.id_penyakit == '') {
          await deleteDiagnosis(data);
          response(res, 200, true, data, 'delete diagnosis success');
        } else if (data.tipe_wd !== true && data.tipe_wd !== false) {
          await deleteDiagnosis(data);
          response(res, 200, true, data, 'delete diagnosis success');
        } else if (data.tipe_dd !== true && data.tipe_dd !== false) {
          await deleteDiagnosis(data);
          response(res, 200, true, data, 'delete diagnosis success');
        } else {
          await editDiagnosis(data);
          response(res, 200, true, data, 'edit diagnosis success');
        }
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
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getDiagnosisByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findDiagnosisKunjungan],
      } = await findDiagnosisByIdKunjungan(id_kunjungan);

      if (findDiagnosisKunjungan) {
        response(res, 200, true, result.rows, 'get diagnosis success');
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
      response(res, 404, false, error, 'get diagnosis failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisByIdDiagnosis(id);

      if (findDiagnosis) {
        let data = {
          id,
          is_active: 1,
        };

        await editDiagnosisActiveArchive(data);
        response(res, 200, true, data, 'activate diagnosis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active diagnosis failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisByIdDiagnosis(id);

      if (findDiagnosis) {
        let data = {
          id,
          is_active: 0,
        };

        await editDiagnosisActiveArchive(data);
        response(res, 200, true, data, 'archive diagnosis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive diagnosis failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findDiagnosis],
      } = await findDiagnosisByIdDiagnosis(id);

      if (findDiagnosis) {
        let data = {
          id,
        };

        await deleteDiagnosis(data);
        response(res, 200, true, data, 'delete diagnosis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id diagnosis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete diagnosis failed');
    }
  },
};

exports.diagnosisControllers = diagnosisControllers;
