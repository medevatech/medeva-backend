const { response } = require(`../middleware/common`);
const {
  insertKlinikStokObat,
  allKlinikStokObat,
  countAllKlinikStokObat,
  getKlinikStokObatByIdKlinikStokObat,
  findKlinikStokObatByIdKlinikStokObat,
  getKlinikStokObatByIdKlinikPurchasingObat,
  findKlinikStokObatByIdKlinikPurchasingObat,
  getKlinikStokObatByIdKlinikObat,
  findKlinikStokObatByIdKlinikObat,
  editKlinikStokObat,
  editKlinikStokObatActivate,
  editKlinikStokObatArchive,
  deleteKlinikStokObat,
} = require(`../models/klinikStokObat.js`);
const { v4: uuidv4 } = require('uuid');

const klinikStokObatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_purchasing_obat: req.body.id_klinik_purchasing_obat,
        id_klinik_obat: req.body.id_klinik_obat,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik_purchasing_obat' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikStokObat(data);
        response(res, 200, true, data, 'insert klinik stok obat success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik stok obat failed');
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

      const result = await allKlinikStokObat({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikStokObat(search, searchStatus);

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
        'get klinik stok obat success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik stok obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikStokObatByIdKlinikStokObat({
        id,
      });

      const {
        rows: [findKlinikStokObat],
      } = await findKlinikStokObatByIdKlinikStokObat(id);

      if (findKlinikStokObat) {
        response(res, 200, true, result.rows, 'get klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik stok obat failed');
    }
  },
  getByIdKlinikPurchasingObat: async (req, res) => {
    try {
      const id_klinik_purchasing_obat = req.params.id_klinik_purchasing_obat;

      const result = await getKlinikStokObatByIdKlinikPurchasingObat({
        id_klinik_purchasing_obat,
      });

      const {
        rows: [findKlinikPurchasingObat],
      } = await findKlinikStokObatByIdKlinikPurchasingObat(
        id_klinik_purchasing_obat
      );

      if (findKlinikPurchasingObat) {
        response(res, 200, true, result.rows, 'get klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik purchasing obat (${id_klinik_purchasing_obat}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik stok obat failed');
    }
  },
  getByIdKlinikObat: async (req, res) => {
    try {
      const id_klinik_obat = req.params.id_klinik_obat;

      const result = await getKlinikStokObatByIdKlinikObat({
        id_klinik_obat,
      });

      const {
        rows: [findKlinikObat],
      } = await findKlinikStokObatByIdKlinikObat(id_klinik_obat);

      if (findKlinikObat) {
        response(res, 200, true, result.rows, 'get klinik stok obat success');
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
      response(res, 404, false, error, 'get klinik stok obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokObat],
      } = await findKlinikStokObatByIdKlinikStokObat(id);

      if (findKlinikStokObat) {
        let data = {
          id,
          id_klinik_purchasing_obat: req.body.id_klinik_purchasing_obat,
          id_klinik_obat: req.body.id_klinik_obat,
          is_active: 1,
        };

        await editKlinikStokObat(data);
        response(res, 200, true, data, 'edit klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik stok obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokObat],
      } = await findKlinikStokObatByIdKlinikStokObat(id);

      if (findKlinikStokObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikStokObatActivate(data);
        response(res, 200, true, data, 'activate klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik stok obat failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokObat],
      } = await findKlinikStokObatByIdKlinikStokObat(id);

      if (findKlinikStokObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikStokObatArchive(data);
        response(res, 200, true, data, 'archive klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik stok obat failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikStokObat],
      } = await findKlinikStokObatByIdKlinikStokObat(id);

      if (findKlinikStokObat) {
        let data = {
          id,
        };

        await deleteKlinikStokObat(data);
        response(res, 200, true, data, 'delete klinik stok obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik stok obat (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik stok obat failed');
    }
  },
};

exports.klinikStokObatControllers = klinikStokObatControllers;
