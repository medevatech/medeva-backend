const { response } = require(`../middleware/common`);
const {
  insertPeserta,
  allPeserta,
  countAllPeserta,
  getPesertaByIdPeserta,
  findPesertaByIdPeserta,
  editPeserta,
  getPesertaByIdPasien,
  findPesertaByIdPasien,
  editPesertaActiveArchive,
  deletePeserta,
} = require(`../models/peserta`);
const { v4: uuidv4 } = require('uuid');

const pesertaControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_pasien: req.body.id_pasien,
        id_asuransi: req.body.id_asuransi,
        nomor_asuransi: req.body.nomor_asuransi,
        id_asuransi_kelas: req.body.id_asuransi_kelas,
        is_active: 1,
      };

      if (data.id_pasien == '') {
        response(res, 200, true, data, 'insert peserta but id_pasien null');
      } else {
        await insertPeserta(data);
        response(res, 200, true, data, 'insert peserta success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert peserta failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchPasien = req.query.searchPasien || '';
      const searchAsuransi = req.query.searchAsuransi || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allPeserta({
        search,
        searchPasien,
        searchAsuransi,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPeserta(
        search,
        searchPasien,
        searchAsuransi,
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

      response(res, 200, true, result.rows, 'get peserta success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get peserta failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPesertaByIdPeserta({
        id,
      });

      const {
        rows: [findPeserta],
      } = await findPesertaByIdPeserta(id);

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
      } = await findPesertaByIdPeserta(id);

      if (findPeserta) {
        let data = {
          id,
          id_pasien: req.body.id_pasien,
          id_asuransi: req.body.id_asuransi,
          nomor_asuransi: req.body.nomor_asuransi,
          id_asuransi_kelas: req.body.id_asuransi_kelas,
          is_active: 1,
        };

        if (data.id_pasien == '') {
          await deletePeserta(data);
          response(res, 200, true, data, 'delete peserta success');
        } else {
          await editPeserta(data);
          response(res, 200, true, data, 'edit peserta success');
        }
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
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getPesertaByIdPasien({
        id_pasien,
      });

      const {
        rows: [findPeserta],
      } = await findPesertaByIdPasien(id_pasien);

      if (findPeserta) {
        response(res, 200, true, result.rows, 'get peserta success');
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
      response(res, 404, false, error, 'get peserta failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPeserta],
      } = await findPesertaByIdPeserta(id);

      if (findPeserta) {
        let data = {
          id,
          is_active: 1,
        };

        await editPesertaActiveArchive(data);
        response(res, 200, true, data, 'activate peserta success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id peserta not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active peserta failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPeserta],
      } = await findPesertaByIdPeserta(id);

      if (findPeserta) {
        let data = {
          id,
          is_active: 0,
        };

        await editPesertaActiveArchive(data);
        response(res, 200, true, data, 'archive peserta success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id peserta not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive peserta failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPeserta],
      } = await findPesertaByIdPeserta(id);

      if (findPeserta) {
        let data = {
          id,
        };

        await deletePeserta(data);
        response(res, 200, true, data, 'delete peserta success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id peserta not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete peserta failed');
    }
  },
};

exports.pesertaControllers = pesertaControllers;
