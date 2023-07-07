const { response } = require(`../middleware/common`);
const {
  insertKlinikPasien,
  allKlinikPasien,
  countAllKlinikPasien,
  getKlinikPasienByIdKlinikPasien,
  findKlinikPasienByIdKlinikPasien,
  getKlinikPasienByIdKlinik,
  findKlinikPasienByIdKlinik,
  getKlinikPasienByIdPasien,
  findKlinikPasienByIdPasien,
  editKlinikPasien,
  editKlinikPasienActivate,
  editKlinikPasienArchive,
  deleteKlinikPasien,
} = require(`../models/klinikPasien.js`);
const { v4: uuidv4 } = require('uuid');

const klinikPasienControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_pasien: req.body.id_pasien,
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
        await insertKlinikPasien(data);
        response(res, 200, true, data, 'insert klinik pasien success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klinik pasien failed');
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
      const searchNamaPasien = req.query.searchNamaPasien || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKlinikPasien({
        search,
        searchNamaKlinik,
        searchNamaPasien,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlinikPasien(
        search,
        searchNamaKlinik,
        searchNamaPasien,
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
        'get klinik pasien success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik pasien failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlinikPasienByIdKlinikPasien({
        id,
      });

      const {
        rows: [findKlinikPasien],
      } = await findKlinikPasienByIdKlinikPasien(id);

      if (findKlinikPasien) {
        response(res, 200, true, result.rows, 'get klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik pasien (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik pasien failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getKlinikPasienByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findKlinikPasienByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get klinik pasien success');
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
      response(res, 404, false, error, 'get klinik pasien failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getKlinikPasienByIdPasien({
        id_pasien,
      });

      const {
        rows: [findPasien],
      } = await findKlinikPasienByIdPasien(id_pasien);

      if (findPasien) {
        response(res, 200, true, result.rows, 'get klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik layanan (${id_pasien}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klinik pasien failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPasien],
      } = await findKlinikPasienByIdKlinikPasien(id);

      if (findKlinikPasien) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          id_pasien: req.body.id_pasien,
          is_active: 1,
        };

        await editKlinikPasien(data);
        response(res, 200, true, data, 'edit klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik pasien (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klinik pasien failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPasien],
      } = await findKlinikPasienByIdKlinikPasien(id);

      if (findKlinikPasien) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlinikPasienActivate(data);
        response(res, 200, true, data, 'activate klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik pasien (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klinik pasien failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPasien],
      } = await findKlinikPasienByIdKlinikPasien(id);

      if (findKlinikPasien) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlinikPasienArchive(data);
        response(res, 200, true, data, 'archive klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik pasien (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klinik pasien failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlinikPasien],
      } = await findKlinikPasienByIdKlinikPasien(id);

      if (findKlinikPasien) {
        let data = {
          id,
        };

        await deleteKlinikPasien(data);
        response(res, 200, true, data, 'delete klinik pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik pasien (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klinik pasien failed');
    }
  },
};

exports.klinikPasienControllers = klinikPasienControllers;
