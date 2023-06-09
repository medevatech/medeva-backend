const { response } = require(`../middleware/common`);
const {
  insertRekamMedis,
  allRekamMedis,
  countAllRekamMedis,
  getRekamMedisByIdRekamMedis,
  findRekamMedisByIdRekamMedis,
  editRekamMedis,
  editRekamMedisActiveArchive,
  deleteRekamMedis,
} = require(`../models/rekamMedis`);
const { v4: uuidv4 } = require('uuid');

const rekamMedisControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_vital_signs: req.body.id_vital_signs,
        id_anamnesis: req.body.id_anamnesis,
        pemeriksaan_fisik: req.body.pemeriksaan_fisik,
        id_diagnosis: req.body.id_diagnosis,
        id_tata_laksana: req.body.id_tata_laksana,
        is_active: 1,
      };

      await insertRekamMedis(data);
      response(res, 200, true, data, 'insert rekam medis success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert rekam medis failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchKunjungan = req.query.searchKunjungan || '';
      const searchVS = req.query.searchVS || '';
      const searchAnamnesis = req.query.searchAnamnesis || '';
      const searchDiagnosis = req.query.searchDiagnosis || '';
      const searchTataLaksana = req.query.searchTataLaksana || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allRekamMedis({
        search,
        searchKunjungan,
        searchVS,
        searchAnamnesis,
        searchDiagnosis,
        searchTataLaksana,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllRekamMedis(
        search,
        searchKunjungan,
        searchVS,
        searchAnamnesis,
        searchDiagnosis,
        searchTataLaksana,
        searchStatus
      );

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
        'get rekam medis success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rekam medis failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getRekamMedisByIdRekamMedis({
        id,
      });

      const {
        rows: [findRekamMedis],
      } = await findRekamMedisByIdRekamMedis(id);

      if (findRekamMedis) {
        response(res, 200, true, result.rows, 'get rekam medis success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rekam medis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rekam medis failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRekamMedis],
      } = await findRekamMedisByIdRekamMedis(id);

      if (findRekamMedis) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_vital_signs: req.body.id_vital_signs,
          id_anamnesis: req.body.id_anamnesis,
          pemeriksaan_fisik: req.body.pemeriksaan_fisik,
          id_diagnosis: req.body.id_diagnosis,
          id_tata_laksana: req.body.id_tata_laksana,
          is_active: 1,
        };

        await editRekamMedis(data);
        response(res, 200, true, data, 'edit rekam medis success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rekam medis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit rekam medis failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRekamMedis],
      } = await findRekamMedisByIdRekamMedis(id);

      if (findRekamMedis) {
        let data = {
          id,
          is_active: 1,
        };

        await editRekamMedisActiveArchive(data);
        response(res, 200, true, data, 'activate rekam medis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rekam medis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active rekam medis failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRekamMedis],
      } = await findRekamMedisByIdRekamMedis(id);

      if (findRekamMedis) {
        let data = {
          id,
          is_active: 0,
        };

        await editRekamMedisActiveArchive(data);
        response(res, 200, true, data, 'archive rekam medis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rekam medis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive rekam medis failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findRekamMedis],
      } = await findRekamMedisByIdRekamMedis(id);

      if (findRekamMedis) {
        let data = {
          id,
        };

        await deleteRekamMedis(data);
        response(res, 200, true, data, 'delete rekam medis success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rekam medis not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete rekam medis failed');
    }
  },
};

exports.rekamMedisControllers = rekamMedisControllers;
