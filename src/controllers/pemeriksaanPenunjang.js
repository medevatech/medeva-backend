const { response } = require(`../middleware/common`);
const {
  insertPemeriksaanPenunjang,
  allPemeriksaanPenunjang,
  countAllPemeriksaanPenunjang,
  getPemeriksaanPenunjangByIdPemeriksaanPenunjang,
  findPemeriksaanPenunjangByIdPemeriksaanPenunjang,
  editPemeriksaanPenunjang,
  getPemeriksaanPenunjangByIdKunjungan,
  findPemeriksaanPenunjangByIdKunjungan,
  editPemeriksaanPenunjangActiveArchive,
  deletePemeriksaanPenunjang,
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
        is_active: 1,
      };

      if (data.id_kunjungan == '') {
        response(
          res,
          200,
          true,
          data,
          'insert pemeriksaan but id_kunjungan null'
        );
      } else if (data.id_lab == '') {
        response(res, 200, true, data, 'insert pemeriksaan but id_lab null');
      } else {
        await insertPemeriksaanPenunjang(data);
        response(res, 200, true, data, 'insert pemeriksaan penunjang success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pemeriksaan penunjang failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchPemeriksaan = req.query.searchPemeriksaan || '';
      const searchLab = req.query.searchLab || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPemeriksaanPenunjang({
        search,
        searchPemeriksaan,
        searchLab,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemeriksaanPenunjang(
        search,
        searchPemeriksaan,
        searchLab,
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

      const result = await getPemeriksaanPenunjangByIdPemeriksaanPenunjang({
        id,
      });

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangByIdPemeriksaanPenunjang(id);

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
      } = await findPemeriksaanPenunjangByIdPemeriksaanPenunjang(id);

      if (findPemeriksaanPenunjang) {
        let data = {
          id,
          id_pemeriksaan: req.body.id_pemeriksaan,
          id_lab: req.body.id_lab,
          id_kunjungan: req.body.id_kunjungan,
          is_active: 1,
        };

        if (data.id_kunjungan == '') {
          await deletePemeriksaanPenunjang(data);
          response(
            res,
            200,
            true,
            data,
            'delete pemeriksaan penunjang success'
          );
        } else if (data.id_lab == '') {
          await deletePemeriksaanPenunjang(data);
          response(
            res,
            200,
            true,
            data,
            'delete pemeriksaan penunjang success'
          );
        } else {
          await editPemeriksaanPenunjang(data);
          response(res, 200, true, data, 'edit pemeriksaan penunjang success');
        }
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
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangByIdPemeriksaanPenunjang(id);

      if (findPemeriksaanPenunjang) {
        let data = {
          id,
          is_active: 1,
        };

        await editPemeriksaanPenunjangActiveArchive(data);
        response(
          res,
          200,
          true,
          data,
          'activate pemeriksaan penunjang success'
        );
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active pemeriksaan penunjang failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangByIdPemeriksaanPenunjang(id);

      if (findPemeriksaanPenunjang) {
        let data = {
          id,
          is_active: 0,
        };

        await editPemeriksaanPenunjangActiveArchive(data);
        response(res, 200, true, data, 'archive pemeriksaan penunjang success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive pemeriksaan penunjang failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPemeriksaanPenunjang],
      } = await findPemeriksaanPenunjangByIdPemeriksaanPenunjang(id);

      if (findPemeriksaanPenunjang) {
        let data = {
          id,
        };

        await deletePemeriksaanPenunjang(data);
        response(res, 200, true, data, 'delete pemeriksaan penunjang success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan penunjang not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete pemeriksaan penunjang failed');
    }
  },
};

exports.pemeriksaanPenunjangControllers = pemeriksaanPenunjangControllers;
