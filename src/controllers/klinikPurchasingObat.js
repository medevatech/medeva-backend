const { response } = require(`../middleware/common`);
const {
  insertKlinikPurchasingObat,
  allKlinikPurchasingObat,
  countAllKlinikPurchasingObat,
  getKlinikPurchasingObatByIdKlinikPurchasingObat,
  findKlinikPurchasingObatByIdKlinikPurchasingObat,
  getKlinikPurchasingObatByIdPurchase,
  findKlinikPurchasingObatByIdPurchase,
  getKlinikPurchasingObatByIdKlinikObat,
  findKlinikPurchasingObatByIdKlinikObat,
  editKlinikPurchasingObat,
  editKlinikPurchasingObatActivate,
  editKlinikPurchasingObatArchive,
  deleteKlinikPurchasingObat,
} = require(`../models/klinikPurchasingObat.js`);
const { v4: uuidv4 } = require('uuid');

const klinikPurchasingObatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_purchase: req.body.id_purchase,
        id_klinik_obat: req.body.id_klinik_obat,
        batch_num: req.body.batch_num,
        harga_beli: req.body.harga_beli,
        jumlah_beli: req.body.jumlah_beli,
        kadaluwarsa: req.body.kadaluwarsa,
        is_active: 1,
      };

      req.body.batch_num === '' ? (data.batch_num = '0') : req.body.batch_num;
      req.body.harga_beli === '' ? (data.harga_beli = 0) : req.body.harga_beli;
      req.body.jumlah_beli === ''
        ? (data.jumlah_beli = 0)
        : req.body.jumlah_beli;
      req.body.kadaluwarsa === ''
        ? (data.kadaluwarsa = '1970-01-01')
        : req.body.kadaluwarsa;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_purchase' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikPurchasingObat(data);
        response(res, 200, true, data, 'insert klinik purchasing obat success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik purchasing obat failed');
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

      const result = await allKlinikPurchasingObat({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikPurchasingObat(search, searchStatus);

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
        'get klinik purchasing obat success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik purchasing obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikPurchasingObatByIdKlinikPurchasingObat({
        id,
      });

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikPurchasingObatByIdKlinikPurchasingObat(id);

      if (findKlinikPurchasingObat) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing obat success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik purchasing obat failed');
    }
  },
  getByIdPurchase: async (req, res) => {
    try {
      const id_purchase = req.params.id_purchase;

      const result = await getKlinikPurchasingObatByIdPurchase({
        id_purchase,
      });

      const {
        rows: [findPurchase],
      } = await findKlinikPurchasingObatByIdPurchase(id_purchase);

      if (findPurchase) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing obat success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id_purchase}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik purchasing obat failed');
    }
  },
  getByIdKlinikObat: async (req, res) => {
    try {
      const id_klinik_obat = req.params.id_klinik_obat;

      const result = await getKlinikPurchasingObatByIdKlinikObat({
        id_klinik_obat,
      });

      const {
        rows: [findKlinikObat],
      } = await findKlinikPurchasingObatByIdKlinikObat(id_klinik_obat);

      if (findKlinikObat) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing obat success'
        );
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
      response(res, 404, false, error, 'get klinik purchasing obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikPurchasingObatByIdKlinikPurchasingObat(id);

      if (findKlinikPurchasingObat) {
        let data = {
          id,
          id_purchase: req.body.id_purchase,
          id_klinik_obat: req.body.id_klinik_obat,
          batch_num: req.body.batch_num,
          harga_beli: req.body.harga_beli,
          jumlah_beli: req.body.jumlah_beli,
          kadaluwarsa: req.body.kadaluwarsa,
          is_active: 1,
        };

        req.body.batch_num === '' ? (data.batch_num = '0') : req.body.batch_num;
        req.body.harga_beli === ''
          ? (data.harga_beli = 0)
          : req.body.harga_beli;
        req.body.jumlah_beli === ''
          ? (data.jumlah_beli = 0)
          : req.body.jumlah_beli;
        req.body.kadaluwarsa === ''
          ? (data.kadaluwarsa = '1970-01-01')
          : req.body.kadaluwarsa;

        await editKlinikPurchasingObat(data);
        response(res, 200, true, data, 'edit klinik purchasing obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik purchasing obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikPurchasingObatByIdKlinikPurchasingObat(id);

      if (findKlinikPurchasingObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikPurchasingObatActivate(data);
        response(
          res,
          200,
          true,
          data,
          'activate klinik purchasing obat success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(
        res,
        404,
        false,
        error,
        'activate klinik purchasing obat failed'
      );
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikPurchasingObatByIdKlinikPurchasingObat(id);

      if (findKlinikPurchasingObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikPurchasingObatArchive(data);
        response(
          res,
          200,
          true,
          data,
          'archive klinik purchasing obat success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik purchasing obat failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikPurchasingObatByIdKlinikPurchasingObat(id);

      if (findKlinikPurchasingObat) {
        let data = {
          id,
        };

        await deleteKlinikPurchasingObat(data);
        response(res, 200, true, data, 'delete klinik purchasing obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik purchasing obat failed');
    }
  },
};

exports.klinikPurchasingObatControllers = klinikPurchasingObatControllers;
