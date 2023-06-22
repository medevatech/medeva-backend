const { response } = require(`../middleware/common`);
const {
  insertKerjasama,
  allKerjasama,
  countAllKerjasama,
  getKerjasamaByIdKerjasama,
  findKerjasamaByIdKerjasama,
  getKerjasamaByIdAsuransi,
  findKerjasamaByIdAsuransi,
  getKerjasamaByIdAsuransiKelas,
  findKerjasamaByIdAsuransiKelas,
  getKerjasamaByIdKlinik,
  findKerjasamaByIdKlinik,
  editKerjasama,
  editKerjasamaActivate,
  editKerjasamaArchive,
  editKlinikActivate,
  editKlinikArchive,
  deleteKerjasama,
  deleteKerjasamaByIdKlinik,
} = require(`../models/kerjasama`);
const { v4: uuidv4 } = require('uuid');

const kerjasamaControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_asuransi: req.body.id_asuransi,
        id_asuransi_kelas: req.body.id_asuransi_kelas,
        id_klinik: req.body.id_klinik,
        tipe: req.body.tipe,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'tipe' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertKerjasama(data);
        response(res, 200, true, data, 'insert kerjasama success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert kerjasama failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchAsuransi = req.query.searchAsuransi || '';
      const searchAsuransiKelas = req.query.searchAsuransiKelas || '';
      const searchKlinik = req.query.searchKlinik || '';
      const searchTipe = req.query.searchTipe || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKerjasama({
        search,
        searchAsuransi,
        searchAsuransiKelas,
        searchKlinik,
        searchTipe,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKerjasama(
        search,
        searchAsuransi,
        searchAsuransiKelas,
        searchKlinik,
        searchTipe,
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
        'get kerjasama success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get kerjasama failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKerjasamaByIdKerjasama({
        id,
      });

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKerjasama(id);

      if (findKerjasama) {
        response(res, 200, true, result.rows, 'get kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kerjasama not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get kerjasama failed');
    }
  },
  getByIdAsuransi: async (req, res) => {
    try {
      const id_asuransi = req.params.id_asuransi;

      const result = await getKerjasamaByIdAsuransi({
        id_asuransi,
      });

      const {
        rows: [findAsuransi],
      } = await findKerjasamaByIdAsuransi(id_asuransi);

      if (findAsuransi) {
        response(res, 200, true, result.rows, 'get kerjasama success');
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
      response(res, 404, false, error, 'get kerjasama failed');
    }
  },
  getByIdAsuransiKelas: async (req, res) => {
    try {
      const id_asuransi_kelas = req.params.id_asuransi_kelas;

      const result = await getKerjasamaByIdAsuransiKelas({
        id_asuransi_kelas,
      });

      const {
        rows: [findAsuransiKelas],
      } = await findKerjasamaByIdAsuransiKelas(id_asuransi_kelas);

      if (findAsuransiKelas) {
        response(res, 200, true, result.rows, 'get kerjasama success');
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
      response(res, 404, false, error, 'get kerjasama failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getKerjasamaByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findKlinik],
      } = await findKerjasamaByIdKlinik(id_klinik);

      if (findKlinik) {
        response(res, 200, true, result.rows, 'get kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get kerjasama failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKerjasama(id);

      if (findKerjasama) {
        let data = {
          id,
          id_asuransi: req.body.id_asuransi,
          id_asuransi_kelas: req.body.id_asuransi_kelas,
          id_klinik: req.body.id_klinik,
          tipe: req.body.tipe,
          is_active: 1,
        };

        await editKerjasama(data);
        response(res, 200, true, data, 'edit kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kerjasama not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit kerjasama failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKerjasama(id);

      if (findKerjasama) {
        let data = {
          id,
          is_active: 1,
        };

        await editKerjasamaActivate(data);
        response(res, 200, true, data, 'activate kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kerjasama not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate kerjasama failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKerjasama(id);

      if (findKerjasama) {
        let data = {
          id,
          is_active: 0,
        };

        await editKerjasamaArchive(data);
        response(res, 200, true, data, 'archive kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kerjasama not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive kerjasama failed');
    }
  },
  editActivateByIdKlinik: async (req, res, next) => {
    try {
      const id_klinik = req.params.id_klinik;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKlinik(id_klinik);

      if (findKerjasama) {
        let data = {
          id_klinik,
          is_active: 1,
        };

        await editKlinikActivate(data);
        response(res, 200, true, data, 'activate kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate kerjasama failed');
    }
  },
  editArchiveByIdKlinik: async (req, res, next) => {
    try {
      const id_klinik = req.params.id_klinik;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKlinik(id_klinik);

      if (findKerjasama) {
        let data = {
          id_klinik,
          is_active: 0,
        };

        await editKlinikArchive(data);
        response(res, 200, true, data, 'archive kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive kerjasama failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKerjasama],
      } = await findKerjasamaByIdKerjasama(id);

      if (findKerjasama) {
        let data = {
          id,
        };

        await deleteKerjasama(data);
        response(res, 200, true, data, 'delete kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id kerjasama not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete kerjasama failed');
    }
  },
  deleteByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const {
        rows: [findKlinik],
      } = await findKerjasamaByIdKlinik(id_klinik);

      if (findKlinik) {
        let data = {
          id_klinik,
        };

        await deleteKerjasamaByIdKlinik(data);
        response(res, 200, true, data, 'delete kerjasama success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete kerjasama failed');
    }
  },
};

exports.kerjasamaControllers = kerjasamaControllers;
