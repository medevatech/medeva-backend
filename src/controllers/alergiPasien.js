const { response } = require(`../middleware/common`);
const {
  insertAlergiPasien,
  allAlergiPasien,
  countAllAlergiPasien,
  getAlergiPasienByIdAlergiPasien,
  findAlergiPasienByIdAlergiPasien,
  getAlergiPasienByIdPasien,
  findAlergiPasienByIdPasien,
  editAlergiPasien,
  editAlergiPasienActiveArchive,
  deleteAlergiPasien,
} = require(`../models/alergiPasien`);
const { v4: uuidv4 } = require('uuid');

const alergiPasienControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        id_alergi: req.body.id_alergi,
        tanggal_kunjungan_dicatat: req.body.tanggal_kunjungan_dicatat,
        tanggal_kunjungan_dihapus: req.body.tanggal_kunjungan_dihapus,
        is_active: 1,
      };

      if (data.id_alergi == '') {
        response(res, 200, true, data, 'insert alergi pasien id_alergi null');
      } else {
        await insertAlergiPasien(data);
        response(res, 200, true, data, 'insert alergi pasien success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert alergi pasien failed');
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
      const searchPasien = req.query.searchPasien || '';
      const searchAlergi = req.query.searchAlergi || '';
      const offset = (page - 1) * limit;

      const result = await allAlergiPasien({
        search,
        searchStatus,
        searchPasien,
        searchAlergi,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAlergiPasien(
        search,
        searchStatus,
        searchPasien,
        searchAlergi
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
        'get alergi pasien success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi pasien failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getAlergiPasienByIdAlergiPasien({
        id,
      });

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdAlergiPasien(id);

      if (findAlergiPasien) {
        response(res, 200, true, result.rows, 'get alergi pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi pasien failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getAlergiPasienByIdPasien({
        id_pasien,
      });

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdPasien(id_pasien);

      if (findAlergiPasien) {
        response(res, 200, true, result.rows, 'get alergi pasien success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get alergi pasien failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdAlergiPasien(id);

      if (findAlergiPasien) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          id_alergi: req.body.id_alergi,
          tanggal_kunjungan_dicatat: req.body.tanggal_kunjungan_dicatat,
          tanggal_kunjungan_dihapus: req.body.tanggal_kunjungan_dihapus,
        };

        if (data.id_alergi == '') {
          console.log('check');
          response(res, 200, true, data, 'delete alergi pasien success');
          await deleteAlergiPasien(data);
        } else {
          await editAlergiPasien(data);
          response(res, 200, true, data, 'edit alergi pasien success');
        }
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id alergi pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit alergi pasien failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdAlergiPasien(id);

      if (findAlergiPasien) {
        let data = {
          id,
          is_active: 1,
        };

        await editAlergiPasienActiveArchive(data);
        response(res, 200, true, data, 'activate alergi pasien success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id alergi pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active alergi pasien failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdAlergiPasien(id);

      if (findAlergiPasien) {
        let data = {
          id,
          is_active: 0,
        };

        await editAlergiPasienActiveArchive(data);
        response(res, 200, true, data, 'archive alergi pasien success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id alergi pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive alergi pasien failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienByIdAlergiPasien(id);

      if (findAlergiPasien) {
        let data = {
          id,
        };

        await deleteAlergiPasien(data);
        response(res, 200, true, data, 'delete alergi pasien success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id alergi pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete alergi pasien failed');
    }
  },
};

exports.alergiPasienControllers = alergiPasienControllers;
