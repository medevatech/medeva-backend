const { response } = require(`../middleware/common`);
const {
  insertPemakaianBHP,
  allPemakaianBHP,
  countAllPemakaianBHP,
  getPemakaianBHPByIdPemakaianBHP,
  findPemakaianBHPByIdPemakaianBHP,
  getPemakaianBHPByIdKlinikBHP,
  findPemakaianBHPByIdKlinikBHP,
  getPemakaianBHPByIdSales,
  findPemakaianBHPByIdSales,
  getPemakaianBHPByIdSalesLayanan,
  findPemakaianBHPByIdSalesLayanan,
  getPemakaianBHPByIdSalesPaket,
  findPemakaianBHPByIdSalesPaket,
  editPemakaianBHP,
  editPemakaianBHPActivate,
  editPemakaianBHPArchive,
  deletePemakaianBHP,
} = require(`../models/pemakaian]BHP.js`);
const { v4: uuidv4 } = require('uuid');

const pemakaianBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_bhp: req.body.id_klinik_bhp,
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
      req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;
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
        await insertPemakaianBHP(data);
        response(res, 200, true, data, 'insert pemakaian bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pemakaian bhp failed');
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

      const result = await allPemakaianBHP({
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
      } = await countAllPemakaianBHP(search, searchNamaKlinikBHP, searchStatus);

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
        'get pemakaian bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPemakaianBHPByIdPemakaianBHP({
        id,
      });

      const {
        rows: [findPemakaianBHP],
      } = await findPemakaianBHPByIdPemakaianBHP(id);

      if (findPemakaianBHP) {
        response(res, 200, true, result.rows, 'get pemakaian bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  getByIdKlinikBHP: async (req, res) => {
    try {
      const id_klinik_bhp = req.params.id_klinik_bhp;

      const result = await getPemakaianBHPByIdKlinikBHP({
        id_klinik_bhp,
      });

      const {
        rows: [findKlinikBHP],
      } = await findPemakaianBHPByIdKlinikBHP(id_klinik_bhp);

      if (findKlinikBHP) {
        response(res, 200, true, result.rows, 'get pemakaian bhp success');
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
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getPemakaianBHPByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findPemakaianBHPByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get pemakaian bhp success');
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
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  getByIdSalesLayanan: async (req, res) => {
    try {
      const id_sales_layanan = req.params.id_sales_layanan;

      const result = await getPemakaianBHPByIdSalesLayanan({
        id_sales_layanan,
      });

      const {
        rows: [findSalesLayanan],
      } = await findPemakaianBHPByIdSalesLayanan(id_sales_layanan);

      if (findSalesLayanan) {
        response(res, 200, true, result.rows, 'get pemakaian bhp success');
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
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  getByIdSalesPaket: async (req, res) => {
    try {
      const id_sales_paket = req.params.id_sales_paket;

      const result = await getPemakaianBHPByIdSalesPaket({
        id_sales_paket,
      });

      const {
        rows: [findSalesPaket],
      } = await findPemakaianBHPByIdSalesPaket(id_sales_paket);

      if (findSalesPaket) {
        response(res, 200, true, result.rows, 'get pemakaian bhp success');
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
      response(res, 404, false, error, 'get pemakaian bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianBHP],
      } = await findPemakaianBHPByIdPemakaianBHP(id);

      if (findPemakaianBHP) {
        let data = {
          id,
          id_klinik_bhp: req.body.id_klinik_bhp,
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
        req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
        req.body.harga_jual === ''
          ? (data.harga_jual = 0)
          : req.body.harga_jual;
        req.body.jumlah_pakai === ''
          ? (data.jumlah_pakai = 0)
          : req.body.jumlah_pakai;

        await editPemakaianBHP(data);
        response(res, 200, true, data, 'edit pemakaian bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit pemakaian bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianBHP],
      } = await findPemakaianBHPByIdPemakaianBHP(id);

      if (findPemakaianBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editPemakaianBHPActivate(data);
        response(res, 200, true, data, 'activate pemakaian bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate pemakaian bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianBHP],
      } = await findPemakaianBHPByIdPemakaianBHP(id);

      if (findPemakaianBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editPemakaianBHPArchive(data);
        response(res, 200, true, data, 'archive pemakaian bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive pemakaian bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianBHP],
      } = await findPemakaianBHPByIdPemakaianBHP(id);

      if (findPemakaianBHP) {
        let data = {
          id,
        };

        await deletePemakaianBHP(data);
        response(res, 200, true, data, 'delete pemakaian bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pemakaian bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete pemakaian bhp failed');
    }
  },
};

exports.pemakaianBHPControllers = pemakaianBHPControllers;
