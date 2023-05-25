const { response } = require(`../middleware/common`);
const {
  insertAsuransiKelas,
  allAsuransiKelas,
  countAllAsuransiKelas,
  getAsuransiKelasByIdAsuransiKelas,
  findAsuransiKelasByIdAsuransiKelas,
  editAsuransiKelas,
  getAsuransiKelasByIdAsuransi,
  findAsuransiKelasByIdAsuransi,
  editAsuransiKelasActiveArchive,
  deleteAsuransiKelas,
} = require(`../models/asuransiKelas`);
const { v4: uuidv4 } = require('uuid');

const asuransiKelasControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_asuransi: req.body.id_asuransi,
        nama_kelas: req.body.nama_kelas,
        sistem: req.body.sistem,
        is_active: 1,
      };

      await insertAsuransiKelas(data);
      response(res, 200, true, data, 'insert asuransi kelas success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert asuransi kelas failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchAsuransi = req.query.searchAsuransi || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allAsuransiKelas({
        search,
        searchAsuransi,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllAsuransiKelas(search, searchAsuransi, searchStatus);

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
        'get asuransi kelas success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get asuransi kelas failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getAsuransiKelasByIdAsuransiKelas({
        id,
      });

      const {
        rows: [findAsuransiKelas],
      } = await findAsuransiKelasByIdAsuransiKelas(id);

      if (findAsuransiKelas) {
        response(res, 200, true, result.rows, 'get asuransi kelas success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get asuransi kelas failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAsuransiKelas],
      } = await findAsuransiKelasByIdAsuransiKelas(id);

      if (findAsuransiKelas) {
        let data = {
          id,
          id_asuransi: req.body.id_asuransi,
          nama_kelas: req.body.nama_kelas,
          sistem: req.body.sistem,
          is_active: 1,
        };

        await editAsuransiKelas(data);
        response(res, 200, true, data, 'edit asuransi kelas success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit asuransi kelas failed');
    }
  },
  getByIdAsuransi: async (req, res) => {
    try {
      const id_asuransi = req.params.id_asuransi;

      const result = await getAsuransiKelasByIdAsuransi({
        id_asuransi,
      });

      const {
        rows: [findAsuransi],
      } = await findAsuransiKelasByIdAsuransi(id_asuransi);

      if (findAsuransi) {
        response(res, 200, true, result.rows, 'get asuransi kelas success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get asuransi kelas failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAsuransiKelas],
      } = await findAsuransiKelasByIdAsuransiKelas(id);

      if (findAsuransiKelas) {
        let data = {
          id,
          is_active: 1,
        };

        await editAsuransiKelasActiveArchive(data);
        response(res, 200, true, data, 'activate asuransi kelas success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id asuransi kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active asuransi kelas failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findAsuransiKelas],
      } = await findAsuransiKelasByIdAsuransiKelas(id);

      if (findAsuransiKelas) {
        let data = {
          id,
          is_active: 0,
        };

        await editAsuransiKelasActiveArchive(data);
        response(res, 200, true, data, 'archive asuransi kelas success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id asuransi kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive asuransi kelas failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findAsuransiKelas],
      } = await findAsuransiKelasByIdAsuransiKelas(id);

      if (findAsuransiKelas) {
        let data = {
          id,
        };

        await deleteAsuransiKelas(data);
        response(res, 200, true, data, 'delete asuransi kelas success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id asuransi kelas not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete asuransi kelas failed');
    }
  },
};

exports.asuransiKelasControllers = asuransiKelasControllers;
