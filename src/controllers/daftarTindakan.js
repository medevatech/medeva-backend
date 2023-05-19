const { response } = require(`../middleware/common`);
const {
  insertDaftarTindakan,
  allDaftarTindakan,
  countAllDaftarTindakan,
  getDaftarTindakanById,
  findDaftarTindakanById,
  editDaftarTindakan,
  editDaftarTindakanActivate,
  editDaftarTindakanArchive,
  deleteDaftarTindakan,
} = require(`../models/daftarTindakan`);
const { v4: uuidv4 } = require('uuid');

const daftarTindakanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        is_active: 1,
      };

      await insertDaftarTindakan(data);
      response(res, 200, true, data, 'insert daftar tindakan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert daftar tindakan failed');
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

      const result = await allDaftarTindakan({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllDaftarTindakan();

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
        'get daftar tindakan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar tindakan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getDaftarTindakanById({
        id,
      });

      const {
        rows: [findDaftarTindakan],
      } = await findDaftarTindakanById(id);

      if (findDaftarTindakan) {
        response(res, 200, true, result.rows, 'get daftar tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar tindakan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarTindakan],
      } = await findDaftarTindakanById(id);

      if (findDaftarTindakan) {
        let data = {
          id,
          nama: req.body.nama,
        };

        await editDaftarTindakan(data);
        response(res, 200, true, data, 'edit daftar tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit daftar tindakan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarTindakan],
      } = await findDaftarTindakanById(id);

      if (findDaftarTindakan) {
        let data = {
          id,
          is_active: 1,
        };

        await editDaftarTindakanActivate(data);
        response(res, 200, true, data, 'activate daftar tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate daftar tindakan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarTindakan],
      } = await findDaftarTindakanById(id);

      if (findDaftarTindakan) {
        let data = {
          id,
          is_active: 0,
        };

        await editDaftarTindakanArchive(data);
        response(res, 200, true, data, 'archive daftar tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive daftar tindakan failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findDaftarTindakan],
      } = await findDaftarTindakanById(id);

      if (findDaftarTindakan) {
        let data = {
          id,
        };

        await deleteDaftarTindakan(data);
        response(res, 200, true, data, 'delete daftar tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete daftar tindakan failed');
    }
  },
};

exports.daftarTindakanControllers = daftarTindakanControllers;
