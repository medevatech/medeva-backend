const { response } = require(`../middleware/common`);
const {
  insertVital,
  allVital,
  countAllVital,
  getVitalById,
  findVitalById,
  editVital,
} = require(`../models/vitalSigns`);
const { v4: uuidv4 } = require('uuid');

const vitalSignsControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
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
      };

      await insertVital(data);
      response(res, 200, true, data, 'insert vital signs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert vital signs failed');
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

      const result = await allVital({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllVital();

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
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getVitalById({
        id,
      });

      const {
        rows: [findVital],
      } = await findVitalById(id);

      if (findVital) {
        response(res, 200, true, result.rows, 'get vital signs success');
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
      response(res, 404, false, error, 'get vital signs failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVital],
      } = await findVitalById(id);

      if (findVital) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
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
};

exports.vitalSignsControllers = vitalSignsControllers;
