const { response } = require(`../middleware/common`);
const {
  insertResep,
  allResep,
  countAllResep,
  getResepByIdResep,
  findResepByIdResep,
  getResepByIdKunjungan,
  findResepByIdKunjungan,
  getResepByIdPasien,
  findResepByIdPasien,
  editResep,
  editResepActiveArchive,
  deleteResep,
} = require(`../models/resep`);
const { v4: uuidv4 } = require('uuid');

const resepControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_kunjungan: req.body.id_kunjungan,
        id_obat: req.body.id_obat,
        id_pasien: req.body.id_pasien,
        jumlah: req.body.jumlah,
        satuan: req.body.satuan,
        frekuensi: req.body.frekuensi,
        periode: req.body.periode,
        metode_konsumsi: req.body.metode_konsumsi,
        aturan_pakai: req.body.aturan_pakai,
        is_active: 1,
      };

      if (data.id_obat == '') {
        response(res, 200, true, data, 'insert resep but id_obat null');
      } else {
        await insertResep(data);
        response(res, 200, true, data, 'insert resep success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert resep failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchObat = req.query.searchObat || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allResep({
        search,
        searchObat,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllResep(search, searchObat, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get resep success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get resep failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getResepByIdResep({
        id,
      });

      const {
        rows: [findResep],
      } = await findResepByIdResep(id);

      if (findResep) {
        response(res, 200, true, result.rows, 'get resep success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id resep not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get resep failed');
    }
  },
  getByIdKunjungan: async (req, res) => {
    try {
      const id_kunjungan = req.params.id_kunjungan;

      const result = await getResepByIdKunjungan({
        id_kunjungan,
      });

      const {
        rows: [findResepKunjungan],
      } = await findResepByIdKunjungan(id_kunjungan);

      if (findResepKunjungan) {
        response(res, 200, true, result.rows, 'get resep success');
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
      response(res, 404, false, error, 'get resep failed');
    }
  },
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      const result = await getResepByIdPasien({
        id_pasien,
      });

      const {
        rows: [findResepPasien],
      } = await findResepByIdPasien(id_pasien);

      if (findResepPasien) {
        response(res, 200, true, result.rows, 'get resep success');
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
      response(res, 404, false, error, 'get resep failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findResep],
      } = await findResepByIdResep(id);

      if (findResep) {
        let data = {
          id,
          id_kunjungan: req.body.id_kunjungan,
          id_obat: req.body.id_obat,
          id_pasien: req.body.id_pasien,
          jumlah: req.body.jumlah,
          satuan: req.body.satuan,
          frekuensi: req.body.frekuensi,
          periode: req.body.periode,
          metode_konsumsi: req.body.metode_konsumsi,
          aturan_pakai: req.body.aturan_pakai,
          is_active: 1,
        };

        if (data.id_obat == '') {
          await deleteResep(data);
          response(res, 200, true, data, 'delete resep success');
        } else {
          await editResep(data);
          response(res, 200, true, data, 'edit resep success');
        }
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id resep not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit resep failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findResep],
      } = await findResepByIdResep(id);

      if (findResep) {
        let data = {
          id,
          is_active: 1,
        };

        await editResepActiveArchive(data);
        response(res, 200, true, data, 'activate resep success');
      } else {
        return response(res, 200, [], null, `id resep not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active resep failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findResep],
      } = await findResepByIdResep(id);

      if (findResep) {
        let data = {
          id,
          is_active: 0,
        };

        await editResepActiveArchive(data);
        response(res, 200, true, data, 'archive resep success');
      } else {
        return response(res, 200, [], null, `id resep not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive resep failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findResep],
      } = await findResepByIdResep(id);

      if (findResep) {
        let data = {
          id,
        };

        await deleteResep(data);
        response(res, 200, true, data, 'delete resep success');
      } else {
        return response(res, 200, [], null, `id resep not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete resep failed');
    }
  },
};

exports.resepControllers = resepControllers;
