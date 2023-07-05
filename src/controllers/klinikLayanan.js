const { response } = require(`../middleware/common`);
const {
  insertKlinikLayanan,
  allKlinikLayanan,
  countAllKlinikLayanan,
  getKlinikLayananByIdKlinikLayanan,
  findKlinikLayananByIdKlinikLayanan,
  getKlinikLayananByIdKlinik,
  findKlinikLayananByIdKlinik,
  getKlinikLayananByIdDaftarLayanan,
  findKlinikLayananByIdDaftarLayanan,
  editKlinikLayanan,
  editKlinikLayananActivate,
  editKlinikLayananArchive,
  deleteKlinikLayanan,
} = require(`../models/klinikLayanan.js`);
const { v4: uuidv4 } = require('uuid');

const klinikLayananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_daftar_layanan: req.body.id_daftar_layanan,
        harga_jasa: req.body.harga_jasa,
        harga_jual: req.body.harga_jual,
        is_active: 1,
      };

      req.body.harga_jasa === '' ? (data.harga_jasa = 0) : req.body.harga_jasa;
      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikLayanan(data);
        response(res, 200, true, data, 'insert klinik layanan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik layanan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchKlinik = req.query.searchKlinik || '';
      const searchNamaDaftarLayanan = req.query.searchNamaDaftarLayanan || '';
      const searchStatus = req.query.searchStatus || '';
      const searchTipeDaftarLayanan = req.query.searchTipeDaftarLayanan || '';
      const offset = (page - 1) * limit;

      const result = await allKlinikLayanan({
        search,
        searchKlinik,
        searchNamaDaftarLayanan,
        searchStatus,
        searchTipeDaftarLayanan,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikLayanan(
        search,
        searchKlinik,
        searchNamaDaftarLayanan,
        searchStatus,
        searchTipeDaftarLayanan
      );

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
        'get klinik layanan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikLayananByIdKlinikLayanan({
        id,
      });

      const {
        rows: [findKlinikLayanan],
      } = await findKlinikLayananByIdKlinikLayanan(id);

      if (findKlinikLayanan) {
        response(res, 200, true, result.rows, 'get klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik ${id} layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik layanan failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getKlinikLayananByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findKlinikLayananByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik ${id_klinik} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik layanan failed');
    }
  },
  getByIdDaftarLayanan: async (req, res) => {
    try {
      const id_daftar_layanan = req.params.id_daftar_layanan;

      const result = await getKlinikLayananByIdDaftarLayanan({
        id_daftar_layanan,
      });

      const {
        rows: [findDaftarLayanan],
      } = await findKlinikLayananByIdDaftarLayanan(id_daftar_layanan);

      if (findDaftarLayanan) {
        response(res, 200, true, result.rows, 'get klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id daftar layanan ${id_daftar_layanan} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikLayanan],
      } = await findKlinikLayananByIdKlinikLayanan(id);

      if (findKlinikLayanan) {
        let data = {
          id: uuidv4(),
          id_klinik: req.body.id_klinik,
          id_daftar_layanan: req.body.id_daftar_layanan,
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

        await editKlinikLayanan(data);
        response(res, 200, true, data, 'edit klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanan ${id} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik layanan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikLayanan],
      } = await findKlinikLayananByIdKlinikLayanan(id);

      if (findKlinikLayanan) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikLayananActivate(data);
        response(res, 200, true, data, 'activate klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanan ${id} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik layanan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikLayanan],
      } = await findKlinikLayananByIdKlinikLayanan(id);

      if (findKlinikLayanan) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikLayananArchive(data);
        response(res, 200, true, data, 'archive klinik layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanana ${id} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik layanan failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikLayanan],
      } = await findKlinikLayananByIdKlinikLayanan(id);

      if (findKlinikLayanan) {
        let data = {
          id,
        };

        await deleteKlinikLayanan(data);
        response(res, 200, true, data, 'delete klinik layanana success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanan ${id} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik layanana failed');
    }
  },
};

exports.klinikLayananControllers = klinikLayananControllers;
