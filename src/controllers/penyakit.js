const { response } = require(`../middleware/common`);
const {
  insertPenyakit,
  countAll,
  allPenyakit,
  countAllPenyakit,
  getPenyakitByIdPenyakit,
  findPenyakitByIdPenyakit,
  editPenyakit,
  editPenyakitActiveArchive,
  deletePenyakit,
} = require(`../models/penyakit`);
const { v4: uuidv4 } = require('uuid');

const penyakitControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        kode_icd10: req.body.kode_icd10,
        nama_penyakit: req.body.nama_penyakit,
        kronis: req.body.kronis,
        is_active: 1,
      };

      await insertPenyakit(data);
      response(res, 200, true, data, 'insert penyakit success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert penyakit failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const {
        rows: [countPenyakit],
      } = await countAll();

      const all = parseInt(countPenyakit.total);
      console.log(countPenyakit);
      console.log(all);

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || all;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNama = req.query.searchNama || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPenyakit({
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
      } = await countAllPenyakit(search, searchNama, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get penyakit success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get penyakit failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPenyakitByIdPenyakit({
        id,
      });

      const {
        rows: [findPenyakit],
      } = await findPenyakitByIdPenyakit(id);

      if (findPenyakit) {
        response(res, 200, true, result.rows, 'get penyakit success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id penyakit not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get penyakit failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPenyakit],
      } = await findPenyakitByIdPenyakit(id);

      if (findPenyakit) {
        let data = {
          id,
          kode_icd10: req.body.kode_icd10,
          nama_penyakit: req.body.nama_penyakit,
          kronis: req.body.kronis,
          is_active: 1,
        };

        await editPenyakit(data);
        response(res, 200, true, data, 'edit penyakit success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id penyakit not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit penyakit failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPenyakit],
      } = await findPenyakitByIdPenyakit(id);

      if (findPenyakit) {
        let data = {
          id,
          is_active: 1,
        };

        await editPenyakitActiveArchive(data);
        response(res, 200, true, data, 'activate penyakit success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id penyakit not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active penyakit failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPenyakit],
      } = await findPenyakitByIdPenyakit(id);

      if (findPenyakit) {
        let data = {
          id,
          is_active: 0,
        };

        await editPenyakitActiveArchive(data);
        response(res, 200, true, data, 'archive penyakit success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id penyakit not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive penyakit failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPenyakit],
      } = await findPenyakitByIdPenyakit(id);

      if (findPenyakit) {
        let data = {
          id,
        };

        await deletePenyakit(data);
        response(res, 200, true, data, 'delete penyakit success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id penyakit not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete penyakit failed');
    }
  },
};

exports.penyakitControllers = penyakitControllers;
