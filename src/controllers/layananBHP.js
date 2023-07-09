const { response } = require(`../middleware/common`);
const {
  insertLayananBHP,
  allLayananBHP,
  countAllLayananBHP,
  getLayananBHPByIdLayananBHP,
  findLayananBHPByIdLayananBHP,
  getLayananBHPByIdKlinikBHP,
  findLayananBHPByIdKlinikBHP,
  getLayananBHPByIdKlinikLayanan,
  findLayananBHPByIdKlinikLayanan,
  editLayananBHP,
  editLayananBHPActivate,
  editLayananBHPArchive,
  deleteLayananBHP,
} = require(`../models/layananBHP.js`);
const { v4: uuidv4 } = require('uuid');

const layananBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_bhp: req.body.id_klinik_bhp,
        id_klinik_layanan: req.body.id_klinik_layanan,
        jumlah_pakai: req.body.jumlah_pakai,
        is_active: 1,
      };

      req.body.jumlah_pakai === ''
        ? (data.jumlah_pakai = 0)
        : req.body.jumlah_pakai;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_bhp' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertLayananBHP(data);
        response(res, 200, true, data, 'insert layanan bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert layanan bhp failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNamaKlinikBHP = req.query.searchNamaKlinikBHP || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allLayananBHP({
        search,
        searchNamaKlinikBHP,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllLayananBHP(search, searchNamaKlinikBHP, searchStatus);

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
        'get layanan bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getLayananBHPByIdLayananBHP({
        id,
      });

      const {
        rows: [findLayananBHP],
      } = await findLayananBHPByIdLayananBHP(id);

      if (findLayananBHP) {
        response(res, 200, true, result.rows, 'get layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan bhp failed');
    }
  },
  getByIdKlinikBHP: async (req, res) => {
    try {
      const id_klinik_bhp = req.params.id_klinik_bhp;

      const result = await getLayananBHPByIdKlinikBHP({
        id_klinik_bhp,
      });

      const {
        rows: [findKlinikBHP],
      } = await findLayananBHPByIdKlinikBHP(id_klinik_bhp);

      if (findKlinikBHP) {
        response(res, 200, true, result.rows, 'get layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik bhp (${id_klinik_bhp}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get layanan bhp failed');
    }
  },
  getByIdKlinikLayanan: async (req, res) => {
    try {
      const id_klinik_layanan = req.params.id_klinik_layanan;

      const result = await getLayananBHPByIdKlinikLayanan({
        id_klinik_layanan,
      });

      const {
        rows: [findKlinikLayanan],
      } = await findLayananBHPByIdKlinikLayanan(id_klinik_layanan);

      if (findKlinikLayanan) {
        response(res, 200, true, result.rows, 'get layanan bhp success');
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
      response(res, 404, false, error, 'get layanan bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananBHP],
      } = await findLayananBHPByIdLayananBHP(id);

      if (findLayananBHP) {
        let data = {
          id,
          id_klinik_bhp: req.body.id_klinik_bhp,
          id_klinik_layanan: req.body.id_klinik_layanan,
          jumlah_pakai: req.body.jumlah_pakai,
          is_active: 1,
        };

        req.body.jumlah_pakai === ''
          ? (data.jumlah_pakai = 0)
          : req.body.jumlah_pakai;

        await editLayananBHP(data);
        response(res, 200, true, data, 'edit layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit layanan bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananBHP],
      } = await findLayananBHPByIdLayananBHP(id);

      if (findLayananBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editLayananBHPActivate(data);
        response(res, 200, true, data, 'activate layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate layanan bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananBHP],
      } = await findLayananBHPByIdLayananBHP(id);

      if (findLayananBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editLayananBHPArchive(data);
        response(res, 200, true, data, 'archive layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive layanan bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findLayananBHP],
      } = await findLayananBHPByIdLayananBHP(id);

      if (findLayananBHP) {
        let data = {
          id,
        };

        await deleteLayananBHP(data);
        response(res, 200, true, data, 'delete layanan bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id layanan bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete layanan bhp failed');
    }
  },
};

exports.layananBHPControllers = layananBHPControllers;
