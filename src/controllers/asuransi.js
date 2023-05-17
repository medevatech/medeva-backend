const { response } = require(`../middleware/common`);
const {
  insertAsuransi,
  allAsuransi,
  countAllAsuransi,
  getAsuransiById,
  findAsuransiById,
  getAsuransiByIdPasien,
  findAsuransiByIdPasien,
  editAsuransi,
} = require(`../models/asuransi`);
const { v4: uuidv4 } = require('uuid');

const asuransiControllers = {
  add: async (req, res, next) => {
    try {
      const { id_pasien, tipe_asuransi, nomor_asuransi } = req.body;

      let data = {
        id: uuidv4(),
        id_pasien,
        tipe_asuransi,
        nomor_asuransi,
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
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getAsuransiByIdPasien({
        id_pasien,
      });

      const {
        rows: [findAsuransi],
      } = await findAsuransiByIdPasien(id_pasien);

      if (findAsuransi) {
        response(res, 200, true, result.rows, 'get asuransi success');
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
      response(res, 404, false, error, 'get asuransi failed');
    }
  },
  editByIdAsuransi: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAsuransi],
      } = await findAsuransiById(id);

      if (findAsuransi) {
        let data = {
          id: req.body.id,
          id_pasien: req.body.id_pasien,
          tipe_asuransi: req.body.tipe_asuransi,
          nomor_asuransi: req.body.nomor_asuransi,
        };

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
  editWithoutIdAsuransi: async (req, res, next) => {
    try {
      let data = {
        id: req.body.id,
        id_pasien: req.body.id_pasien,
        tipe_asuransi: req.body.tipe_asuransi,
        nomor_asuransi: req.body.nomor_asuransi,
      };

      await editAsuransi(data);
      response(res, 200, true, data, 'edit asuransi success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit asuransi failed');
    }
  },
};

exports.asuransiControllers = asuransiControllers;
