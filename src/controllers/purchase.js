const { response } = require(`../middleware/common`);
const {
  insertPurchase,
  allPurchase,
  countAllPurchase,
  getPurchaseByIdPurchase,
  findPurchaseByIdPurchase,
  getPurchaseByIdKlinik,
  findPurchaseByIdKlinik,
  getPurchaseByIdVendor,
  findPurchaseByIdVendor,
  editPurchase,
  editPurchaseActivate,
  editPurchaseArchive,
  deletePurchase,
} = require(`../models/purchase.js`);
const { v4: uuidv4 } = require('uuid');

const purchaseControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_vendor: req.body.id_vendor,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPurchase(data);
        response(res, 200, true, data, 'insert purchase success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert purchase failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchNamaKlinik = req.query.searchNamaKlinik || '';
      const searchNamaVendor = req.query.searchNamaVendor || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPurchase({
        search,
        searchNamaKlinik,
        searchNamaVendor,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPurchase(
        search,
        searchNamaKlinik,
        searchNamaVendor,
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

      response(res, 200, true, result.rows, 'get purchase success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get purchase failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPurchaseByIdPurchase({
        id,
      });

      const {
        rows: [findPurchase],
      } = await findPurchaseByIdPurchase(id);

      if (findPurchase) {
        response(res, 200, true, result.rows, 'get purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get purchase failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getPurchaseByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findPurchaseByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik (${id_klinik}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get purchase failed');
    }
  },
  getByIdVendor: async (req, res) => {
    try {
      const id_vendor = req.params.id_vendor;

      const result = await getPurchaseByIdVendor({
        id_vendor,
      });

      const {
        rows: [findVendor],
      } = await findPurchaseByIdVendor(id_vendor);

      if (findVendor) {
        response(res, 200, true, result.rows, 'get purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id_vendor}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get purchase failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPurchase],
      } = await findPurchaseByIdPurchase(id);

      if (findPurchase) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          id_vendor: req.body.id_vendor,
          is_active: 1,
        };

        await editPurchase(data);
        response(res, 200, true, data, 'edit purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit purchase failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPurchase],
      } = await findPurchaseByIdPurchase(id);

      if (findPurchase) {
        let data = {
          id,
          is_active: 1,
        };

        await editPurchaseActivate(data);
        response(res, 200, true, data, 'activate purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate purchase failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPurchase],
      } = await findPurchaseByIdPurchase(id);

      if (findPurchase) {
        let data = {
          id,
          is_active: 0,
        };

        await editPurchaseArchive(data);
        response(res, 200, true, data, 'archive purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive purchase failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPurchase],
      } = await findPurchaseByIdPurchase(id);

      if (findPurchase) {
        let data = {
          id,
        };

        await deletePurchase(data);
        response(res, 200, true, data, 'delete purchase success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id purchase (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete purchase failed');
    }
  },
};

exports.purchaseControllers = purchaseControllers;
