const { response } = require(`../middleware/common`);
const {
  insertPemakaianObat,
  allPemakaianObat,
  countAllPemakaianObat,
  getPemakaianObatByIdPemakaianObat,
  findPemakaianObatByIdPemakaianObat,
  getPemakaianObatByIdKlinikObat,
  findPemakaianObatByIdKlinikObat,
  getPemakaianObatByIdSales,
  findPemakaianObatByIdSales,
  getPemakaianObatByIdSalesLayanan,
  findPemakaianObatByIdSalesLayanan,
  getPemakaianObatByIdSalesPaket,
  findPemakaianObatByIdSalesPaket,
  editPemakaianObat,
  editPemakaianObatActivate,
  editPemakaianObatArchive,
  deletePemakaianObat,
} = require(`../models/pemakaianObat.js`);
const { v4: uuidv4 } = require('uuid');

const pemakaianObatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_obat: req.body.id_klinik_obat,
        id_sales: req.body.id_sales,
        id_sales_layanan: req.body.id_sales_layanan,
        id_sales_paket: req.body.id_sales_paket,
        tanggal: req.body.tanggal,
        batch_num: req.body.batch_num,
        harga_jual: req.body.harga_jual,
        jumlah_pakai: req.body.jumlah_pakai,
        is_active: 1,
      };

      req.body.tanggal === ''
        ? (data.tanggal = '1970-01-01')
        : req.body.tanggal;
      req.body.batch_num === ''
        ? (data.batch_num = 'A 000')
        : req.body.batch_num;
      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;
      req.body.jumlah_pakai === ''
        ? (data.jumlah_pakai = 0)
        : req.body.jumlah_pakai;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_obat' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPemakaianObat(data);
        response(res, 200, true, data, 'insert pemakaian obat success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pemakaian obat failed');
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

      const result = await allPemakaianObat({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemakaianObat(search, searchStatus);

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
        'get pemakaian obat success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPemakaianObatByIdPemakaianObat({
        id,
      });

      const {
        rows: [findPemakaianObat],
      } = await findPemakaianObatByIdPemakaianObat(id);

      if (findPemakaianObat) {
        response(res, 200, true, result.rows, 'get pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  getByIdKlinikObat: async (req, res) => {
    try {
      const id_klinik_obat = req.params.id_klinik_obat;

      const result = await getPemakaianObatByIdKlinikObat({
        id_klinik_obat,
      });

      const {
        rows: [findKlinikObat],
      } = await findPemakaianObatByIdKlinikObat(id_klinik_obat);

      if (findKlinikObat) {
        response(res, 200, true, result.rows, 'get pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat (${id_klinik_obat}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getPemakaianObatByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findPemakaianObatByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get pemakaian obat success');
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
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  getByIdSalesLayanan: async (req, res) => {
    try {
      const id_sales_layanan = req.params.id_sales_layanan;

      const result = await getPemakaianObatByIdSalesLayanan({
        id_sales_layanan,
      });

      const {
        rows: [findSalesLayanan],
      } = await findPemakaianObatByIdSalesLayanan(id_sales_layanan);

      if (findSalesLayanan) {
        response(res, 200, true, result.rows, 'get pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales layanan (${id_sales_layanan}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  getByIdSalesPaket: async (req, res) => {
    try {
      const id_sales_paket = req.params.id_sales_paket;

      const result = await getPemakaianObatByIdSalesPaket({
        id_sales_paket,
      });

      const {
        rows: [findSalesPaket],
      } = await findPemakaianObatByIdSalesPaket(id_sales_paket);

      if (findSalesPaket) {
        response(res, 200, true, result.rows, 'get pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales paket (${id_sales_paket}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianObat],
      } = await findPemakaianObatByIdPemakaianObat(id);

      if (findPemakaianObat) {
        let data = {
          id,
          id_klinik_obat: req.body.id_klinik_obat,
          id_sales: req.body.id_sales,
          id_sales_layanan: req.body.id_sales_layanan,
          id_sales_paket: req.body.id_sales_paket,
          tanggal: req.body.tanggal,
          batch_num: req.body.batch_num,
          harga_jual: req.body.harga_jual,
          jumlah_pakai: req.body.jumlah_pakai,
          is_active: 1,
        };

        req.body.tanggal === ''
          ? (data.tanggal = '1970-01-01')
          : req.body.tanggal;
        req.body.batch_num === ''
          ? (data.batch_num = 'A 000')
          : req.body.batch_num;
        req.body.harga_jual === ''
          ? (data.harga_jual = 0)
          : req.body.harga_jual;
        req.body.jumlah_pakai === ''
          ? (data.jumlah_pakai = 0)
          : req.body.jumlah_pakai;

        await editPemakaianObat(data);
        response(res, 200, true, data, 'edit pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit pemakaian obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianObat],
      } = await findPemakaianObatByIdPemakaianObat(id);

      if (findPemakaianObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editPemakaianObatActivate(data);
        response(res, 200, true, data, 'activate pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate pemakaian obat failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianObat],
      } = await findPemakaianObatByIdPemakaianObat(id);

      if (findPemakaianObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editPemakaianObatArchive(data);
        response(res, 200, true, data, 'archive pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive pemakaian obat failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianObat],
      } = await findPemakaianObatByIdPemakaianObat(id);

      if (findPemakaianObat) {
        let data = {
          id,
        };

        await deletePemakaianObat(data);
        response(res, 200, true, data, 'delete pemakaian obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete pemakaian obat failed');
    }
  },
};

exports.pemakaianObatControllers = pemakaianObatControllers;
