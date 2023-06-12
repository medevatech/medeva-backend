const { response } = require(`../middleware/common`);
const {
  insertHargaLayanan,
  allHargaLayanan,
  countAllHargaLayanan,
  getHargaLayananById,
  findHargaLayananById,
  editHargaLayanan,
  editHargaLayananActivate,
  editHargaLayananArchive,
  deleteHargaLayanan,
} = require(`../models/hargaLayanan`);
const { v4: uuidv4 } = require('uuid');

const hargaLayananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_daftar_layanan: req.body.id_daftar_layanan,
        harga: req.body.harga,
        is_active: '1',
      };

      if (data.id_daftar_layanan == '') {
        response(
          res,
          404,
          true,
          null,
          'insert harga layanan failed id_daftar_layanan required'
        );
      } else if (data.harga == '') {
        response(
          res,
          404,
          true,
          null,
          'insert harga layanan failed harga required'
        );
      } else {
        await insertHargaLayanan(data);
        response(res, 200, true, data, 'insert harga layanan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert harga layanan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchKlinik = req.query.searchKlinik || '';
      const searchStatus = req.query.searchStatus || '';
      const searchDaftarLayanan = req.query.searchDaftarLayanan || '';
      const offset = (page - 1) * limit;

      const result = await allHargaLayanan({
        search,
        searchKlinik,
        searchStatus,
        searchDaftarLayanan,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllHargaLayanan(
        search,
        searchKlinik,
        searchStatus,
        searchDaftarLayanan
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
        'get harga layanan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get harga layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getHargaLayananById({
        id,
      });

      const {
        rows: [findHargaLayanan],
      } = await findHargaLayananById(id);

      if (findHargaLayanan) {
        response(res, 200, true, result.rows, 'get harga layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get harga layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findHargaLayanan],
      } = await findHargaLayananById(id);

      if (findHargaLayanan) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          id_daftar_layanan: req.body.id_daftar_layanan,
          harga: req.body.harga,
        };

        await editHargaLayanan(data);
        response(res, 200, true, data, 'edit harga layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit harga layanan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findHargaLayanan],
      } = await findHargaLayananById(id);

      if (findHargaLayanan) {
        let data = {
          id,
          is_active: 1,
        };

        await editHargaLayananActivate(data);
        response(res, 200, true, data, 'activate harga layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate harga layanan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findHargaLayanan],
      } = await findHargaLayananById(id);

      if (findHargaLayanan) {
        let data = {
          id,
          is_active: 0,
        };

        await editHargaLayananArchive(data);
        response(res, 200, true, data, 'archive harga layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive harga layanan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findHargaLayanan],
      } = await findHargaLayananById(id);

      if (findHargaLayanan) {
        let data = {
          id,
        };

        await deleteHargaLayanan(data);
        response(res, 200, true, data, 'delete harga layanan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id harga layanan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete harga layanan failed');
    }
  },
};

exports.hargaLayananControllers = hargaLayananControllers;
