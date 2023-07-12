const { response } = require(`../middleware/common`);
const {
  insertKunjunganSales,
  allKunjunganSales,
  countAllKunjunganSales,
  getKunjunganSalesByIdKunjunganSales,
  findKunjunganSalesByIdKunjunganSales,
  getKunjunganSalesByIdKunjungan,
  findKunjunganSalesByIdKunjungan,
  getKunjunganSalesByIdSales,
  findKunjunganSalesByIdSales,
  editKunjunganSales,
  editKunjunganSalesActivate,
  editKunjunganSalesArchive,
  deleteKunjunganSales,
} = require(`../models/kunjunganSales.js`);
const { v4: uuidv4 } = require('uuid');

const kunjunganSalesControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_sales: req.body.id_sales,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_kunjungan' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKunjunganSales(data);
        response(res, 200, true, data, 'Tambah kunjungan sales berhasil');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Tambah kunjungan sales berhasil');
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

      const result = await allKunjunganSales({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKunjunganSales(search, searchStatus);

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
        'Get data kunjungan sales berhasil',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Get data kunjungan sales gagal');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKunjunganSalesByIdKunjunganSales({
        id,
      });

      const {
        rows: [findKunjunganSales],
      } = await findKunjunganSalesByIdKunjunganSales(id);

      if (findKunjunganSales) {
        response(
          res,
          200,
          true,
          result.rows,
          'Get data kunjungan sales berdasarkan id berhasil'
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
      response(res, 404, false, error, 'Get data kunjungan sales gagal');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getKunjunganSalesByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findKunjungan],
      } = await findKunjunganSalesByIdKunjungan(id_kunjungan);

      if (findKunjungan) {
        response(res, 200, true, result.rows, 'get kunjungan sales success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_kunjungan (${id_kunjungan}) tidak ditemukan, cek lagi`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'Get data kunjungan sales gagal');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getKunjunganSalesByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findKunjunganSalesByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get kunjungan sales success');
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
      response(res, 404, false, error, 'Get data kunjungan sales gagal');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjunganSales],
      } = await findKunjunganSalesByIdKunjunganSales(id);

      if (findKunjunganSales) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_sales: req.body.id_sales,
          is_active: 1,
        };

        await editKunjunganSales(data);
        response(res, 200, true, data, 'Update data kunjungan sales berhasil');
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
      response(res, 404, false, error, 'Update data kunjungan sales gagal');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjunganSales],
      } = await findKunjunganSalesByIdKunjunganSales(id);

      if (findKunjunganSales) {
        let data = {
          id,
          is_active: 1,
        };

        await editKunjunganSalesActivate(data);
        response(res, 200, true, data, 'Aktivasi kunjungan sales berhasil');
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
      response(res, 404, false, error, 'Aktivasi kunjungan sales gagal');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjunganSales],
      } = await findKunjunganSalesByIdKunjunganSales(id);

      if (findKunjunganSales) {
        let data = {
          id,
          is_active: 0,
        };

        await editKunjunganSalesArchive(data);
        response(res, 200, true, data, 'Arsip kunjungan sales berhasil');
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
      response(res, 404, false, error, 'Arsip kunjungan sales gagal');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjunganSales],
      } = await findKunjunganSalesByIdKunjunganSales(id);

      if (findKunjunganSales) {
        let data = {
          id,
        };

        await deleteKunjunganSales(data);
        response(res, 200, true, data, 'Hapus kunjungan sales berhasil');
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
      response(res, 404, false, error, 'Hapus kunjungan sales berhasil');
    }
  },
};

exports.kunjunganSalesControllers = kunjunganSalesControllers;
