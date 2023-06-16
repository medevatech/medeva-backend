const { response } = require(`../middleware/common`);
const {
  insertSkrining,
  allSkrining,
  countAllSkrining,
  getSkriningByIdSkrining,
  findSkriningByIdSkrining,
  editSkrining,
  editSkriningActiveArchive,
  deleteSkrining,
} = require(`../models/skrining`);
const { v4: uuidv4 } = require('uuid');

const skriningControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        is_active: 1,
      };

      await insertSkrining(data);
      response(res, 200, true, data, 'insert skrining success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert skrining failed');
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

      const result = await allSkrining({
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
      } = await countAllSkrining(search, searchPasien, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get skrining success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get skrining failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getSkriningByIdSkrining({
        id,
      });

      const {
        rows: [findSkrining],
      } = await findSkriningByIdSkrining(id);

      if (findSkrining) {
        response(res, 200, true, result.rows, 'get skrining success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id skrining not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get skrining failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSkrining],
      } = await findSkriningByIdSkrining(id);

      if (findSkrining) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          is_active: 1,
        };

        await editSkrining(data);
        response(res, 200, true, data, 'edit skrining success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id skrining not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit skrining failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSkrining],
      } = await findSkriningByIdSkrining(id);

      if (findSkrining) {
        let data = {
          id,
          is_active: 1,
        };

        await editSkriningActiveArchive(data);
        response(res, 200, true, data, 'activate skrining success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id skrining not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active skrining failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSkrining],
      } = await findSkriningByIdSkrining(id);

      if (findSkrining) {
        let data = {
          id,
          is_active: 0,
        };

        await editSkriningActiveArchive(data);
        response(res, 200, true, data, 'archive skrining success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id skrining not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive skrining failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findSkrining],
      } = await findSkriningByIdSkrining(id);

      if (findSkrining) {
        let data = {
          id,
        };

        await deleteSkrining(data);
        response(res, 200, true, data, 'delete skrining success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id skrining not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete skrining failed');
    }
  },
};

exports.skriningControllers = skriningControllers;
