const { response } = require(`../middleware/common`);
const {
  insertPasien,
  allPasien,
  countAllPasien,
  getPasienByIdPasien,
  findPasienByIdPasien,
  editPasien,
  editPasienActiveArchive,
  deletePasien,
} = require(`../models/pasien`);
const { v4: uuidv4 } = require('uuid');
const client = require(`../config/redis`);

const pasienControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tipe_kitas: req.body.tipe_kitas,
        nomor_kitas: req.body.nomor_kitas,
        nomor_hp: req.body.nomor_hp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        kelurahan: req.body.kelurahan,
        kecamatan: req.body.kecamatan,
        kota: req.body.kota,
        provinsi: req.body.provinsi,
        kode_pos: req.body.kode_pos,
        agama: req.body.agama,
        kewarganegaraan: req.body.kewarganegaraan,
        pekerjaan: req.body.pekerjaan,
        status_menikah: req.body.status_menikah,
        golongan_darah: req.body.golongan_darah,
        is_active: 1,
      };

      if (req.body.tanggal_lahir === '') {
        data.tanggal_lahir = '1970-01-01';
      }

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (
          (key === 'nama_lengkap' && value === '') ||
          (key === 'nomor_kitas' && value === '')
        ) {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertPasien(data);
        response(res, 200, true, data, 'insert pasien success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pasien failed');
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

      const result = await allPasien({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPasien(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      const key = req.originalUrl || req.url;

      client.set(
        key,
        JSON.stringify({
          success: true,
          statusCode: 200,
          data: result.rows,
          message: 'get pasien success redis',
          pagination,
        }),
        { EX: 60 }
      );

      response(res, 200, true, result.rows, 'get pasien success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pasien failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPasienByIdPasien({
        id,
      });

      const {
        rows: [findPasien],
      } = await findPasienByIdPasien(id);

      if (findPasien) {
        response(res, 200, true, result.rows, 'get pasien success');
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
      response(res, 404, false, error, 'get pasien failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienByIdPasien(id);

      if (findPasien) {
        let data = {
          id,
          nama_lengkap: req.body.nama_lengkap,
          jenis_kelamin: req.body.jenis_kelamin,
          tipe_kitas: req.body.tipe_kitas,
          nomor_kitas: req.body.nomor_kitas,
          nomor_hp: req.body.nomor_hp,
          alergi: req.body.alergi,
          penyakit_kronis: req.body.penyakit_kronis,
          alamat: req.body.alamat,
          kelurahan: req.body.kelurahan,
          kecamatan: req.body.kecamatan,
          kota: req.body.kota,
          provinsi: req.body.provinsi,
          kode_pos: req.body.kode_pos,
          tempat_lahir: req.body.tempat_lahir,
          tanggal_lahir: req.body.tanggal_lahir,
          alamat: req.body.alamat,
          kelurahan: req.body.kelurahan,
          kecamatan: req.body.kecamatan,
          kota: req.body.kota,
          provinsi: req.body.provinsi,
          kode_pos: req.body.kode_pos,
          agama: req.body.agama,
          kewarganegaraan: req.body.kewarganegaraan,
          pekerjaan: req.body.pekerjaan,
          status_menikah: req.body.status_menikah,
          golongan_darah: req.body.golongan_darah,
        };

        await editPasien(data);
        response(res, 200, true, data, 'edit pasien success');
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
      response(res, 404, false, error, 'edit pasien failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienByIdPasien(id);

      if (findPasien) {
        let data = {
          id,
          is_active: 1,
        };

        await editPasienActiveArchive(data);
        response(res, 200, true, data, 'activate pasien success');
      } else {
        return response(res, 200, [], null, `id pasien not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active pasien failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienByIdPasien(id);

      if (findPasien) {
        let data = {
          id,
          is_active: 0,
        };

        await editPasienActiveArchive(data);
        response(res, 200, true, data, 'archive pasien success');
      } else {
        return response(res, 200, [], null, `id pasien not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive pasien failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienByIdPasien(id);

      if (findPasien) {
        let data = {
          id,
        };

        await deletePasien(data);
        response(res, 200, true, data, 'delete pasien success');
      } else {
        return response(res, 200, [], null, `id pasien not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete pasien failed');
    }
  },
};

exports.pasienControllers = pasienControllers;
