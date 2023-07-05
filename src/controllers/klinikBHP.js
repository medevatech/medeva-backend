const { response } = require(`../middleware/common`);
const {
  insertKlinikBHP,
  allKlinikBHP,
  countAllKlinikBHP,
  getKlinikBHPByIdKlinikBHP,
  findKlinikBHPByIdKlinikBHP,
  getKlinikBHPByIdKlinik,
  findKlinikBHPByIdKlinik,
  editKlinikBHP,
  editKlinikBHPActivate,
  editKlinikBHPArchive,
  deleteKlinikBHP,
} = require(`../models/klinikBHP.js`);
const { v4: uuidv4 } = require('uuid');

const klinikBHPControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        nama: req.body.nama,
        merk: req.body.merk,
        satuan: req.body.satuan,
        harga_jual: req.body.harga_jual,
        tipe: req.body.tipe,
        is_active: 1,
      };

      req.body.harga_jual === '' ? (data.harga_jual = 0) : req.body.harga_jual;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikBHP(data);
        response(res, 200, true, data, 'insert klinik bhp success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik bhp failed');
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
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKlinikBHP({
        search,
        searchNamaKlinik,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikBHP(search, searchNamaKlinik, searchStatus);

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
        'get klinik bhp success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik bhp failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikBHPByIdKlinikBHP({
        id,
      });

      const {
        rows: [findKlinikBHP],
      } = await findKlinikBHPByIdKlinikBHP(id);

      if (findKlinikBHP) {
        response(res, 200, true, result.rows, 'get klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik bhp not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik bhp failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getKlinikBHPByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findKlinikBHPByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik ${id_klinik} not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik bhp failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikBHP],
      } = await findKlinikBHPByIdKlinikBHP(id);

      if (findKlinikBHP) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          nama: req.body.nama,
          merk: req.body.merk,
          satuan: req.body.satuan,
          harga_jual: req.body.harga_jual,
          tipe: req.body.tipe,
          is_active: 1,
        };

        await editKlinikBHP(data);
        response(res, 200, true, data, 'edit klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik ${id} bhp not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik bhp failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikBHP],
      } = await findKlinikBHPByIdKlinikBHP(id);

      if (findKlinikBHP) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikBHPActivate(data);
        response(res, 200, true, data, 'activate klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik bhp not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik bhp failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikBHP],
      } = await findKlinikBHPByIdKlinikBHP(id);

      if (findKlinikBHP) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikBHPArchive(data);
        response(res, 200, true, data, 'archive klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik bhp not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik bhp failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikBHP],
      } = await findKlinikBHPByIdKlinikBHP(id);

      if (findKlinikBHP) {
        let data = {
          id,
        };

        await deleteKlinikBHP(data);
        response(res, 200, true, data, 'delete klinik bhp success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik bhp not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik bhp failed');
    }
  },
};

exports.klinikBHPControllers = klinikBHPControllers;
