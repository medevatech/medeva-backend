const { response } = require(`../middleware/common`);
const {
  insertPasien,
  allPasien,
  countAllPasien,
  getPasienById,
  findPasienById,
  editPasien,
} = require(`../models/pasien`);
const { v4: uuidv4 } = require('uuid');

const pasienControllers = {
  addPasien: async (req, res, next) => {
    try {
      const {
        nama_lengkap,
        jenis_kelamin,
        nomor_kitas,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        kode_pos,
        agama,
        kewarganegaraan,
        pekerjaan,
        status_menikah,
        golongan_darah,
      } = req.body;

      let data = {
        id: uuidv4(),
        nama_lengkap,
        jenis_kelamin,
        nomor_kitas,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        kode_pos,
        agama,
        kewarganegaraan,
        pekerjaan,
        status_menikah,
        golongan_darah,
      };

      await insertPasien(data);
      response(res, 200, true, data, 'insert pasien success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert pasien failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'nama_lengkap';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allPasien({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllPasien();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get pasien success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pasien failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getPasienById({
        id,
      });

      const {
        rows: [findPasien],
      } = await findPasienById(id);

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
  editPasien: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        nama_lengkap,
        jenis_kelamin,
        nomor_kitas,
        nomor_hp,
        id_asuransi,
        alergi,
        penyakit_kronis,
        alamat,
        tempat_lahir,
        tanggal_lahir,
        agama,
        kewarganegaraan,
        pekerjaan,
        status_menikah,
        golongan_darah,
      } = req.body;

      const {
        rows: [findPasien],
      } = await findPasienById(id);

      if (findPasien) {
        let data = {
          id,
          nama_lengkap,
          jenis_kelamin,
          nomor_kitas,
          nomor_hp,
          id_asuransi,
          alergi,
          penyakit_kronis,
          alamat,
          tempat_lahir,
          tanggal_lahir,
          agama,
          kewarganegaraan,
          pekerjaan,
          status_menikah,
          golongan_darah,
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
};

exports.pasienControllers = pasienControllers;
