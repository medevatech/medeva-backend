const { response } = require(`../middleware/common`);
const {
  insertBahanObat,
  allBahanObat,
  countAllBahanObat,
  getBahanObatByIdBahanObat,
  findBahanObatByIdBahanObat,
  editBahanObat,
  editBahanObatActivate,
  editBahanObatArchive,
  deleteBahanObat,
} = require(`../models/bahanObat.js`);
const { v4: uuidv4 } = require('uuid');

const bahanObatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'nama' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertBahanObat(data);
        response(res, 200, true, data, 'insert bahan obat success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert bahan obat failed');
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

      const result = await allBahanObat({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllBahanObat(search, searchStatus);

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
        'get bahan obat success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get bahan obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getBahanObatByIdBahanObat({
        id,
      });

      const {
        rows: [findBahanObat],
      } = await findBahanObatByIdBahanObat(id);

      if (findBahanObat) {
        response(res, 200, true, result.rows, 'get bahan obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id bahan obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get bahan obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findBahanObat],
      } = await findBahanObatByIdBahanObat(id);

      if (findBahanObat) {
        let data = {
          id,
          nama: req.body.nama,
          is_active: 1,
        };

        await editBahanObat(data);
        response(res, 200, true, data, 'edit bahan obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id bahan obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit bahan obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findBahanObat],
      } = await findBahanObatByIdBahanObat(id);

      if (findBahanObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editBahanObatActivate(data);
        response(res, 200, true, data, 'activate bahan obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id bahan obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate bahan obat failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findBahanObat],
      } = await findBahanObatByIdBahanObat(id);

      if (findBahanObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editBahanObatArchive(data);
        response(res, 200, true, data, 'archive bahan obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id bahan obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive bahan obat failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findBahanObat],
      } = await findBahanObatByIdBahanObat(id);

      if (findBahanObat) {
        let data = {
          id,
        };

        await deleteBahanObat(data);
        response(res, 200, true, data, 'delete bahan obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id bahan obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete bahan obat failed');
    }
  },
};

exports.bahanObatControllers = bahanObatControllers;
