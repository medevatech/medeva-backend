const { response } = require(`../middleware/common`);
const {
  insertVital,
  allVital,
  countAllVital,
  getVitalByIdVitalSigns,
  findVitalByIdVitalSigns,
  getVitalByIdPasien,
  findVitalByIdPasien,
  findVitalByIdPasienTanggal,
  editVital,
  editVitalSignsActiveArchive,
  deleteVitalSigns,
} = require(`../models/vitalSigns`);
const { v4: uuidv4 } = require('uuid');

const vitalSignsControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        keluhan: req.body.keluhan,
        kesadaran: req.body.kesadaran,
        temperatur: req.body.temperatur,
        tinggi_badan: req.body.tinggi_badan,
        berat_badan: req.body.berat_badan,
        lingkar_perut: req.body.lingkar_perut,
        imt: req.body.imt,
        sistole: req.body.sistole,
        diastole: req.body.diastole,
        respiratory_rate: req.body.respiratory_rate,
        heart_rate: req.body.heart_rate,
        catatan_tambahan: req.body.catatan_tambahan,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (
          (key === 'kesadaran' && value === '') ||
          (key === 'temperatur' && value === '') ||
          (key === 'tinggi_badan' && value === '') ||
          (key === 'berat_badan' && value === '') ||
          (key === 'lingkar_perut' && value === '') ||
          (key === 'respiratory_rate' && value === '') ||
          (key === 'heart_rate' && value === '')
        ) {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertVital(data);
        response(res, 200, true, data, 'insert vital signs success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert vital signs failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchPasien = req.query.searchPasien || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allVital({
        search,
        searchPasien,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllVital(search, searchPasien, searchStatus);

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
        'get vital signs success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get vital signs failed');
    }
  },
  getByIdVS: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getVitalByIdVitalSigns({
        id,
      });

      const {
        rows: [findVital],
      } = await findVitalByIdVitalSigns(id);

      if (findVital) {
        response(res, 200, true, result.rows, 'get vital signs success');
      } else {
        return response(
          res,
          200,
          false,
          null,
          `id vital signs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get vital signs failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const tanggal = req.query.tanggal || '';
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';

      const result = await getVitalByIdPasien({
        id_pasien,
        tanggal,
        sortBy,
        sortOrder,
      });

      const {
        rows: [findVital],
      } = await findVitalByIdPasien(id_pasien);

      const {
        rows: [findVitalTanggal],
      } = await findVitalByIdPasienTanggal(tanggal);

      if (findVital) {
        if (findVitalTanggal == undefined) {
          console.log('cek');
          response(
            res,
            404,
            true,
            null,
            'id_pasien found, vital signs on given date not found'
          );
        } else {
          response(res, 200, true, result.rows, 'get vital signs success');
        }

        // let isoString = new Date(findVital.created_at)
        //   .toISOString()
        //   .slice(0, 10);
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get vital signs failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVital],
      } = await findVitalByIdVitalSigns(id);

      if (findVital) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          keluhan: req.body.keluhan,
          kesadaran: req.body.kesadaran,
          temperatur: req.body.temperatur,
          tinggi_badan: req.body.tinggi_badan,
          berat_badan: req.body.berat_badan,
          lingkar_perut: req.body.lingkar_perut,
          imt: req.body.imt,
          sistole: req.body.sistole,
          diastole: req.body.diastole,
          respiratory_rate: req.body.respiratory_rate,
          heart_rate: req.body.heart_rate,
          catatan_tambahan: req.body.catatan_tambahan,
          is_active: 1,
        };

        await editVital(data);
        response(res, 200, true, data, 'edit vital signs success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vital signs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit vital signs failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVital],
      } = await findVitalByIdVitalSigns(id);

      if (findVital) {
        let data = {
          id,
          is_active: 1,
        };

        await editVitalSignsActiveArchive(data);
        response(res, 200, true, data, 'activate vital signs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id vital signs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active vital signs failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVital],
      } = await findVitalByIdVitalSigns(id);

      if (findVital) {
        let data = {
          id,
          is_active: 0,
        };

        await editVitalSignsActiveArchive(data);
        response(res, 200, true, data, 'archive vital signs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id vital signs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive vital signs failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findVital],
      } = await findVitalByIdVitalSigns(id);

      if (findVital) {
        let data = {
          id,
        };

        await deleteVitalSigns(data);
        response(res, 200, true, data, 'delete vital signs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id vital signs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete alergi vital signs failed');
    }
  },
};

exports.vitalSignsControllers = vitalSignsControllers;
