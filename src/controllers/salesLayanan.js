const { response } = require(`../middleware/common`);
const {
  insertSalesLayanan,
  allSalesLayanan,
  countAllSalesLayanan,
  getSalesLayananByIdSalesLayanan,
  findSalesLayananByIdSalesLayanan,
  getSalesLayananByIdSales,
  findSalesLayananByIdSales,
  getSalesLayananByIdKlinikLayanan,
  findSalesLayananByIdKlinikLayanan,
  editSalesLayanan,
  editSalesLayananActivate,
  editSalesLayananArchive,
  deleteSalesLayanan,
} = require(`../models/salesLayanan.js`);
const { v4: uuidv4 } = require('uuid');

const salesLayananControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_sales: req.body.id_sales,
        id_klinik_layanan: req.body.id_klinik_layanan,
        tanggal: req.body.tanggal,
        harga_jual: req.body.harga_jual,
        jumlah_jual: req.body.jumlah_jual,
        is_active: 1,
      };

      req.body.tanggal === ''
        ? (data.tanggal = '1970-01-01')
        : req.body.tanggal;
      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;
      req.body.jumlah_jual === ''
        ? (data.jumlah_jual = 0)
        : req.body.jumlah_jual;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_sales' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertSalesLayanan(data);
        response(res, 200, true, data, 'insert sales layanan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert sales layanan failed');
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

      const result = await allSalesLayanan({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllSalesLayanan(search, searchStatus);

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
        'get sales layanan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales layanan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getSalesLayananByIdSalesLayanan({
        id,
      });

      const {
        rows: [findSalesLayanan],
      } = await findSalesLayananByIdSalesLayanan(id);

      if (findSalesLayanan) {
        response(res, 200, true, result.rows, 'get sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales layanan failed');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getSalesLayananByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findSalesLayananByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id_sales}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales layanan failed');
    }
  },
  getByIdKlinikLayanan: async (req, res) => {
    try {
      const id_klinik_layanan = req.params.id_klinik_layanan;

      const result = await getSalesLayananByIdKlinikLayanan({
        id_klinik_layanan,
      });

      const {
        rows: [findKlinikLayanan],
      } = await findSalesLayananByIdKlinikLayanan(id_klinik_layanan);

      if (findKlinikLayanan) {
        response(res, 200, true, result.rows, 'get sales layanan success');
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
      response(res, 404, false, error, 'get sales layanan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesLayanan],
      } = await findSalesLayananByIdSalesLayanan(id);

      if (findSalesLayanan) {
        let data = {
          id,
          id_sales: req.body.id_sales,
          id_klinik_layanan: req.body.id_klinik_layanan,
          tanggal: req.body.tanggal,
          harga_jual: req.body.harga_jual,
          jumlah_jual: req.body.jumlah_jual,
          is_active: 1,
        };

        req.body.tanggal === ''
          ? (data.tanggal = '1970-01-01')
          : req.body.tanggal;
        req.body.harga_jual === ''
          ? (data.harga_jual = 0)
          : req.body.harga_jual;
        req.body.jumlah_jual === ''
          ? (data.jumlah_jual = 0)
          : req.body.jumlah_jual;

        await editSalesLayanan(data);
        response(res, 200, true, data, 'edit sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit sales layanan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesLayanan],
      } = await findSalesLayananByIdSalesLayanan(id);

      if (findSalesLayanan) {
        let data = {
          id,
          is_active: 1,
        };

        await editSalesLayananActivate(data);
        response(res, 200, true, data, 'activate sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate sales layanan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesLayanan],
      } = await findSalesLayananByIdSalesLayanan(id);

      if (findSalesLayanan) {
        let data = {
          id,
          is_active: 0,
        };

        await editSalesLayananArchive(data);
        response(res, 200, true, data, 'archive sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive sales layanan failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesLayanan],
      } = await findSalesLayananByIdSalesLayanan(id);

      if (findSalesLayanan) {
        let data = {
          id,
        };

        await deleteSalesLayanan(data);
        response(res, 200, true, data, 'delete sales layanan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete sales layanan failed');
    }
  },
};

exports.salesLayananControllers = salesLayananControllers;
