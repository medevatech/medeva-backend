const { response } = require(`../middleware/common`);
const {
  insertTerdaftar,
  allTerdaftar,
  countAllTerdaftar,
  getTerdaftarByIdTerdaftar,
  findTerdaftarByIdTerdaftar,
  getTerdaftarByIdPasien,
  findTerdaftarByIdPasien,
  getTerdaftarByIdKlinik,
  findTerdaftarByIdKlinik,
  editTerdaftar,
  editTerdaftarActivate,
  editTerdaftarArchive,
  deleteTerdaftar,
} = require(`../models/terdaftar.js`);
const { v4: uuidv4 } = require('uuid');

const terdaftarControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        id_klinik: req.body.id_klinik,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_pasien' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertTerdaftar(data);
        response(res, 200, true, data, 'insert terdaftar success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert terdaftar failed');
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

      const result = await allTerdaftar({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllTerdaftar(search, searchStatus);

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
        'get terdaftar success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get terdaftar failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getTerdaftarByIdTerdaftar({
        id,
      });

      const {
        rows: [findTerdaftar],
      } = await findTerdaftarByIdTerdaftar(id);

      if (findTerdaftar) {
        response(res, 200, true, result.rows, 'get terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id terdaftar (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get terdaftar failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getTerdaftarByIdPasien({
        id_pasien,
      });

      const {
        rows: [findPasien],
      } = await findTerdaftarByIdPasien(id_pasien);

      if (findPasien) {
        response(res, 200, true, result.rows, 'get terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pasien (${id_pasien}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get terdaftar failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getTerdaftarByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findTerdaftarByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get terdaftar success');
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
      response(res, 404, false, error, 'get terdaftar failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTerdaftar],
      } = await findTerdaftarByIdTerdaftar(id);

      if (findTerdaftar) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          id_klinik: req.body.id_klinik,
          is_active: 1,
        };

        await editTerdaftar(data);
        response(res, 200, true, data, 'edit terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id terdaftar (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit terdaftar failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTerdaftar],
      } = await findTerdaftarByIdTerdaftar(id);

      if (findTerdaftar) {
        let data = {
          id,
          is_active: 1,
        };

        await editTerdaftarActivate(data);
        response(res, 200, true, data, 'activate terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id terdaftar (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate terdaftar failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTerdaftar],
      } = await findTerdaftarByIdTerdaftar(id);

      if (findTerdaftar) {
        let data = {
          id,
          is_active: 0,
        };

        await editTerdaftarArchive(data);
        response(res, 200, true, data, 'archive terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id terdaftar (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive terdaftar failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findTerdaftar],
      } = await findTerdaftarByIdTerdaftar(id);

      if (findTerdaftar) {
        let data = {
          id,
        };

        await deleteTerdaftar(data);
        response(res, 200, true, data, 'delete terdaftar success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id terdaftar (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete terdaftar failed');
    }
  },
};

exports.terdaftarControllers = terdaftarControllers;
