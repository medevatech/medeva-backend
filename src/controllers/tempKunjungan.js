const { response } = require(`../middleware/common`);
const {
  insertTempKunjungan,
  allTempKunjungan,
  countAllTempKunjungan,
  getTempKunjunganByIdTempKunjungan,
  findTempKunjunganByIdTempKunjungan,
  editTempKunjungan,
  editTempKunjunganActiveArchive,
  deleteTempKunjungan,
} = require(`../models/tempKunjungan`);
const { v4: uuidv4 } = require('uuid');

const tempKunjunganControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_vs: req.body.id_vs,
        is_active: 1,
      };

      await insertTempKunjungan(data);
      response(res, 200, true, data, 'insert temp kunjungan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert temp kunjungan failed');
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

      const result = await allTempKunjungan({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllTempKunjungan(search, searchStatus);

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
        'get temp kunjungan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get temp kunjungan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getTempKunjunganByIdTempKunjungan({
        id,
      });

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganByIdTempKunjungan(id);

      if (findTempKunjungan) {
        response(res, 200, true, result.rows, 'get temp kunjungan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get temp kunjungan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganByIdTempKunjungan(id);

      if (findTempKunjungan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_vs: req.body.id_vs,
          is_active: 1,
        };

        await editTempKunjungan(data);
        response(res, 200, true, data, 'edit temp kunjungan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit temp kunjungan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganByIdTempKunjungan(id);

      if (findTempKunjungan) {
        let data = {
          id,
          is_active: 1,
        };

        await editTempKunjunganActiveArchive(data);
        response(res, 200, true, data, 'activate temp kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active temp kunjungan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganByIdTempKunjungan(id);

      if (findTempKunjungan) {
        let data = {
          id,
          is_active: 0,
        };

        await editTempKunjunganActiveArchive(data);
        response(res, 200, true, data, 'archive temp kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive temp kunjungan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findTempKunjungan],
      } = await findTempKunjunganByIdTempKunjungan(id);

      if (findTempKunjungan) {
        let data = {
          id,
        };

        await deleteTempKunjungan(data);
        response(res, 200, true, data, 'delete temp kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id temp kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete temp kunjungan failed');
    }
  },
};

exports.tempKunjunganControllers = tempKunjunganControllers;
