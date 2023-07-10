const { response } = require(`../middleware/common`);
const {
  insertKlaim,
  allKlaim,
  countAllKlaim,
  getKlaimByIdKlaim,
  findKlaimByIdKlaim,
  getKlaimByIdSales,
  findKlaimByIdSales,
  getKlaimByIdAsuransi,
  findKlaimByIdAsuransi,
  getKlaimByIdAsuransiKelas,
  findKlaimByIdAsuransiKelas,
  editKlaim,
  editKlaimActivate,
  editKlaimArchive,
  deleteKlaim,
} = require(`../models/klaim.js`);
const { v4: uuidv4 } = require('uuid');

const klaimControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_sales: req.body.id_sales,
        id_asuransi: req.body.id_asuransi,
        id_asuransi_kelas: req.body.id_asuransi_kelas,
        besar_klaim: req.body.besar_klaim,
        status_klaim: req.body.status_klaim,
        kategori_penolakan: req.body.kategori_penolakan,
        alasan_penolakan: req.body.alasan_penolakan,
        is_active: 1,
      };

      req.body.status_klaim === ''
        ? (data.status_klaim = 'DITERIMA')
        : req.body.status_klaim;
      req.body.besar_klaim === ''
        ? (data.besar_klaim = 0)
        : req.body.besar_klaim;

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'id_sales' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKlaim(data);
        response(res, 200, true, data, 'insert klaim success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert klaim failed');
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

      const result = await allKlaim({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKlaim(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get klaim success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klaim failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKlaimByIdKlaim({
        id,
      });

      const {
        rows: [findKlaim],
      } = await findKlaimByIdKlaim(id);

      if (findKlaim) {
        response(res, 200, true, result.rows, 'get klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klaim (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klaim failed');
    }
  },
  getByIdSales: async (req, res) => {
    try {
      const id_sales = req.params.id_sales;

      const result = await getKlaimByIdSales({
        id_sales,
      });

      const {
        rows: [findSales],
      } = await findKlaimByIdSales(id_sales);

      if (findSales) {
        response(res, 200, true, result.rows, 'get klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id sales (${id_sales}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klaim failed');
    }
  },
  getByIdAsuransi: async (req, res) => {
    try {
      const id_asuransi = req.params.id_asuransi;

      const result = await getKlaimByIdAsuransi({
        id_asuransi,
      });

      const {
        rows: [findAsuransi],
      } = await findKlaimByIdAsuransi(id_asuransi);

      if (findAsuransi) {
        response(res, 200, true, result.rows, 'get klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi (${id_asuransi}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klaim failed');
    }
  },
  getByIdAsuransiKelas: async (req, res) => {
    try {
      const id_asuransi_kelas = req.params.id_asuransi_kelas;

      const result = await getKlaimByIdAsuransiKelas({
        id_asuransi_kelas,
      });

      const {
        rows: [findAsuransiKelas],
      } = await findKlaimByIdAsuransiKelas(id_asuransi_kelas);

      if (findAsuransiKelas) {
        response(res, 200, true, result.rows, 'get klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id asuransi kelas (${id_asuransi_kelas}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get klaim failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlaim],
      } = await findKlaimByIdKlaim(id);

      if (findKlaim) {
        let data = {
          id,
          id_sales: req.body.id_sales,
          id_asuransi: req.body.id_asuransi,
          id_asuransi_kelas: req.body.id_asuransi_kelas,
          besar_klaim: req.body.besar_klaim,
          status_klaim: req.body.status_klaim,
          kategori_penolakan: req.body.kategori_penolakan,
          alasan_penolakan: req.body.alasan_penolakan,
          is_active: 1,
        };

        req.body.status_klaim === ''
          ? (data.status_klaim = 'DITERIMA')
          : req.body.status_klaim;
        req.body.besar_klaim === ''
          ? (data.besar_klaim = 0)
          : req.body.besar_klaim;

        await editKlaim(data);
        response(res, 200, true, data, 'edit klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klaim (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit klaim failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlaim],
      } = await findKlaimByIdKlaim(id);

      if (findKlaim) {
        let data = {
          id,
          is_active: 1,
        };

        await editKlaimActivate(data);
        response(res, 200, true, data, 'activate klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klaim (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate klaim failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlaim],
      } = await findKlaimByIdKlaim(id);

      if (findKlaim) {
        let data = {
          id,
          is_active: 0,
        };

        await editKlaimArchive(data);
        response(res, 200, true, data, 'archive klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klaim (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive klaim failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKlaim],
      } = await findKlaimByIdKlaim(id);

      if (findKlaim) {
        let data = {
          id,
        };

        await deleteKlaim(data);
        response(res, 200, true, data, 'delete klaim success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klaim (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete klaim failed');
    }
  },
};

exports.klaimControllers = klaimControllers;
