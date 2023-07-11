const { response } = require(`../middleware/common`);
const {
  insertSales,
  allSales,
  countAllSales,
  getSalesByIdSales,
  findSalesByIdSales,
  getSalesByIdPasien,
  findSalesByIdPasien,
  editSales,
  editSalesActivate,
  editSalesArchive,
  deleteSales,
} = require(`../models/sales.js`);
const { v4: uuidv4 } = require('uuid');

const salesControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        tanggal: req.body.tanggal,
        total_penjualan: req.body.total_penjualan,
        metode_pembayaran: req.body.metode_pembayaran,
        status_pembayaran: req.body.status_pembayaran,
        is_active: 1,
      };

      req.body.tanggal === ''
        ? (data.tanggal = '1970-01-01')
        : req.body.tanggal;
      req.body.total_penjualan === ''
        ? (data.total_penjualan = 0)
        : req.body.total_penjualan;
      req.body.status_pembayaran === ''
        ? (data.status_pembayaran = 'BELUM LUNAS')
        : req.body.status_pembayaran;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_pasien' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertSales(data);
        response(res, 200, true, data, 'insert sales success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert sales failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNamaPasien = req.query.searchNamaPasien || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allSales({
        search,
        searchNamaPasien,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllSales(search, searchNamaPasien, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get sales success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getSalesByIdSales({
        id,
      });

      const {
        rows: [findSales],
      } = await findSalesByIdSales(id);

      if (findSales) {
        response(res, 200, true, result.rows, 'get sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getSalesByIdPasien({
        id_pasien,
      });

      const {
        rows: [findPasien],
      } = await findSalesByIdPasien(id_pasien);

      if (findPasien) {
        response(res, 200, true, result.rows, 'get sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pasien (${id_pasien}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSales],
      } = await findSalesByIdSales(id);

      if (findSales) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          tanggal: req.body.tanggal,
          total_penjualan: req.body.total_penjualan,
          metode_pembayaran: req.body.metode_pembayaran,
          status_pembayaran: req.body.status_pembayaran,
          is_active: 1,
        };

        req.body.tanggal === ''
          ? (data.tanggal = '1970-01-01')
          : req.body.tanggal;
        req.body.total_penjualan === ''
          ? (data.total_penjualan = 0)
          : req.body.total_penjualan;
        req.body.status_pembayaran === ''
          ? (data.status_pembayaran = 'BELUM LUNAS')
          : req.body.status_pembayaran;

        await editSales(data);
        response(res, 200, true, data, 'edit sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit sales failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSales],
      } = await findSalesByIdSales(id);

      if (findSales) {
        let data = {
          id,
          is_active: 1,
        };

        await editSalesActivate(data);
        response(res, 200, true, data, 'activate sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate sales failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSales],
      } = await findSalesByIdSales(id);

      if (findSales) {
        let data = {
          id,
          is_active: 0,
        };

        await editSalesArchive(data);
        response(res, 200, true, data, 'archive sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive sales failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSales],
      } = await findSalesByIdSales(id);

      if (findSales) {
        let data = {
          id,
        };

        await deleteSales(data);
        response(res, 200, true, data, 'delete sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete sales failed');
    }
  },
};

exports.salesControllers = salesControllers;
