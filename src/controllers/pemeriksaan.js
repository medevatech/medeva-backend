const { response } = require(`../middleware/common`);
const {
  insertPemeriksaan,
  allPemeriksaan,
  countAllPemeriksaan,
  getPemeriksaanById,
  findPemeriksaanById,
  editPemeriksaan,
  getPemeriksaanByIdLayananLab,
  findPemeriksaanByIdLayananLab,
} = require(`../models/pemeriksaan`);
const { v4: uuidv4 } = require('uuid');

const pemeriksaanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        id_layanan_lab: req.body.id_layanan_lab,
      };

      await insertPemeriksaan(data);
      response(res, 200, true, data, 'insert pemeriksaan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pemeriksaan failed');
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

      const result = await allPemeriksaan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemeriksaan();

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
        'get pemeriksaan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPemeriksaanById({
        id,
      });

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanById(id);

      if (findPemeriksaan) {
        response(res, 200, true, result.rows, 'get pemeriksaan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanById(id);

      if (findPemeriksaan) {
        let data = {
          id,
          nama: req.body.nama,
          id_layanan_lab: req.body.id_layanan_lab,
        };

        await editPemeriksaan(data);
        response(res, 200, true, data, 'edit pemeriksaan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit pemeriksaan failed');
    }
  },
  getByIdLayananLab: async (req, res) => {
    try {
      const id_layanan_lab = req.params.id_layanan_lab;

      const result = await getPemeriksaanByIdLayananLab({
        id_layanan_lab,
      });

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanByIdLayananLab(id_layanan_lab);

      if (findPemeriksaan) {
        response(res, 200, true, result.rows, 'get pemeriksaan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan failed');
    }
  },
};

exports.pemeriksaanControllers = pemeriksaanControllers;
