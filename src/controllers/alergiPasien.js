const { response } = require(`../middleware/common`);
const {
  insertAlergiPasien,
  allAlergiPasien,
  countAllAlergiPasien,
  getAlergiPasienById,
  findAlergiPasienById,
  editAlergiPasien,
} = require(`../models/alergiPasien`);
const { v4: uuidv4 } = require('uuid');

const alergiPasienControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        id_alergi: req.body.id_alergi,
        id_kunjungan_dicatat: req.body.id_kunjungan_dicatat,
        id_kunjungan_dihapus: req.body.id_kunjungan_dihapus,
      };

      await insertAlergiPasien(data);
      response(res, 200, true, data, 'insert alergi pasien success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert alergi pasien failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allAlergiPasien({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAlergiPasien();

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

      const result = await getAlergiPasienById({
        id,
      });

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienById(id);

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
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAlergiPasien],
      } = await findAlergiPasienById(id);

      if (findAlergiPasien) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          id_alergi: req.body.id_alergi,
          id_kunjungan_dicatat: req.body.id_kunjungan_dicatat,
          id_kunjungan_dihapus: req.body.id_kunjungan_dihapus,
        };

        await editAlergiPasien(data);
        response(res, 200, true, data, 'edit alergi pasien success');
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
};

exports.alergiPasienControllers = alergiPasienControllers;
