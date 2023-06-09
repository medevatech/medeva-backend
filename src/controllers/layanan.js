const { response } = require(`../middleware/common`);
const {
  insertLayanan,
  allLayanan,
  countAllLayanan,
  getLayananByIdLayanan,
  findLayananByIdLayanan,
  getLayananByIdKunjungan,
  findLayananByIdKunjungan,
  getLayananByIdPasien,
  findLayananByIdPasien,
  editLayanan,
  editLayananActiveArchive,
  deleteLayanan,
} = require(`../models/layanan`);
const { v4: uuidv4 } = require('uuid');

const layananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_daftar_layanan: req.body.id_daftar_layanan,
        id_pasien: req.body.id_pasien,
        catatan: req.body.catatan,
        status: req.body.status,
        is_active: 1,
      };

      req.body.status === ''
        ? (data.status = 'BELUM SELESAI')
        : req.body.status;

      if (data.id_kunjungan == '') {
        response(res, 200, true, data, 'insert layanan but id_kunjungan null');
      } else if (data.id_daftar_layanan == '') {
        response(
          res,
          200,
          true,
          data,
          'insert layanan but id_daftar_layanan null'
        );
      } else {
        await insertLayanan(data);
        response(res, 200, true, data, 'insert layanan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert layanan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchStatus = req.query.searchStatus || '';
      const searchDone = req.query.searchDone || '';
      const offset = (page - 1) * limit;

      const result = await allLayanan({
        search,
        searchStatus,
        searchDone,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllLayanan(
        search,
        searchDaftarLayanan,
        searchStatus,
        searchDone
      );

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get layanan success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getLayananByIdLayanan({
        id,
      });

      const {
        rows: [findLayanan],
      } = await findLayananByIdLayanan(id);

      if (findLayanan) {
        response(res, 200, true, result.rows, 'get layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getLayananByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findLayananKunjungan],
      } = await findLayananByIdKunjungan(id_kunjungan);

      if (findLayananKunjungan) {
        response(res, 200, true, result.rows, 'get layanan success');
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
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getLayananByIdPasien({
        id_pasien,
      });

      const {
        rows: [findLayananPasien],
      } = await findLayananByIdPasien(id_pasien);

      if (findLayananPasien) {
        response(res, 200, true, result.rows, 'get layanan success');
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
      response(res, 404, false, error, 'get layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayanan],
      } = await findLayananByIdLayanan(id);

      if (findLayanan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_daftar_layanan: req.body.id_daftar_layanan,
          id_pasien: req.body.id_pasien,
          catatan: req.body.catatan,
          status: req.body.status,
          is_active: 1,
        };

        req.body.status === ''
          ? (data.status = 'BELUM SELESAI')
          : req.body.status;

        if (data.id_kunjungan == '') {
          await deleteLayanan(data);
          response(res, 200, true, data, 'delete layanan success');
        } else if (data.id_daftar_layanan == '') {
          await deleteLayanan(data);
          response(res, 200, true, data, 'delete layanan success');
        } else {
          await editLayanan(data);
          response(res, 200, true, data, 'edit layanan success');
        }
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit layanan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayanan],
      } = await findLayananByIdLayanan(id);

      if (findLayanan) {
        let data = {
          id,
          is_active: 1,
        };

        await editLayananActiveArchive(data);
        response(res, 200, true, data, 'activate layanan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active layanan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayanan],
      } = await findLayananByIdLayanan(id);

      if (findLayanan) {
        let data = {
          id,
          is_active: 0,
        };

        await editLayananActiveArchive(data);
        response(res, 200, true, data, 'archive layanan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive layanan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findLayanan],
      } = await findLayananByIdLayanan(id);

      if (findLayanan) {
        let data = {
          id,
        };

        await deleteLayanan(data);
        response(res, 200, true, data, 'delete layanan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete layanan failed');
    }
  },
};

exports.layananControllers = layananControllers;
