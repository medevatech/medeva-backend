const { response } = require("../middleware/common");
const {
  findEmail,
  findUsername,
  findLogin,
  countKaryawan,
  createKaryawan,
  getKaryawan,
  getKaryawanById,
  updateKaryawan,
  updatePhotoKaryawan,
  updatePasswordKaryawan,
  archiveKaryawan,
  activateKaryawan,
  deleteKaryawan,
} = require("../models/karyawan");
const argon2 = require("argon2");
const { generateToken, generateRefreshToken } = require("../helpers/auth");
// const client = require("../config/redis");
const cloudinary = require("../config/cloud");

const karyawanController = {
  add: async (req, res, next) => {
    let inputEmail = req.body.email;
    let inputUsername = req.body.username;
    let {
      rows: [currentEmail],
    } = await findEmail(inputEmail);
    let {
      rows: [currentUsername],
    } = await findUsername(inputUsername);
    if (currentEmail) {
      return response(res, 400, false, null, "Email is already used");
    } else if (currentUsername) {
      return response(res, 400, false, null, "Username is already used");
    } else {
      let digits = "0123456789";
      let id = "KRY";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const hash = await argon2.hash(req.body.password);
      const password = `${hash}`;
      let data = {
        id: id,
        nama: req.body.nama,
        username: req.body.username,
        email: req.body.email,
        password,
        is_admin: parseInt(req.body.is_admin),
        is_resepsionis: parseInt(req.body.is_resepsionis),
        is_perawat: parseInt(req.body.is_perawat),
        is_dokter: parseInt(req.body.is_dokter),
        is_manajemen: parseInt(req.body.is_manajemen),
        jenis_kelamin: req.body.jenis_kelamin,
        nomor_kitas: req.body.nomor_kitas,
        tipe_izin: req.body.tipe_izin,
        nomor_izin: req.body.nomor_izin,
        kadaluarsa_izin: req.body.kadaluarsa_izin,
        nomor_hp: req.body.nomor_hp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kode_pos: req.body.kode_pos,
        status_menikah: req.body.status_menikah,
        tipe: req.body.tipe,
        spesialis: req.body.spesialis,
      };
      if (data.kadaluarsa_izin === "") {
        data.kadaluarsa_izin = "1900/01/01";
      }
      if (data.tanggal_lahir === "") {
        data.tanggal_lahir = "1900/01/01";
      }
      try {
        const result = await createKaryawan(data);
        if (result) {
          return response(res, 200, true, data, "Add karyawan success");
        }
      } catch (err) {
        return response(res, 400, false, err, "Add karyawan failed");
      }
    }
  },
  login: async (req, res, next) => {
    let inputLogin = req.body.input_login;
    let {
      rows: [users],
    } = await findLogin(inputLogin);
    if (!users) {
      return response(res, 400, false, null, "Account not found");
    } else {
      let validation = await argon2.verify(users.password, req.body.password);
      if (!validation) {
        return response(res, 401, false, null, "Invalid password");
      } else {
        delete users.password;
        let payload = {
          id: users.id,
          name: users.name,
          username: users.username,
          email: users.email,
          is_dev: users.is_dev,
          id_manager: users.is_manager,
          is_admin: users.is_admin,
          is_resepsionis: users.is_resepsionis,
          is_perawat: users.is_perawat,
          is_dokter: users.is_dokter,
          is_manajemen: users.is_manajemen,
        };
        let accessToken = generateToken(payload);
        let refreshToken = generateRefreshToken(payload);
        users.token = accessToken;
        users.refreshToken = refreshToken;
        return response(res, 200, true, users, "Login karyawan success");
      }
    }
  },
  get: async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const sortBy = req.query.sortBy || "nama";
      const sortOrder = req.query.sortOrder || "desc";
      const searchName = req.query.searchName || "";
      const searchTipe = req.query.searchTipe || "";
      const searchSpesialis = req.query.searchSpesialis || "";
      const searchStatus = req.query.searchStatus || "";
      const offset = (page - 1) * limit;
      const result = await getKaryawan({
        searchName,
        searchTipe,
        searchSpesialis,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countKaryawan();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      return response(
        res,
        200,
        true,
        result.rows,
        "Get karyawan data success",
        pagination
      );
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Get karyawan data failed");
    }
  },
  getById: async (req, res) => {
    try {
      const result = await getKaryawanById(req.params.id);
      console.log(result);
      return response(
        res,
        200,
        true,
        result.rows,
        "Get karyawan data by ID success"
      );
    } catch (err) {
      return response(res, 400, false, err, "Get karyawan data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = {
        id: id,
        nama: req.body.nama,
        username: req.body.username,
        email: req.body.email,
        is_admin: parseInt(req.body.is_admin),
        is_resepsionis: parseInt(req.body.is_resepsionis),
        is_perawat: parseInt(req.body.is_perawat),
        is_dokter: parseInt(req.body.is_dokter),
        is_manajemen: parseInt(req.body.is_manajemen),
        jenis_kelamin: req.body.jenis_kelamin,
        nomor_kitas: req.body.nomor_kitas,
        tipe_izin: req.body.tipe_izin,
        nomor_izin: req.body.nomor_izin,
        kadaluarsa_izin: req.body.kadaluarsa_izin,
        nomor_hp: req.body.nomor_hp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kode_pos: req.body.kode_pos,
        status_menikah: req.body.status_menikah,
        tipe: req.body.tipe,
        spesialis: req.body.spesialis,
      };
      await updateKaryawan(data);
      return response(res, 200, true, data, "Update karyawan success");
    } catch (err) {
      console.log(err);
      return response(res, 400, false, err, "Update karyawan failed");
    }
  },
  updatePhoto: async (req, res, next) => {
    try {
      const id = req.params.id;
      const foto = await cloudinary.uploader.upload(req.file.path, {
        folder: "foto_kry_kln",
      });
      const data = {
        id,
        foto: foto.url,
      };
      await updatePhotoKaryawan(data);
      return response(res, 200, true, data, "Update foto karyawan success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Update foto karyawan failed");
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const id = req.params.id;
      const hash = await argon2.hash(req.body.password);
      const password = `${hash}`;
      const data = {
        id,
        password,
      };
      await updatePasswordKaryawan(data);
      return response(res, 200, true, data, "Update password karyawan success");
    } catch (err) {
      return response(res, 400, false, err, "Update password karyawan failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      await archiveKaryawan(req.params.id);
      return response(res, 200, true, null, "Archive karyawan success");
    } catch (err) {
      return response(res, 400, false, err, "Archive karyawan failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      await activateKaryawan(req.params.id);
      return response(res, 200, true, null, "Activate karyawan success");
    } catch (err) {
      return response(res, 400, false, err, "Activate karyawan failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteKaryawan(req.params.id);
      return response(res, 200, true, null, "Delete karyawan success");
    } catch (err) {
      return response(res, 400, false, err, "Delete karyawan failed");
    }
  },
};

exports.karyawanController = karyawanController;
