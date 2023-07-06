const { response } = require(`../middleware/common`);
const {
  insertPaketBHP,
  allPaketBHP,
  countAllPaketBHP,
  getPaketBHPByIdPaketBHP,
  findPaketBHPByIdPaketBHP,
  getPaketBHPByIdKlinikBHP,
  findPaketBHPByIdKlinikBHP,
  getPaketBHPByIdKlinikPaket,
  findPaketBHPByIdKlinikPaket,
  editPaketBHP,
  editPaketBHPActivate,
  editPaketBHPArchive,
  deletePaketBHP,
} = require(`../models/paketBHP.js`);
const { v4: uuidv4 } = require('uuid');

const paketBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik_bhp: req.body.id_klinik_bhp,
        id_klinik_paket: req.body.id_klinik_paket,
        jumlah_pakai: req.body.jumlah_pakai,
        is_active: 1,
      };

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
        await insertPaketBHP(data);
        response(res, 200, true, data, 'insert paket bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert paket bhp failed');
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
      const searchNamaKlinikPaket = req.query.searchNamaKlinikPaket || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPaketBHP({
        search,
        searchNamaKlinikBHP,
        searchNamaKlinikPaket,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPaketBHP(
        search,
        searchNamaKlinikBHP,
        searchNamaKlinikPaket,
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
        'get paket bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get paket bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPaketBHPByIdPaketBHP({
        id,
      });

      const {
        rows: [findPaketBHP],
      } = await findPaketBHPByIdPaketBHP(id);

      if (findPaketBHP) {
        response(res, 200, true, result.rows, 'get paket bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id paket bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get paket bhp failed');
    }
  },
  getByIdKlinikBHP: async (req, res) => {
    try {
      const id_klinik_bhp = req.params.id_klinik_bhp;

      const result = await getPaketBHPByIdKlinikBHP({
        id_klinik_bhp,
      });

      const {
        rows: [findKlinikBHP],
      } = await findPaketBHPByIdKlinikBHP(id_klinik_bhp);

      if (findKlinikBHP) {
        response(res, 200, true, result.rows, 'get paket bhp success');
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
      response(res, 404, false, error, 'get paket bhp failed');
    }
  },
  getByIdKlinikPaket: async (req, res) => {
    try {
      const id_klinik_paket = req.params.id_klinik_paket;

      const result = await getPaketBHPByIdKlinikPaket({
        id_klinik_paket,
      });

      const {
        rows: [findKlinikPaket],
      } = await findPaketBHPByIdKlinikPaket(id_klinik_paket);

      if (findKlinikPaket) {
        response(res, 200, true, result.rows, 'get paket bhp success');
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
      response(res, 404, false, error, 'get paket bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPaketBHP],
      } = await findPaketBHPByIdPaketBHP(id);

      if (findPaketBHP) {
        let data = {
          id,
          id_klinik_bhp: req.body.id_klinik_bhp,
          id_klinik_paket: req.body.id_klinik_paket,
          jumlah_pakai: req.body.jumlah_pakai,
          is_active: 1,
        };

        req.body.jumlah_pakai === ''
          ? (data.jumlah_pakai = 0)
          : req.body.jumlah_pakai;

        await editPaketBHP(data);
        response(res, 200, true, data, 'edit paket bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id paket bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit paket bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPaketBHP],
      } = await findPaketBHPByIdPaketBHP(id);

      if (findPaketBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editPaketBHPActivate(data);
        response(res, 200, true, data, 'activate paket bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id paket bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate paket bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPaketBHP],
      } = await findPaketBHPByIdPaketBHP(id);

      if (findPaketBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editPaketBHPArchive(data);
        response(res, 200, true, data, 'archive paket bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id paket bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive paket bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPaketBHP],
      } = await findPaketBHPByIdPaketBHP(id);

      if (findPaketBHP) {
        let data = {
          id,
        };

        await deletePaketBHP(data);
        response(res, 200, true, data, 'delete paket bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id paket bhp (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete paket bhp failed');
    }
  },
};

exports.paketBHPControllers = paketBHPControllers;
