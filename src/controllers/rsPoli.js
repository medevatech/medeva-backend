const { response } = require(`../middleware/common`);
const {
  insertRSPoli,
  allRSPoli,
  countAllRSPoli,
  getRSPoliByIdRSPoli,
  findRSPoliByIdRSPoli,
  editRSPoli,
  editRSPoliActiveArchive,
  deleteRSPoli,
} = require(`../models/rsPoli`);
const { v4: uuidv4 } = require('uuid');

const rsPoliControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_rs: req.body.id_rs,
        id_poli: req.body.id_poli,
        is_active: 1,
      };

      await insertRSPoli(data);
      response(res, 200, true, data, 'insert rs poli success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert rs poli failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchRS = req.query.searchRS || '';
      const searchPoli = req.query.searchPoli || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allRSPoli({
        search,
        searchRS,
        searchPoli,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllRSPoli(search, searchRS, searchPoli, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get rs poli success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rs poli failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getRSPoliByIdRSPoli({
        id,
      });

      const {
        rows: [findRSPoli],
      } = await findRSPoliByIdRSPoli(id);

      if (findRSPoli) {
        response(res, 200, true, result.rows, 'get rs poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rs poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rs poli failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRSPoli],
      } = await findRSPoliByIdRSPoli(id);

      if (findRSPoli) {
        let data = {
          id,
          id_rs: req.body.id_rs,
          id_poli: req.body.id_poli,
          is_active: 1,
        };

        await editRSPoli(data);
        response(res, 200, true, data, 'edit rs poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rs poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit rs poli failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRSPoli],
      } = await findRSPoliByIdRSPoli(id);

      if (findRSPoli) {
        let data = {
          id,
          is_active: 1,
        };

        await editRSPoliActiveArchive(data);
        response(res, 200, true, data, 'activate rs poli success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rs poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active rs poli failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRSPoli],
      } = await findRSPoliByIdRSPoli(id);

      if (findRSPoli) {
        let data = {
          id,
          is_active: 0,
        };

        await editRSPoliActiveArchive(data);
        response(res, 200, true, data, 'archive rs poli success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rs poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive rs poli failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findRSPoli],
      } = await findRSPoliByIdRSPoli(id);

      if (findRSPoli) {
        let data = {
          id,
        };

        await deleteRSPoli(data);
        response(res, 200, true, data, 'delete rs poli success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rs poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete rs poli failed');
    }
  },
};

exports.rsPoliControllers = rsPoliControllers;
