const { response } = require(`../middleware/common`);
const {
  insertPasien,
  allPasienActive,
  countAllPasienActive,
  allPasien,
  countAllPasien,
  getPasienById,
  findPasienById,
  editPasien,
  editPasienActive,
} = require(`../models/pasien`);
const { v4: uuidv4 } = require('uuid');

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
      };

      if (req.body.tanggal_lahir === '') {
        data.tanggal_lahir = '1970-01-01';
      }

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
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      if (req.query.is_active) {
        console.log('pakai req.query.is_active');

        const is_active = req.query.is_active;

        const result = await allPasienActive({
          search,
          sortBy,
          sortOrder,
          limit,
          offset,
          is_active,
        });

        const {
          rows: [count],
        } = await countAllPasienActive(is_active);

        const totalData = parseInt(count.total);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage,
        };

        response(res, 200, true, result.rows, 'get pasien success', pagination);
      } else {
        console.log('tidak pakai req.query.is_active');
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
      }
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
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienById(id);

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
  editActive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienById(id);

      if (findPasien) {
        if (findPasien.is_active == 0) {
          console.log('akun ini 0');

          let data = {
            id,
            is_active: 1,
          };

          await editPasienActive(data);
          response(res, 200, true, data, 'edit pasien on active success');
        } else if (findPasien.is_active == 1) {
          console.log('akun ini 1');

          let data = {
            id,
            is_active: 0,
          };

          await editPasienActive(data);
          response(res, 200, true, data, 'edit pasien off active success');
        } else {
          console.log('column is_active on your account not eligable');
        }
      } else {
        return response(res, 200, [], null, `id pasien not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit pasien active failed');
    }
  },
};

exports.pasienControllers = pasienControllers;
