const { response } = require(`../middleware/common`);
const {
  insertSalesPaket,
  allSalesPaket,
  countAllSalesPaket,
  getSalesPaketByIdSalesPaket,
  findSalesPaketByIdSalesPaket,
  getSalesPaketByIdSales,
  findSalesPaketByIdSales,
  getSalesPaketByIdKlinikPaket,
  findSalesPaketByIdKlinikPaket,
  editSalesPaket,
  editSalesPaketActivate,
  editSalesPaketArchive,
  deleteSalesPaket,
} = require(`../models/salesPaket.js`);
const { v4: uuidv4 } = require('uuid');

const salesPaketControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_sales: req.body.id_sales,
        id_klinik_paket: req.body.id_klinik_paket,
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
        await insertSalesPaket(data);
        response(res, 200, true, data, 'insert sales paket success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert sales paket failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNamaKlinikPaket = req.query.searchNamaKlinikPaket || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allSalesPaket({
        search,
        searchNamaKlinikPaket,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllSalesPaket(search, searchNamaKlinikPaket, searchStatus);

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
        'get sales paket success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales paket failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getSalesPaketByIdSalesPaket({
        id,
      });

      const {
        rows: [findSalesPaket],
      } = await findSalesPaketByIdSalesPaket(id);

      if (findSalesPaket) {
        response(res, 200, true, result.rows, 'get sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales paket failed');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getSalesPaketByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findSalesPaketByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get sales paket success');
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
      response(res, 404, false, error, 'get sales paket failed');
    }
  },
  getByIdKlinikPaket: async (req, res) => {
    try {
      const id_klinik_paket = req.params.id_klinik_paket;

      const result = await getSalesPaketByIdKlinikPaket({
        id_klinik_paket,
      });

      const {
        rows: [findKlinikPaket],
      } = await findSalesPaketByIdKlinikPaket(id_klinik_paket);

      if (findKlinikPaket) {
        response(res, 200, true, result.rows, 'get sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik paket (${id_klinik_paket}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get sales paket failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesPaket],
      } = await findSalesPaketByIdSalesPaket(id);

      if (findSalesPaket) {
        let data = {
          id,
          id_sales: req.body.id_sales,
          id_klinik_paket: req.body.id_klinik_paket,
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

        await editSalesPaket(data);
        response(res, 200, true, data, 'edit sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit sales paket failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesPaket],
      } = await findSalesPaketByIdSalesPaket(id);

      if (findSalesPaket) {
        let data = {
          id,
          is_active: 1,
        };

        await editSalesPaketActivate(data);
        response(res, 200, true, data, 'activate sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate sales paket failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesPaket],
      } = await findSalesPaketByIdSalesPaket(id);

      if (findSalesPaket) {
        let data = {
          id,
          is_active: 0,
        };

        await editSalesPaketArchive(data);
        response(res, 200, true, data, 'archive sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive sales paket failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findSalesPaket],
      } = await findSalesPaketByIdSalesPaket(id);

      if (findSalesPaket) {
        let data = {
          id,
        };

        await deleteSalesPaket(data);
        response(res, 200, true, data, 'delete sales paket success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete sales paket failed');
    }
  },
};

exports.salesPaketControllers = salesPaketControllers;
