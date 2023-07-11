const { response } = require(`../middleware/common`);
const {
  insertPemakaianJasa,
  allPemakaianJasa,
  countAllPemakaianJasa,
  getPemakaianJasaByIdPemakaianJasa,
  findPemakaianJasaByIdPemakaianJasa,
  getPemakaianJasaByIdLayananJasa,
  findPemakaianJasaByIdLayananJasa,
  getPemakaianJasaByIdSales,
  findPemakaianJasaByIdSales,
  getPemakaianJasaByIdSalesLayanan,
  findPemakaianJasaByIdSalesLayanan,
  getPemakaianJasaByIdSalesPaket,
  findPemakaianJasaByIdSalesPaket,
  editPemakaianJasa,
  editPemakaianJasaActivate,
  editPemakaianJasaArchive,
  deletePemakaianJasa,
} = require(`../models/pemakaianJasa.js`);
const { v4: uuidv4 } = require('uuid');

const pemakaianJasaControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_layanan_jasa: req.body.id_layanan_jasa,
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
        if (key === 'id_layanan_jasa' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPemakaianJasa(data);
        response(res, 200, true, data, 'Tambah pemakaian jasa berhasil');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Tambah pemakaian jasa berhasil');
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

      const result = await allPemakaianJasa({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPemakaianJasa(search, searchStatus);

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
        'Get data pemakaian jasa berhasil',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Get data pemakaian jasa gagal');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPemakaianJasaByIdPemakaianJasa({
        id,
      });

      const {
        rows: [findPemakaianJasa],
      } = await findPemakaianJasaByIdPemakaianJasa(id);

      if (findPemakaianJasa) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data pemakaian jasa berdasarkan id berhasil'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id (${id}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'Get data pemakaian jasa berdasarkan id gagal'
      );
    }
  },
  getByIdLayananJasa: async (req, res) => {
    try {
      const id_layanan_jasa = req.params.id_layanan_jasa;

      const result = await getPemakaianJasaByIdLayananJasa({
        id_layanan_jasa,
      });

      const {
        rows: [findLayananJasa],
      } = await findPemakaianJasaByIdLayananJasa(id_layanan_jasa);

      if (findLayananJasa) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data pemakaian jasa berdasarkan id berhasil'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_layanan_jasa (${id_layanan_jasa}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'Get data pemakaian jasa berdasarkan id gagal'
      );
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getPemakaianJasaByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findPemakaianJasaByIdSales(id_sales);

      if (findSales) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data pemakaian jasa berdasarkan id berhasil'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_sales (${id_sales}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'Get data pemakaian jasa berdasarkan id gagal'
      );
    }
  },
  getByIdSalesLayanan: async (req, res) => {
    try {
      const id_sales_layanan = req.params.id_sales_layanan;

      const result = await getPemakaianJasaByIdSalesLayanan({
        id_sales_layanan,
      });

      const {
        rows: [findSalesLayanan],
      } = await findPemakaianJasaByIdSalesLayanan(id_sales_layanan);

      if (findSalesLayanan) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data pemakaian jasa berdasarkan id berhasil'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_sales_layanan (${id_sales_layanan}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'Get data pemakaian jasa berdasarkan id gagal'
      );
    }
  },
  getByIdSalesPaket: async (req, res) => {
    try {
      const id_sales_paket = req.params.id_sales_paket;

      const result = await getPemakaianJasaByIdSalesPaket({
        id_sales_paket,
      });

      const {
        rows: [findSalesPaket],
      } = await findPemakaianJasaByIdSalesPaket(id_sales_paket);

      if (findSalesPaket) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data pemakaian jasa berdasarkan id berhasil'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_sales_paket (${id_sales_paket}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'Get data pemakaian jasa berdasarkan id gagal'
      );
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianJasa],
      } = await findPemakaianJasaByIdPemakaianJasa(id);

      if (findPemakaianJasa) {
        let data = {
          id: uuidv4(),
          id_layanan_jasa: req.body.id_layanan_jasa,
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

        await editPemakaianJasa(data);
        response(res, 200, true, data, 'Update data pemeriksaan jasa berhasil');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id (${id}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Update data pemakaian jasa gagal');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianJasa],
      } = await findPemakaianJasaByIdPemakaianJasa(id);

      if (findPemakaianJasa) {
        let data = {
          id,
          is_active: 1,
        };

        await editPemakaianJasaActivate(data);
        response(res, 200, true, data, 'Aktivasi pemakaian jasa berhasil');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id (${id}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Aktivasi pemakaian jasa gagal');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianJasa],
      } = await findPemakaianJasaByIdPemakaianJasa(id);

      if (findPemakaianJasa) {
        let data = {
          id,
          is_active: 0,
        };

        await editPemakaianJasaArchive(data);
        response(res, 200, true, data, 'Arsip pemakaian jasa berhasil');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id (${id}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Arsip pemakaian jasa gagal');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPemakaianJasa],
      } = await findPemakaianJasaByIdPemakaianJasa(id);

      if (findPemakaianJasa) {
        let data = {
          id,
        };

        await deletePemakaianJasa(data);
        response(res, 200, true, data, 'Hapus pemakaian jasa berhasil');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id (${id}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Hapus pemakaian jasa gagal');
    }
  },
};

exports.pemakaianJasaControllers = pemakaianJasaControllers;
