const { response } = require(`../middleware/common`);
const {
  insertTindakan,
  allTindakan,
  countAllTindakan,
  getTindakanByIdTindakan,
  findTindakanByIdTindakan,
  editTindakan,
  getTindakanByIdKunjungan,
  findTindakanByIdKunjungan,
  editTindakanActiveArchive,
  deleteTindakan,
} = require(`../models/tindakan`);
const { v4: uuidv4 } = require('uuid');

const tindakanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_daftar_tindakan: req.body.id_daftar_tindakan,
        catatan: req.body.catatan,
        is_active: 1,
      };

      if (data.id_kunjungan == '') {
        response(res, 200, true, data, 'insert tindakan but id_kunjungan null');
      } else if (data.id_daftar_tindakan == '') {
        response(
          res,
          200,
          true,
          data,
          'insert tindakan but id_daftar_tindakan null'
        );
      } else {
        await insertTindakan(data);
        response(res, 200, true, data, 'insert tindakan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert tindakan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchDaftarTindakan = req.query.searchDaftarTindakan || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allTindakan({
        search,
        searchDaftarTindakan,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllTindakan(search, searchDaftarTindakan, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get tindakan success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getTindakanByIdTindakan({
        id,
      });

      const {
        rows: [findTindakan],
      } = await findTindakanByIdTindakan(id);

      if (findTindakan) {
        response(res, 200, true, result.rows, 'get tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTindakan],
      } = await findTindakanByIdTindakan(id);

      if (findTindakan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_daftar_tindakan: req.body.id_daftar_tindakan,
          catatan: req.body.catatan,
          is_active: 1,
        };

        if (data.id_kunjungan == '') {
          await deleteTindakan(data);
          response(res, 200, true, data, 'delete tindakan success');
        } else if (data.id_daftar_tindakan == '') {
          await deleteTindakan(data);
          response(res, 200, true, data, 'delete tindakan success');
        } else {
          await editTindakan(data);
          response(res, 200, true, data, 'edit tindakan success');
        }
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit tindakan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getTindakanByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findTindakanKunjungan],
      } = await findTindakanByIdKunjungan(id_kunjungan);

      if (findTindakanKunjungan) {
        response(res, 200, true, result.rows, 'get tindakan success');
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
      response(res, 404, false, error, 'get tindakan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTindakan],
      } = await findTindakanByIdTindakan(id);

      if (findTindakan) {
        let data = {
          id,
          is_active: 1,
        };

        await editTindakanActiveArchive(data);
        response(res, 200, true, data, 'activate tindakan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active tindakan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTindakan],
      } = await findTindakanByIdTindakan(id);

      if (findTindakan) {
        let data = {
          id,
          is_active: 0,
        };

        await editTindakanActiveArchive(data);
        response(res, 200, true, data, 'archive tindakan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive tindakan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findTindakan],
      } = await findTindakanByIdTindakan(id);

      if (findTindakan) {
        let data = {
          id,
        };

        await deleteTindakan(data);
        response(res, 200, true, data, 'delete tindakan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete tindakan failed');
    }
  },
};

exports.tindakanControllers = tindakanControllers;
