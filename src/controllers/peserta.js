const { response } = require(`../middleware/common`);
const {
  insertPeserta,
  allPeserta,
  countAllPeserta,
  getPesertaById,
  findPesertaById,
  editPeserta,
} = require(`../models/peserta`);
const { v4: uuidv4 } = require('uuid');

const pesertaControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        id_asuransi: req.body.id_asuransi,
      };

      await insertPeserta(data);
      response(res, 200, true, data, 'insert peserta success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert peserta failed');
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

      const result = await allPeserta({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPeserta();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get peserta success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get peserta failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPesertaById({
        id,
      });

      const {
        rows: [findPeserta],
      } = await findPesertaById(id);

      if (findPeserta) {
        response(res, 200, true, result.rows, 'get peserta success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id peserta not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get peserta failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPeserta],
      } = await findPesertaById(id);

      if (findPeserta) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          id_asuransi: req.body.id_asuransi,
        };

        await editPeserta(data);
        response(res, 200, true, data, 'edit peserta success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id peserta not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit peserta failed');
    }
  },
};

exports.pesertaControllers = pesertaControllers;
