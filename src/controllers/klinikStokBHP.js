const { response } = require(`../middleware/common`);
const {
  insertKlinikStokBHP,
  allKlinikStokBHP,
  countAllKlinikStokBHP,
  getKlinikStokBHPByIdKlinikStokBHP,
  findKlinikStokBHPByIdKlinikStokBHP,
  getKlinikStokBHPByIdPurchase,
  findKlinikStokBHPByIdPurchase,
  getKlinikStokBHPByIdKlinikBHP,
  findKlinikStokBHPByIdKlinikBHP,
  editKlinikStokBHP,
  editKlinikStokBHPActivate,
  editKlinikStokBHPArchive,
  deleteKlinikStokBHP,
} = require(`../models/klinikStokBHP.js`);
const { v4: uuidv4 } = require('uuid');

const klinikStokBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_purchase: req.body.id_purchase,
        id_klinik_bhp: req.body.id_klinik_bhp,
        nama: req.body.nama,
        batch_num: req.body.batch_num,
        jumlah_stok: req.body.jumlah_stok,
        satuan_stok: req.body.satuan_stok,
        is_active: 1,
      };

      req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
      req.body.jumlah_stok === ''
        ? (data.jumlah_stok = 0)
        : req.body.jumlah_stok;
      req.body.satuan_stok === ''
        ? (data.satuan_stok = 0)
        : req.body.satuan_stok;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_bhp' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikStokBHP(data);
        response(res, 200, true, data, 'insert klinik stok bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik stok bhp failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNama = req.query.searchNama || '';
      const searchNamaKlinikBHP = req.query.searchNamaKlinikBHP || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKlinikStokBHP({
        search,
        searchNama,
        searchNamaKlinikBHP,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikStokBHP(
        search,
        searchNama,
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

      response(
        res,
        200,
        true,
        result.rows,
        'get klinik stok bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik stok bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikStokBHPByIdKlinikStokBHP({
        id,
      });

      const {
        rows: [findKlinikStokBHP],
      } = await findKlinikStokBHPByIdKlinikStokBHP(id);

      if (findKlinikStokBHP) {
        response(res, 200, true, result.rows, 'get klinik stok bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik stok bhp failed');
    }
  },
  getByIdPurchase: async (req, res) => {
    try {
      const id_purchase = req.params.id_purchase;

      const result = await getKlinikStokBHPByIdPurchase({
        id_purchase,
      });

      const {
        rows: [findPurchase],
      } = await findKlinikStokBHPByIdPurchase(id_purchase);

      if (findPurchase) {
        response(res, 200, true, result.rows, 'get klinik stok bhp success');
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
      response(res, 404, false, error, 'get klinik stok bhp failed');
    }
  },
  getByIdKlinikBHP: async (req, res) => {
    try {
      const id_klinik_bhp = req.params.id_klinik_bhp;

      const result = await getKlinikStokBHPByIdKlinikBHP({
        id_klinik_bhp,
      });

      const {
        rows: [findKlinikBHP],
      } = await findKlinikStokBHPByIdKlinikBHP(id_klinik_bhp);

      if (findKlinikBHP) {
        response(res, 200, true, result.rows, 'get klinik stok bhp success');
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
      response(res, 404, false, error, 'get klinik stok bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokBHP],
      } = await findKlinikStokBHPByIdKlinikStokBHP(id);

      if (findKlinikStokBHP) {
        let data = {
          id_purchase: req.body.id_purchase,
          id_klinik_bhp: req.body.id_klinik_bhp,
          nama: req.body.nama,
          batch_num: req.body.batch_num,
          jumlah_stok: req.body.jumlah_stok,
          satuan_stok: req.body.satuan_stok,
          is_active: 1,
        };

        req.body.batch_num === '' ? (data.batch_num = 0) : req.body.batch_num;
        req.body.jumlah_stok === ''
          ? (data.jumlah_stok = 0)
          : req.body.jumlah_stok;
        req.body.satuan_stok === ''
          ? (data.satuan_stok = 0)
          : req.body.satuan_stok;

        await editKlinikStokBHP(data);
        response(res, 200, true, data, 'edit klinik stok bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik stok bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokBHP],
      } = await findKlinikStokBHPByIdKlinikStokBHP(id);

      if (findKlinikStokBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikStokBHPActivate(data);
        response(res, 200, true, data, 'activate klinik stok bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik stok bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokBHP],
      } = await findKlinikStokBHPByIdKlinikStokBHP(id);

      if (findKlinikStokBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikStokBHPArchive(data);
        response(res, 200, true, data, 'archive klinik stok bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik stok bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokBHP],
      } = await findKlinikStokBHPByIdKlinikStokBHP(id);

      if (findKlinikStokBHP) {
        let data = {
          id,
        };

        await deleteKlinikStokBHP(data);
        response(res, 200, true, data, 'delete klinik stok bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik stok bhp failed');
    }
  },
};

exports.klinikStokBHPControllers = klinikStokBHPControllers;
