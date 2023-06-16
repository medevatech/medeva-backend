const { response } = require(`../middleware/common`);
const {
  insertAlergi,
  allAlergi,
  countAllAlergi,
  getAlergiByIdAlergi,
  findAlergiByIdAlergi,
  editAlergi,
  editAlergiActiveArchive,
  deleteAlergi,
} = require(`../models/alergi`);
const { v4: uuidv4 } = require('uuid');

const alergiControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        kategori: req.body.kategori,
        is_active: 1,
      };

      await insertAlergi(data);
      response(res, 200, true, data, 'insert alergi success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert alergi failed');
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
      const offset = (page - 1) * limit;

      const result = await allAlergi({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAlergi(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get alergi success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getAlergiByIdAlergi({
        id,
      });

      const {
        rows: [findAlergi],
      } = await findAlergiByIdAlergi(id);

      if (findAlergi) {
        response(res, 200, true, result.rows, 'get alergi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergi],
      } = await findAlergiByIdAlergi(id);

      if (findAlergi) {
        let data = {
          id,
          nama: req.body.nama,
          kategori: req.body.kategori,
          is_active: 1,
        };

        await editAlergi(data);
        response(res, 200, true, data, 'edit alergi success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit alergi failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergi],
      } = await findAlergiByIdAlergi(id);

      if (findAlergi) {
        let data = {
          id,
          is_active: 1,
        };

        await editAlergiActiveArchive(data);
        response(res, 200, true, data, 'activate alergi success');
      } else {
        return response(res, 200, [], null, `id alergi not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active alergi failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergi],
      } = await findAlergiByIdAlergi(id);

      if (findAlergi) {
        let data = {
          id,
          is_active: 0,
        };

        await editAlergiActiveArchive(data);
        response(res, 200, true, data, 'archive alergi success');
      } else {
        return response(res, 200, [], null, `id alergi not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive alergi failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findAlergi],
      } = await findAlergiByIdAlergi(id);

      if (findAlergi) {
        let data = {
          id,
        };

        await deleteAlergi(data);
        response(res, 200, true, data, 'delete alergi success');
      } else {
        return response(res, 200, [], null, `id alergi not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete alergi failed');
    }
  },
};

exports.alergiControllers = alergiControllers;
