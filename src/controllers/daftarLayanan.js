const { response } = require(`../middleware/common`);
const {
  insertDaftarLayanan,
  allDaftarLayanan,
  countAllDaftarLayanan,
  getDaftarLayananByIdDaftarLayanan,
  findDaftarLayananByIdDaftarLayanan,
  editDaftarLayanan,
  editDaftarLayananActivate,
  editDaftarLayananArchive,
  deleteDaftarLayanan,
} = require(`../models/daftarLayanan`);
const { v4: uuidv4 } = require('uuid');

const daftarLayananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        is_active: 1,
      };

      await insertDaftarLayanan(data);
      response(res, 200, true, data, 'insert daftar layanan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert daftar layanan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allDaftarLayanan({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllDaftarLayanan(search, searchStatus);

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
        'get daftar layanan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getDaftarLayananByIdDaftarLayanan({
        id,
      });

      const {
        rows: [findDaftarLayanan],
      } = await findDaftarLayananByIdDaftarLayanan(id);

      if (findDaftarLayanan) {
        response(res, 200, true, result.rows, 'get daftar layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarLayanan],
      } = await findDaftarLayananByIdDaftarLayanan(id);

      if (findDaftarLayanan) {
        let data = {
          id,
          nama: req.body.nama,
          is_active: 1,
        };

        await editDaftarLayanan(data);
        response(res, 200, true, data, 'edit daftar layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit daftar layanan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarLayanan],
      } = await findDaftarLayananByIdDaftarLayanan(id);

      if (findDaftarLayanan) {
        let data = {
          id,
          is_active: 1,
        };

        await editDaftarLayananActivate(data);
        response(res, 200, true, data, 'activate daftar layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate daftar layanan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarLayanan],
      } = await findDaftarLayananByIdDaftarLayanan(id);

      if (findDaftarLayanan) {
        let data = {
          id,
          is_active: 0,
        };

        await editDaftarLayananArchive(data);
        response(res, 200, true, data, 'archive daftar layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive daftar layanan failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarLayanan],
      } = await findDaftarLayananByIdDaftarLayanan(id);

      if (findDaftarLayanan) {
        let data = {
          id,
        };

        await deleteDaftarLayanan(data);
        response(res, 200, true, data, 'delete daftar layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete daftar layanan failed');
    }
  },
};

exports.daftarLayananControllers = daftarLayananControllers;
