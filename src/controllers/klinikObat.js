const { response } = require(`../middleware/common`);
const {
  insertKlinikObat,
  allKlinikObat,
  countAllKlinikObat,
  getKlinikObatByIdKlinikObat,
  findKlinikObatByIdKlinikObat,
  getKlinikObatByIdKlinik,
  findKlinikObatByIdKlinik,
  getKlinikObatByIdObat,
  findKlinikObatByIdObat,
  editKlinikObat,
  editKlinikObatActivate,
  editKlinikObatArchive,
  deleteKlinikObat,
} = require(`../models/klinikObat.js`);
const { v4: uuidv4 } = require('uuid');

const klinikObatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_obat: req.body.id_obat,
        harga_jual: req.body.harga_jual,
        is_active: 1,
      };

      if (req.body.harga_jual === '') {
        data.besar_klaim = 0;
      }

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_klinik' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlinikObat(data);
        response(res, 200, true, data, 'insert klinik obat success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik obat failed');
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
      const searchNamaObat = req.query.searchNamaObat || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKlinikObat({
        search,
        searchNamaKlinik,
        searchNamaObat,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikObat(
        search,
        searchNamaKlinik,
        searchNamaObat,
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
        'get klinik obat success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikObatByIdKlinikObat({
        id,
      });

      const {
        rows: [findKlinikObat],
      } = await findKlinikObatByIdKlinikObat(id);

      if (findKlinikObat) {
        response(res, 200, true, result.rows, 'get klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik obat failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getKlinikObatByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findKlinikObatByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get klinik obat success');
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
      response(res, 404, false, error, 'get klinik obat failed');
    }
  },
  getByIdObat: async (req, res) => {
    try {
      const id_obat = req.params.id_obat;

      const result = await getKlinikObatByIdObat({
        id_obat,
      });

      const {
        rows: [findObat],
      } = await findKlinikObatByIdObat(id_obat);

      if (findObat) {
        response(res, 200, true, result.rows, 'get klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id obat ${id_obat} kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikObat],
      } = await findKlinikObatByIdKlinikObat(id);

      if (findKlinikObat) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          id_obat: req.body.id_obat,
          harga_jual: req.body.harga_jual,
          is_active: 1,
        };

        await editKlinikObat(data);
        response(res, 200, true, data, 'edit klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikObat],
      } = await findKlinikObatByIdKlinikObat(id);

      if (findKlinikObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikObatActivate(data);
        response(res, 200, true, data, 'activate klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik obat failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikObat],
      } = await findKlinikObatByIdKlinikObat(id);

      if (findKlinikObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikObatArchive(data);
        response(res, 200, true, data, 'archive klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik obat failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikObat],
      } = await findKlinikObatByIdKlinikObat(id);

      if (findKlinikObat) {
        let data = {
          id,
        };

        await deleteKlinikObat(data);
        response(res, 200, true, data, 'delete klinik obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik obat failed');
    }
  },
};

exports.klinikObatControllers = klinikObatControllers;
