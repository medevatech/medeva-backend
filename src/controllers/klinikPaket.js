const { response } = require(`../middleware/common`);
const {
  insertKlinikPaket,
  allKlinikPaket,
  countAllKlinikPaket,
  getKlinikPaketByIdKlinikPaket,
  findKlinikPaketByIdKlinikPaket,
  editKlinikPaket,
  editKlinikPaketActivate,
  editKlinikPaketArchive,
  deleteKlinikPaket,
} = require(`../models/klinikPaket.js`);
const { v4: uuidv4 } = require('uuid');

const klinikPaketControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        harga_jual: req.body.harga_jual,
        is_active: 1,
      };

      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'nama' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikPaket(data);
        response(res, 200, true, data, 'insert klinik paket success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik paket failed');
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

      const result = await allKlinikPaket({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikPaket(search, searchStatus);

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
        'get klinik paket success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik paket failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikPaketByIdKlinikPaket({
        id,
      });

      const {
        rows: [findLKlinikPaket],
      } = await findKlinikPaketByIdKlinikPaket(id);

      if (findLKlinikPaket) {
        response(res, 200, true, result.rows, 'get klinik paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik paket failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPaket],
      } = await findKlinikPaketByIdKlinikPaket(id);

      if (findKlinikPaket) {
        let data = {
          id,
          nama: req.body.nama,
          harga_jual: req.body.harga_jual,
          is_active: 1,
        };

        req.body.harga_jual === ''
          ? (data.harga_jual = 0)
          : req.body.harga_jual;

        await editKlinikPaket(data);
        response(res, 200, true, data, 'edit klinik paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik paket failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPaket],
      } = await findKlinikPaketByIdKlinikPaket(id);

      if (findKlinikPaket) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikPaketActivate(data);
        response(res, 200, true, data, 'activate klinik paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik paket failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPaket],
      } = await findKlinikPaketByIdKlinikPaket(id);

      if (findKlinikPaket) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikPaketArchive(data);
        response(res, 200, true, data, 'archive klinik paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik paket failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPaket],
      } = await findKlinikPaketByIdKlinikPaket(id);

      if (findKlinikPaket) {
        let data = {
          id,
        };

        await deleteKlinikPaket(data);
        response(res, 200, true, data, 'delete klinik paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik paket failed');
    }
  },
};

exports.klinikPaketControllers = klinikPaketControllers;
