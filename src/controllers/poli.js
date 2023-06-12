const { response } = require(`../middleware/common`);
const {
  insertPoli,
  allPoli,
  countAllPoli,
  getPoliByIdPoli,
  findPoliByIdPoli,
  editPoli,
  editPoliActiveArchive,
  deletePoli,
} = require(`../models/poli`);
const { v4: uuidv4 } = require('uuid');

const poliControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        is_active: 1,
      };

      for (let [key, value] of Object.entries(data)) {
        if (key === 'nama' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPasien(data);
        response(res, 200, true, data, 'insert pasien success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert poli failed');
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

      const result = await allPoli({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPoli(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get poli success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get poli failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPoliByIdPoli({
        id,
      });

      const {
        rows: [findPoli],
      } = await findPoliByIdPoli(id);

      if (findPoli) {
        response(res, 200, true, result.rows, 'get poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get poli failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPoli],
      } = await findPoliByIdPoli(id);

      if (findPoli) {
        let data = {
          id,
          nama: req.body.nama,
          is_active: 1,
        };

        await editPoli(data);
        response(res, 200, true, data, 'edit poli success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id poli not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit poli failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPoli],
      } = await findPoliByIdPoli(id);

      if (findPoli) {
        let data = {
          id,
          is_active: 1,
        };

        await editPoliActiveArchive(data);
        response(res, 200, true, data, 'activate poli success');
      } else {
        return response(res, 200, [], null, `id poli not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active poli failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPoli],
      } = await findPoliByIdPoli(id);

      if (findPoli) {
        let data = {
          id,
          is_active: 0,
        };

        await editPoliActiveArchive(data);
        response(res, 200, true, data, 'archive poli success');
      } else {
        return response(res, 200, [], null, `id poli not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive poli failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPoli],
      } = await findPoliByIdPoli(id);

      if (findPoli) {
        let data = {
          id,
        };

        await deletePoli(data);
        response(res, 200, true, data, 'delete poli success');
      } else {
        return response(res, 200, [], null, `id poli not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete poli failed');
    }
  },
};

exports.poliControllers = poliControllers;
