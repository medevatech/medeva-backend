const pool = require("../config/db");

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_karyawan WHERE email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_karyawan WHERE username = '${username}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findLogin = (input_login) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * from tbl_karyawan WHERE email = '${input_login}' OR username = '${input_login}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findContract = (idClinic) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_kontrak
      WHERE id_klinik = '${idClinic}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const countKaryawan = ({
  search,
  searchTipe,
  searchStatus,
  searchSpesialis,
  searchClinic,
}) => {
  return pool.query(
    `SELECT COUNT(*) AS total 
    FROM tbl_karyawan
    INNER JOIN tbl_kontrak ON tbl_karyawan.id = tbl_kontrak.id_karyawan
    INNER JOIN tbl_klinik ON tbl_kontrak.id_klinik = tbl_klinik.id
    WHERE tbl_klinik.id ILIKE '%${searchClinic}%'
    AND tbl_karyawan.nama ILIKE '%${search}%'
    AND tbl_karyawan.tipe ILIKE '%${searchTipe}%'
    AND tbl_karyawan.spesialis ILIKE '%${searchSpesialis}%'
    AND CAST(tbl_karyawan.is_active AS TEXT) ILIKE '%${searchStatus}%'`
  );
};

const createKaryawan = (data) => {
  const {
    id,
    nama,
    username,
    email,
    password,
    is_dev,
    is_manager,
    is_finance,
    is_admin,
    is_resepsionis,
    is_perawat,
    is_dokter,
    is_manajemen,
    is_cashier,
    jenis_kelamin,
    nomor_kitas,
    tipe_izin,
    nomor_izin,
    kadaluarsa_izin,
    nomor_hp,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    status_menikah,
    tipe,
    spesialis,
  } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_karyawan (id, nama, username, email, password, is_dev, is_manager, is_admin, is_resepsionis, is_perawat, is_dokter, is_manajemen, jenis_kelamin, nomor_kitas, tipe_izin, nomor_izin, kadaluarsa_izin, nomor_hp, tempat_lahir, tanggal_lahir, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, status_menikah, tipe, spesialis, is_active, created_at, updated_at, is_finance, is_cashier) VALUES ('${id}', '${nama}', '${username}', '${email}', '${password}', 0, '${is_manager}', '${is_admin}', '${is_resepsionis}', '${is_perawat}', '${is_dokter}', '${is_manajemen}', '${jenis_kelamin}', '${nomor_kitas}', '${tipe_izin}', '${nomor_izin}', '${kadaluarsa_izin}', '${nomor_hp}', '${tempat_lahir}', '${tanggal_lahir}', '${alamat}', '${provinsi}', '${kota}', '${kecamatan}', '${kelurahan}', '${kode_pos}', '${status_menikah}', '${tipe}', '${spesialis}', 1, NOW(), NOW(), '${is_finance}', '${is_cashier}')`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKaryawan = ({
  search,
  searchTipe,
  searchSpesialis,
  searchStatus,
  searchClinic,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kry.id, kt.id_klinik, kln.id, kry.nama, kry.username, kry.email, kry.is_dev, kry.is_manager, kry.is_admin, kry.is_resepsionis, kry.is_perawat, kry.is_dokter, kry.is_manajemen, kry.is_finance, kry.is_cashier, kry.jenis_kelamin, kry.nomor_kitas, kry.tipe_izin, kry.nomor_izin, to_char(kry.kadaluarsa_izin, 'YYYY-MM-DD') as kadaluarsa_izin, kry.nomor_hp, kry.tempat_lahir, to_char(kry.tanggal_lahir, 'YYYY-MM-DD') as tanggal_lahir, kry.alamat, kry.provinsi, kry.kota, kry.kecamatan, kry.kelurahan, kry.kode_pos, kry.status_menikah, kry.tipe, kry.spesialis, kry.is_active, to_char(kry.created_at, 'DD Month YYYY - HH24:MI') as created_at, to_char(kry.updated_at, 'DD Month YYYY - HH24:MI') as updated_at
      FROM tbl_karyawan as kry 
      INNER JOIN tbl_kontrak AS kt ON kry.id = kt.id_karyawan
      INNER JOIN tbl_klinik AS kln ON kt.id_klinik = kln.id
      WHERE kln.id ILIKE '%${searchClinic}%'
      AND kry.nama ILIKE '%${search}%' 
      AND kry.tipe ILIKE '%${searchTipe}%' 
      AND kry.spesialis ILIKE '%${searchSpesialis}%' 
      AND CAST(kry.is_active AS TEXT) ILIKE '%${searchStatus}%' 
      ORDER BY kry.${sortBy} ${sortOrder} 
      LIMIT ${limit} 
      OFFSET ${offset}`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKaryawanById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kry.id, kry.nama, kry.username, kry.email, kry.is_dev, kry.is_manager, kry.is_admin, kry.is_resepsionis, kry.is_perawat, kry.is_dokter, kry.is_manajemen, kry.is_finance, kry.is_cashier, kry.jenis_kelamin, kry.nomor_kitas, kry.tipe_izin, kry.nomor_izin, to_char(kry.kadaluarsa_izin, 'YYYY-MM-DD') as kadaluarsa_izin, kry.nomor_hp, kry.tempat_lahir, to_char(kry.tanggal_lahir, 'YYYY-MM-DD') as tanggal_lahir, kry.alamat, kry.provinsi, kry.kota, kry.kecamatan, kry.kelurahan, kry.kode_pos, kry.status_menikah, kry.tipe, kry.spesialis, kry.is_active, to_char(kry.created_at, 'YYYY Month DD - HH24:MI') as created_at, to_char(kry.updated_at, 'YYYY Month DD - HH24:MI') as updated_at FROM tbl_karyawan as kry WHERE kry.id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateKaryawan = (data) => {
  const {
    id,
    nama,
    username,
    email,
    is_admin,
    is_resepsionis,
    is_perawat,
    is_dokter,
    is_manajemen,
    is_cashier,
    is_finance,
    jenis_kelamin,
    nomor_kitas,
    tipe_izin,
    nomor_izin,
    kadaluarsa_izin,
    nomor_hp,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    status_menikah,
    tipe,
    spesialis,
    hashPassword,
  } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    if (hashPassword) {
      pool.query(
        `UPDATE tbl_karyawan SET nama = '${nama}', username = '${username}', password = '${hashPassword}', email = '${email}', is_dev = 0, is_manager = 0, is_admin = '${is_admin}', is_resepsionis = '${is_resepsionis}', is_perawat = '${is_perawat}', is_dokter = '${is_dokter}', is_manajemen = '${is_manajemen}', is_finance = '${is_finance}', is_cashier = '${is_cashier}', jenis_kelamin = '${jenis_kelamin}', nomor_kitas = '${nomor_kitas}', tipe_izin = '${tipe_izin}', nomor_izin = '${nomor_izin}', kadaluarsa_izin = '${kadaluarsa_izin}', nomor_hp = '${nomor_hp}', tempat_lahir = '${tempat_lahir}', tanggal_lahir = '${tanggal_lahir}', alamat = '${alamat}', provinsi = '${provinsi}', kota = '${kota}', kecamatan = '${kecamatan}', kelurahan = '${kelurahan}', kode_pos = '${kode_pos}', status_menikah = '${status_menikah}', tipe = '${tipe}', spesialis = '${spesialis}' WHERE id = '${id}'`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    } else {
      pool.query(
        `UPDATE tbl_karyawan SET nama = '${nama}', username = '${username}', email = '${email}', is_dev = 0, is_manager = 0, is_admin = '${is_admin}', is_resepsionis = '${is_resepsionis}', is_perawat = '${is_perawat}', is_dokter = '${is_dokter}', is_manajemen = '${is_manajemen}', is_finance = '${is_finance}', is_cashier = '${is_cashier}', jenis_kelamin = '${jenis_kelamin}', nomor_kitas = '${nomor_kitas}', tipe_izin = '${tipe_izin}', nomor_izin = '${nomor_izin}', kadaluarsa_izin = '${kadaluarsa_izin}', nomor_hp = '${nomor_hp}', tempat_lahir = '${tempat_lahir}', tanggal_lahir = '${tanggal_lahir}', alamat = '${alamat}', provinsi = '${provinsi}', kota = '${kota}', kecamatan = '${kecamatan}', kelurahan = '${kelurahan}', kode_pos = '${kode_pos}', status_menikah = '${status_menikah}', tipe = '${tipe}', spesialis = '${spesialis}' WHERE id = '${id}'`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    }
  });
};

const updatePhotoKaryawan = (data) => {
  const { id, foto } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET foto = '${foto}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updatePasswordKaryawan = (data) => {
  const { id, password } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET password = '${password}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const archiveKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET is_active = 0 WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const activateKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET is_active = 1 WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM tbl_karyawan WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  findEmail,
  findUsername,
  findLogin,
  findContract,
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
};
