const { response } = require(`../middleware/common`);
const {
  insertPemeriksaanPenunjang,
  allPemeriksaanPenunjang,
  countAllPemeriksaanPenunjang,
  getPemeriksaanPenunjangById,
  findPemeriksaanPenunjangById,
  editPemeriksaanPenunjang,
  getPemeriksaanPenunjangByIdKunjungan,
  findPemeriksaanPenunjangByIdKunjungan,
} = require(`../models/pemeriksaanPenunjang`);
const { v4: uuidv4 } = require('uuid');

const pemeriksaanPenunjangControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pemeriksaan: req.body.id_pemeriksaan,
        id_lab: req.body.id_lab,
        id_kunjungan: req.body.id_kunjungan,
      };

      await insertPemeriksaanPenunjang(data);
      response(res, 200, true, data, 'insert pemeriksaan penunjang success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pemeriksaan penunjang failed');
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

      const result = await allPemeriksaanPenunjang({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemeriksaanPenunjang();

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
        'get pemeriksaan penunjang success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan penunjang failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPemeriksaanPenunjangById({
        id,
      });

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangById(id);

      if (findPemeriksaanPenunjang) {
        response(
          res,
          200,
          true,
          result.rows,
          'get pemeriksaan penunjang success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemeriksaan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan penunjang failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getPemeriksaanPenunjangByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findPemeriksaanPenunjangKunjungan],
      } = await findPemeriksaanPenunjangByIdKunjungan(id_kunjungan);

      if (findPemeriksaanPenunjangKunjungan) {
        response(
          res,
          200,
          true,
          result.rows,
          'get pemeriksaan penunjang success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kunjungan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemeriksaan penunjang failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangById(id);

      if (findPemeriksaanPenunjang) {
        let data = {
          id,
          id_pemeriksaan: req.body.id_pemeriksaan,
          id_lab: req.body.id_lab,
          id_kunjungan: req.body.id_kunjungan,
        };

        await editPemeriksaanPenunjang(data);
        response(res, 200, true, data, 'edit pemeriksaan penunjang success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemeriksaan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit PemeriksaanPenunjang failed');
    }
  },
};

exports.pemeriksaanPenunjangControllers = pemeriksaanPenunjangControllers;
