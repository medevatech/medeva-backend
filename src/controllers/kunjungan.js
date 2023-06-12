const { response } = require(`../middleware/common`);
const {
  insertKunjungan,
  allKunjungan,
  countAllKunjungan,
  getKunjunganByIdKunjungan,
  findKunjunganByIdKunjungan,
  getKunjunganByIdPasien,
  findKunjunganByIdPasien,
  countAllKunjunganPasien,
  editKunjungan,
  editKunjunganActiveArchive,
  deleteKunjungan,
} = require(`../models/kunjungan`);
const { v4: uuidv4 } = require('uuid');

const kunjunganControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_jaga: req.body.id_jaga,
        id_vs: req.body.id_vs,
        id_pasien: req.body.id_pasien,
        waktu_mulai: req.body.waktu_mulai,
        waktu_selesai: req.body.waktu_selesai,
        tipe: req.body.tipe,
        anamnesis: req.body.anamnesis,
        pemeriksaan_fisik: req.body.pemeriksaan_fisik,
        prognosa: req.body.prognosa,
        kasus_kll: req.body.kasus_kll,
        status_pulang: req.body.status_pulang,
        keluhan: req.body.keluhan,
        catatan_tambahan: req.body.catatan_tambahan,
        is_active: 1,
      };

      if (req.body.waktu_mulai === '') {
        data.waktu_mulai = '1970-01-01';
      }

      if (req.body.waktu_selesai === '') {
        data.waktu_selesai = '1970-01-01';
      }

      if (req.body.kasus_kll === '') {
        data.kasus_kll = false;
      }

      for (let [key, value] of Object.entries(data)) {
        if (key === 'status_pulang' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPasien(data);
        response(res, 200, true, data, 'insert kunjungan success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert kunjungan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchPasien = req.query.searchPasien || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allKunjungan({
        search,
        searchPasien,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllKunjungan(search, searchPasien, searchStatus);

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
        'get kunjungan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get kunjungan failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getKunjunganByIdKunjungan({
        id,
      });

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdKunjungan(id);

      if (findKunjungan) {
        response(res, 200, true, result.rows, 'get kunjungan success');
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
      response(res, 404, false, error, 'get kunjungan failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = (page - 1) * limit;

      const result = await getKunjunganByIdPasien({
        limit,
        offset,
        id_pasien,
      });

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdPasien(id_pasien);

      if (findKunjungan) {
        const {
          rows: [count],
        } = await countAllKunjunganPasien(id_pasien);

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
          'get kunjungan success',
          pagination
        );
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
      response(res, 404, false, error, 'get kunjungan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdKunjungan(id);

      if (findKunjungan) {
        let data = {
          id,
          id_jaga: req.body.id_jaga,
          id_vs: req.body.id_vs,
          id_pasien: req.body.id_pasien,
          waktu_mulai: req.body.waktu_mulai,
          waktu_selesai: req.body.waktu_selesai,
          tipe: req.body.tipe,
          anamnesis: req.body.anamnesis,
          pemeriksaan_fisik: req.body.pemeriksaan_fisik,
          prognosa: req.body.prognosa,
          kasus_kll: req.body.kasus_kll,
          status_pulang: req.body.status_pulang,
          keluhan: req.body.keluhan,
          catatan_tambahan: req.body.catatan_tambahan,
          is_active: 1,
        };

        console.log(data);

        await editKunjungan(data);
        response(res, 200, true, data, 'edit kunjungan success');
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
      response(res, 404, false, error, 'edit kunjungan failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdKunjungan(id);

      if (findKunjungan) {
        let data = {
          id,
          is_active: 1,
        };

        await editKunjunganActiveArchive(data);
        response(res, 200, true, data, 'activate kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active kunjungan failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdKunjungan(id);

      if (findKunjungan) {
        let data = {
          id,
          is_active: 0,
        };

        await editKunjunganActiveArchive(data);
        response(res, 200, true, data, 'archive kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive kunjungan failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findKunjungan],
      } = await findKunjunganByIdKunjungan(id);

      if (findKunjungan) {
        let data = {
          id,
        };

        await deleteKunjungan(data);
        response(res, 200, true, data, 'delete kunjungan success');
      } else {
        return response(
          res,
          200,
          [],
          null,
          `id kunjungan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete kunjungan failed');
    }
  },
};

exports.kunjunganControllers = kunjunganControllers;
