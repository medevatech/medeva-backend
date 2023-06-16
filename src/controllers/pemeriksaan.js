const { response } = require(`../middleware/common`);
const {
  insertPemeriksaan,
  allPemeriksaan,
  countAllPemeriksaan,
  getPemeriksaanByIdPemeriksaan,
  findPemeriksaanByIdPemeriksaan,
  editPemeriksaan,
  editPemeriksaanActiveArchive,
  deletePemeriksaan,
} = require(`../models/pemeriksaan`);
const { v4: uuidv4 } = require('uuid');

const pemeriksaanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        is_active: 1,
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
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNama = req.query.searchNama || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPemeriksaan({
        search,
        searchNama,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemeriksaan(search, searchNama, searchStatus);

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

      const result = await getPemeriksaanByIdPemeriksaan({
        id,
      });

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanByIdPemeriksaan(id);

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
      } = await findPemeriksaanByIdPemeriksaan(id);

      if (findPemeriksaan) {
        let data = {
          id,
          nama: req.body.nama,
          is_active: 1,
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
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanByIdPemeriksaan(id);

      if (findPemeriksaan) {
        let data = {
          id,
          is_active: 1,
        };

        await editPemeriksaanActiveArchive(data);
        response(res, 200, true, data, 'activate pemeriksaan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active pemeriksaan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanByIdPemeriksaan(id);

      if (findPemeriksaan) {
        let data = {
          id,
          is_active: 0,
        };

        await editPemeriksaanActiveArchive(data);
        response(res, 200, true, data, 'archive pemeriksaan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive pemeriksaan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPemeriksaan],
      } = await findPemeriksaanByIdPemeriksaan(id);

      if (findPemeriksaan) {
        let data = {
          id,
        };

        await deletePemeriksaan(data);
        response(res, 200, true, data, 'delete pemeriksaan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id pemeriksaan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete pemeriksaan failed');
    }
  },
};

exports.pemeriksaanControllers = pemeriksaanControllers;
