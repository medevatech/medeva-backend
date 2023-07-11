const { response } = require(`../middleware/common`);
const {
  insertLayananJasa,
  allLayananJasa,
  countAllLayananJasa,
  getLayananJasaByIdLayananJasa,
  findLayananJasaByIdLayananJasa,
  getLayananJasaByIdKlinikLayanan,
  findLayananJasaByIdKlinikLayanan,
  editLayananJasa,
  editLayananJasaActivate,
  editLayananJasaArchive,
  deleteLayananJasa,
} = require(`../models/layananJasa.js`);
const { v4: uuidv4 } = require('uuid');

const layananJasaControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_layanan: req.body.id_klinik_layanan,
        harga_jasa: req.body.harga_jasa,
        harga_jual: req.body.harga_jual,
        is_active: 1,
      };

      req.body.harga_jasa === '' ? (data.harga_jasa = 0) : req.body.harga_jasa;
      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_layanan' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertLayananJasa(data);
        response(res, 200, true, data, 'insert layanan jasa success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert layanan jasa failed');
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

      const result = await allLayananJasa({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllLayananJasa(search, searchStatus);

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
        'get layanan jasa success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan jasa failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getLayananJasaByIdLayananJasa({
        id,
      });

      const {
        rows: [findLayananJasa],
      } = await findLayananJasaByIdLayananJasa(id);

      if (findLayananJasa) {
        response(res, 200, true, result.rows, 'get layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan jasa (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan jasa failed');
    }
  },
  getByIdKlinikLayanan: async (req, res) => {
    try {
      const id_klinik_layanan = req.params.id_klinik_layanan;

      const result = await getLayananJasaByIdKlinikLayanan({
        id_klinik_layanan,
      });

      const {
        rows: [findKlinikLayanan],
      } = await findLayananJasaByIdKlinikLayanan(id_klinik_layanan);

      if (findKlinikLayanan) {
        response(res, 200, true, result.rows, 'get layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanan (${id_klinik_layanan}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan jasa failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananJasa],
      } = await findLayananJasaByIdLayananJasa(id);

      if (findLayananJasa) {
        let data = {
          id,
          id_klinik_layanan: req.body.id_klinik_layanan,
          harga_jasa: req.body.harga_jasa,
          harga_jual: req.body.harga_jual,
          is_active: 1,
        };

        req.body.harga_jasa === ''
          ? (data.harga_jasa = 0)
          : req.body.harga_jasa;
        req.body.harga_jual === ''
          ? (data.harga_jual = 0)
          : req.body.harga_jual;

        await editLayananJasa(data);
        response(res, 200, true, data, 'edit layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan jasa (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit layanan jasa failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananJasa],
      } = await findLayananJasaByIdLayananJasa(id);

      if (findLayananJasa) {
        let data = {
          id,
          is_active: 1,
        };

        await editLayananJasaActivate(data);
        response(res, 200, true, data, 'activate layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan jasa (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate layanan jasa failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananJasa],
      } = await findLayananJasaByIdLayananJasa(id);

      if (findLayananJasa) {
        let data = {
          id,
          is_active: 0,
        };

        await editLayananJasaArchive(data);
        response(res, 200, true, data, 'archive layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan jasa (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive layanan jasa failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananJasa],
      } = await findLayananJasaByIdLayananJasa(id);

      if (findLayananJasa) {
        let data = {
          id,
        };

        await deleteLayananJasa(data);
        response(res, 200, true, data, 'delete layanan jasa success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan jasa (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete layanan jasa failed');
    }
  },
};

exports.layananJasaControllers = layananJasaControllers;
