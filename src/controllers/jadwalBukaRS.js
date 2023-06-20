const { response } = require(`../middleware/common`);
const {
  insertJadwalBukaRS,
  allJadwalBukaRS,
  countAllJadwalBukaRS,
  getJadwalBukaRSByIdJadwalBukaRS,
  findJadwalBukaRSByIdJadwalBukaRS,
  editJadwalBukaRS,
  editJadwalBukaRSActiveArchive,
  deleteJadwalBukaRS,
} = require(`../models/jadwalBukaRS`);
const { v4: uuidv4 } = require('uuid');

const jadwalBukaRSControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_rs: req.body.id_rs,
        hari: req.body.hari,
        jam_buka: req.body.jam_buka,
        jam_tutup: req.body.jam_tutup,
        is_active: 1,
      };

      await insertJadwalBukaRS(data);
      response(res, 200, true, data, 'insert jadwal buka rs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert jadwal buka rs failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchRS = req.query.searchRS || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allJadwalBukaRS({
        search,
        searchRS,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllJadwalBukaRS(search, searchRS, searchStatus);

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
        'get jadwal buka rs success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get jadwal buka rs failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getJadwalBukaRSByIdJadwalBukaRS({
        id,
      });

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSByIdJadwalBukaRS(id);

      if (findJadwalBukaRS) {
        response(res, 200, true, result.rows, 'get jadwal buka rs success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id jadwal buka rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get jadwal buka rs failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSByIdJadwalBukaRS(id);

      if (findJadwalBukaRS) {
        let data = {
          id,
          id_rs: req.body.id_rs,
          hari: req.body.hari,
          jam_buka: req.body.jam_buka,
          jam_tutup: req.body.jam_tutup,
          is_active: 1,
        };

        await editJadwalBukaRS(data);
        response(res, 200, true, data, 'edit jadwal buka rs success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id jadwal buka rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit jadwal buka rs failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSByIdJadwalBukaRS(id);

      if (findJadwalBukaRS) {
        let data = {
          id,
          is_active: 1,
        };

        await editJadwalBukaRSActiveArchive(data);
        response(res, 200, true, data, 'activate jadwal buka rs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id jadwal buka rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active jadwal buka rs failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSByIdJadwalBukaRS(id);

      if (findJadwalBukaRS) {
        let data = {
          id,
          is_active: 0,
        };

        await editJadwalBukaRSActiveArchive(data);
        response(res, 200, true, data, 'archive jadwal buka rs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id jadwal buka rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive jadwal buka rs failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSByIdJadwalBukaRS(id);

      if (findJadwalBukaRS) {
        let data = {
          id,
        };

        await deleteJadwalBukaRS(data);
        response(res, 200, true, data, 'delete jadwal buka rs success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id jadwal buka rs not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete jadwal buka rs failed');
    }
  },
};

exports.jadwalBukaRSControllers = jadwalBukaRSControllers;
