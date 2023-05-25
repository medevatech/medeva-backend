const { response } = require(`../middleware/common`);
const {
  insertRujukan,
  allRujukan,
  countAllRujukan,
  getRujukanByIdRujukan,
  findRujukanByIdRujukan,
  editRujukan,
  getRujukanByIdKunjungan,
  findRujukanByIdKunjungan,
  editRujukanActiveArchive,
  deleteRujukan,
} = require(`../models/rujukan`);
const { v4: uuidv4 } = require('uuid');

const rujukanjControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_rs: req.body.id_rs,
        id_poli: req.body.id_poli,
        anamnesis: req.body.anamnesis,
        terapi: req.body.terapi,
        catatan: req.body.catatan,
        is_active: 1,
      };

      if (data.id_kunjungan == '') {
        response(res, 200, true, data, 'insert rujukan but id_kunjungan null');
      } else if (data.id_poli == '') {
        response(res, 200, true, data, 'insert rujukan but id_poli null');
      } else {
        await insertRujukan(data);
        response(res, 200, true, data, 'insert rujukan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert rujukan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchRS = req.query.searchRS || '';
      const searchPoli = req.query.searchPoli || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allRujukan({
        search,
        searchRS,
        searchPoli,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllRujukan(search, searchRS, searchPoli, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get rujukan success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rujukan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getRujukanByIdRujukan({
        id,
      });

      const {
        rows: [findRujukan],
      } = await findRujukanByIdRujukan(id);

      if (findRujukan) {
        response(res, 200, true, result.rows, 'get rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rujukan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRujukan],
      } = await findRujukanByIdRujukan(id);

      if (findRujukan) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_rs: req.body.id_rs,
          id_poli: req.body.id_poli,
          anamnesis: req.body.anamnesis,
          terapi: req.body.terapi,
          catatan: req.body.catatan,
          is_active: 1,
        };

        if (data.id_kunjungan == '') {
          await deleteRujukan(data);
          response(res, 200, true, data, 'delete rujukan success');
        } else if (data.id_poli == '') {
          await deleteRujukan(data);
          response(res, 200, true, data, 'delete rujukan success');
        } else {
          await editRujukan(data);
          response(res, 200, true, data, 'edit rujukan success');
        }
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit rujukan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getRujukanByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findRujukanKunjungan],
      } = await findRujukanByIdKunjungan(id_kunjungan);

      if (findRujukanKunjungan) {
        response(res, 200, true, result.rows, 'get rujukan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get rujukan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRujukan],
      } = await findRujukanByIdRujukan(id);

      if (findRujukan) {
        let data = {
          id,
          is_active: 1,
        };

        await editRujukanActiveArchive(data);
        response(res, 200, true, data, 'activate rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active rujukan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findRujukan],
      } = await findRujukanByIdRujukan(id);

      if (findRujukan) {
        let data = {
          id,
          is_active: 0,
        };

        await editRujukanActiveArchive(data);
        response(res, 200, true, data, 'archive rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive rujukan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findRujukan],
      } = await findRujukanByIdRujukan(id);

      if (findRujukan) {
        let data = {
          id,
        };

        await deleteRujukan(data);
        response(res, 200, true, data, 'delete rujukan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id rujukan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete rujukan failed');
    }
  },
};

exports.rujukanjControllers = rujukanjControllers;
