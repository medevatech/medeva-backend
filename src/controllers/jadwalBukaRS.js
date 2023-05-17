const { response } = require(`../middleware/common`);
const {
  insertJadwalBukaRS,
  allJadwalBukaRS,
  countAllJadwalBukaRS,
  getJadwalBukaRSById,
  findJadwalBukaRSById,
  editJadwalBukaRS,
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
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allJadwalBukaRS({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllJadwalBukaRS();

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

      const result = await getJadwalBukaRSById({
        id,
      });

      const {
        rows: [findJadwalBukaRS],
      } = await findJadwalBukaRSById(id);

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
      } = await findJadwalBukaRSById(id);

      if (findJadwalBukaRS) {
        let data = {
          id,
          id_rs: req.body.id_rs,
          hari: req.body.hari,
          jam_buka: req.body.jam_buka,
          jam_tutup: req.body.jam_tutup,
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
};

exports.jadwalBukaRSControllers = jadwalBukaRSControllers;
