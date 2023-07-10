const { response } = require(`../middleware/common`);
const {
  insertKlinikPurchasingBHP,
  allKlinikPurchasingBHP,
  countAllKlinikPurchasingBHP,
  getKlinikPurchasingBHPByIdKlinikPurchasingBHP,
  findKlinikPurchasingBHPByIdKlinikPurchasingBHP,
  getKlinikPurchasingBHPByIdPurchase,
  findKlinikPurchasingBHPByIdPurchase,
  getKlinikPurchasingBHPByIdKlinikBHP,
  findKlinikPurchasingBHPByIdKlinikBHP,
  editKlinikPurchasingBHP,
  editKlinikPurchasingBHPActivate,
  editKlinikPurchasingBHPArchive,
  deleteKlinikPurchasingBHP,
} = require(`../models/klinikPurchasingBHP.js`);
const { v4: uuidv4 } = require('uuid');

const klinikPurchasingBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_purchase: req.body.id_purchase,
        id_klinik_bhp: req.body.id_klinik_bhp,
        batch_num: req.body.batch_num,
        harga_beli: req.body.harga_beli,
        jumlah_beli: req.body.jumlah_beli,
        kadaluwarsa: req.body.kadaluwarsa,
        is_active: 1,
      };

      req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
      req.body.harga_beli === '' ? (data.harga_beli = 0) : req.body.harga_beli;
      req.body.jumlah_beli === ''
        ? (data.jumlah_beli = 0)
        : req.body.jumlah_beli;
      req.body.kadaluwarsa === ''
        ? (data.kadaluwarsa = '1970-01-01')
        : req.body.kadaluwarsa;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_bhp' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikPurchasingBHP(data);
        response(res, 200, true, data, 'insert klinik purchasing bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik purchasing bhp failed');
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

      const result = await allKlinikPurchasingBHP({
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
      } = await countAllKlinikPurchasingBHP(
        search,
        searchNamaKlinikBHP,
        searchStatus
      );

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      console.log(result);
      response(
        res,
        200,
        true,
        result.rows,
        'get klinik purchasing bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik purchasing bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikPurchasingBHPByIdKlinikPurchasingBHP({
        id,
      });

      const {
        rows: [findKlinikPurchasingBHP],
      } = await findKlinikPurchasingBHPByIdKlinikPurchasingBHP(id);

      if (findKlinikPurchasingBHP) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing bhp success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik purchasing bhp failed');
    }
  },
  getByIdPurchase: async (req, res) => {
    try {
      const id_purchase = req.params.id_purchase;

      const result = await getKlinikPurchasingBHPByIdPurchase({
        id_purchase,
      });

      const {
        rows: [findPurchase],
      } = await findKlinikPurchasingBHPByIdPurchase(id_purchase);

      if (findPurchase) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing bhp success'
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
      response(res, 404, false, error, 'get klinik purchasing bhp failed');
    }
  },
  getByIdKlinikBHP: async (req, res) => {
    try {
      const id_klinik_bhp = req.params.id_klinik_bhp;

      const result = await getKlinikPurchasingBHPByIdKlinikBHP({
        id_klinik_bhp,
      });

      const {
        rows: [findKlinikBHP],
      } = await findKlinikPurchasingBHPByIdKlinikBHP(id_klinik_bhp);

      if (findKlinikBHP) {
        response(
          res,
          200,
          true,
          result.rows,
          'get klinik purchasing bhp success'
        );
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
      response(res, 404, false, error, 'get klinik purchasing bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingBHP],
      } = await findKlinikPurchasingBHPByIdKlinikPurchasingBHP(id);

      if (findKlinikPurchasingBHP) {
        let data = {
          id,
          id_purchase: req.body.id_purchase,
          id_klinik_bhp: req.body.id_klinik_bhp,
          batch_num: req.body.batch_num,
          harga_beli: req.body.harga_beli,
          jumlah_beli: req.body.jumlah_beli,
          kadaluwarsa: req.body.kadaluwarsa,
          is_active: 1,
        };

        req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
        req.body.harga_beli === ''
          ? (data.harga_beli = 0)
          : req.body.harga_beli;
        req.body.jumlah_beli === ''
          ? (data.jumlah_beli = 0)
          : req.body.jumlah_beli;
        req.body.kadaluwarsa === ''
          ? (data.kadaluwarsa = '1970-01-01')
          : req.body.kadaluwarsa;

        await editKlinikPurchasingBHP(data);
        response(res, 200, true, data, 'edit klinik purchasing bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik purchasing bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingBHP],
      } = await findKlinikPurchasingBHPByIdKlinikPurchasingBHP(id);

      if (findKlinikPurchasingBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikPurchasingBHPActivate(data);
        response(
          res,
          200,
          true,
          data,
          'activate klinik purchasing bhp success'
        );
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik purchasing bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingBHP],
      } = await findKlinikPurchasingBHPByIdKlinikPurchasingBHP(id);

      if (findKlinikPurchasingBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikPurchasingBHPArchive(data);
        response(res, 200, true, data, 'archive klinik purchasing bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik purchasing bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPurchasingBHP],
      } = await findKlinikPurchasingBHPByIdKlinikPurchasingBHP(id);

      if (findKlinikPurchasingBHP) {
        let data = {
          id,
        };

        await deleteKlinikPurchasingBHP(data);
        response(res, 200, true, data, 'delete klinik purchasing bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik purchasing bhp failed');
    }
  },
};

exports.klinikPurchasingBHPControllers = klinikPurchasingBHPControllers;
