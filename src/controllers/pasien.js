const { response } = require(`../middleware/common`);
const {
  insertPasien,
  allPasien,
  countAllPasien,
  allPasienActive,
  countAllPasienActive,
  allPasienArchive,
  countAllPasienArchive,
  getPasienById,
  findPasienById,
  editPasien,
  editPasienActive,
  editPasienArchive,
} = require(`../models/pasien`);
const { v4: uuidv4 } = require('uuid');

const pasienControllers = {
  add: async (req, res, next) => {
    try {
      const {
        nama_lengkap,
        jenis_kelamin,
        tipe_kitas,
        nomor_kitas,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kelurahan,
        kecamatan,
        kota,
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
        tipe_kitas,
        nomor_kitas,
        nomor_hp,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        kelurahan,
        kecamatan,
        kota,
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
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;
      const is_active = req.query.is_active || 0;

      const result = await allPasien({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        is_active,
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
  getAllActive: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'is_active';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const is_active = req.params.is_active;

      if (is_active == 0) {
        console.log(is_active, 'tampilin yang non activeaja');

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

        response(
          res,
          200,
          true,
          result.rows,
          'get pasien non active success',
          pagination
        );
      } else if (is_active == 1) {
        console.log(is_active, 'tampilin yang activeaja');

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

        response(
          res,
          200,
          true,
          result.rows,
          'get pasien active success',
          pagination
        );
      } else {
        console.log(is_active, 'id kamu salah');

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

        response(
          res,
          200,
          true,
          [],
          'params is_active not found, get pasien active failed',
          pagination
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get pasien active failed');
    }
  },
  getAllArchive: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const is_archive = req.params.is_archive;

      if (is_archive == 0) {
        console.log(is_archive, 'tampilin yang non activeaja');

        const result = await allPasienArchive({
          search,
          sortBy,
          sortOrder,
          limit,
          offset,
          is_archive,
        });

        const {
          rows: [count],
        } = await countAllPasienArchive(is_archive);

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
          'get pasien non archive success',
          pagination
        );
      } else if (is_archive == 1) {
        console.log(is_archive, 'tampilin yang archiveaja');

        const result = await allPasienArchive({
          search,
          sortBy,
          sortOrder,
          limit,
          offset,
          is_archive,
        });

        const {
          rows: [count],
        } = await countAllPasienArchive(is_archive);

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
          'get pasien archive success',
          pagination
        );
      } else {
        console.log(is_archive, 'id kamu salah');

        const result = await allPasienArchive({
          search,
          sortBy,
          sortOrder,
          limit,
          offset,
          is_archive,
        });

        const {
          rows: [count],
        } = await countAllPasienArchive(is_archive);

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
          [],
          'params is_archive not found, get pasien archive failed',
          pagination
        );
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
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findPasien],
      } = await findPasienById(id);

      if (findPasien) {
        if (findPasien.is_archive == 0) {
          console.log('akun ini 0');

          let data = {
            id,
            is_archive: 1,
          };

          await editPasienArchive(data);
          response(res, 200, true, data, 'edit pasien on archive success');
        } else if (findPasien.is_archive == 1) {
          console.log('akun ini 1');

          let data = {
            id,
            is_archive: 0,
          };

          await editPasienArchive(data);
          response(res, 200, true, data, 'edit pasien off archive success');
        } else {
          console.log('column is_archive on your account not eligable');
        }
      } else {
        return response(res, 200, [], null, `id pasien not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit pasien archive failed');
    }
  },
};

exports.pasienControllers = pasienControllers;
