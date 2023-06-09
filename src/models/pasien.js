const Pool = require('../config/db');

const insertPasien = (data) => {
  const {
    id,
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
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pasien 
        (id, nama_lengkap, jenis_kelamin, tipe_kitas, nomor_kitas, 
            nomor_hp, tempat_lahir, tanggal_lahir, alamat, kelurahan, kecamatan,
            kota, provinsi, kode_pos, agama, kewarganegaraan,
            pekerjaan, status_menikah, golongan_darah, is_active, created_at, updated_at) 
        VALUES
        ('${id}', '${nama_lengkap}', '${jenis_kelamin}', '${tipe_kitas}', '${nomor_kitas}', '${nomor_hp}',
            '${tempat_lahir}', '${tanggal_lahir}', '${alamat}', '${kelurahan}', '${kecamatan}', 
            '${kota}', '${provinsi}', '${kode_pos}', '${agama}', '${kewarganegaraan}',
            '${pekerjaan}', '${status_menikah}', '${golongan_darah}', ${is_active}, NOW(), NOW())`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const allPasien = ({
  search,
  searchKlinik,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_pasien.nama_lengkap, tbl_pasien.jenis_kelamin, tbl_pasien.tipe_kitas, tbl_pasien.nomor_kitas, 
        tbl_pasien.nomor_hp, tbl_pasien.tempat_lahir, tbl_pasien.tanggal_lahir, tbl_pasien.alamat, tbl_pasien.kelurahan, tbl_pasien.kecamatan,
        tbl_pasien.kota, tbl_pasien.provinsi, tbl_pasien.kode_pos, tbl_pasien.agama, tbl_pasien.kewarganegaraan, 
        tbl_pasien.pekerjaan, tbl_pasien.status_menikah, tbl_pasien.golongan_darah, tbl_pasien.is_active, 
        tbl_pasien.created_at, tbl_pasien.updated_at
      FROM tbl_pasien AS tbl_pasien
      INNER JOIN tbl_klinik_pasien AS tbl_klinik_pasien ON tbl_pasien.id = tbl_klinik_pasien.id_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      WHERE
        tbl_pasien.nama_lengkap ILIKE '%${search}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchKlinik}%' 
      AND
        CAST(tbl_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pasien.${sortBy} ${sortOrder} 
      LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const countAllPasien = (search, searchKlinik, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_pasien AS tbl_pasien
    INNER JOIN tbl_klinik_pasien AS tbl_klinik_pasien ON tbl_pasien.id = tbl_klinik_pasien.id_pasien
    INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
    WHERE
      tbl_pasien.nama_lengkap ILIKE '%${search}%' 
    AND
      tbl_klinik.nama_klinik ILIKE '%${searchKlinik}%' 
    AND
      CAST(tbl_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
  `
  );
};

const getPasienByIdPasien = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_pasien.nama_lengkap, tbl_pasien.jenis_kelamin, tbl_pasien.tipe_kitas, tbl_pasien.nomor_kitas, 
        tbl_pasien.nomor_hp, tbl_pasien.tempat_lahir, tbl_pasien.tanggal_lahir, tbl_pasien.alamat, tbl_pasien.kelurahan, tbl_pasien.kecamatan,
        tbl_pasien.kota, tbl_pasien.provinsi, tbl_pasien.kode_pos, tbl_pasien.agama, tbl_pasien.kewarganegaraan, 
        tbl_pasien.pekerjaan, tbl_pasien.status_menikah, tbl_pasien.golongan_darah, tbl_pasien.is_active, 
        tbl_pasien.created_at, tbl_pasien.updated_at
      FROM tbl_pasien AS tbl_pasien
      INNER JOIN tbl_klinik_pasien AS tbl_klinik_pasien ON tbl_pasien.id = tbl_klinik_pasien.id_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      WHERE tbl_pasien.id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findPasienByIdPasien = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_pasien WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editPasien = (data) => {
  const {
    id,
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pasien 
      SET
        nama_lengkap='${nama_lengkap}', jenis_kelamin='${jenis_kelamin}', tipe_kitas='${tipe_kitas}', nomor_kitas='${nomor_kitas}', 
        nomor_hp='${nomor_hp}', tempat_lahir='${tempat_lahir}', tanggal_lahir='${tanggal_lahir}', alamat='${alamat}', kelurahan='${kelurahan}', kecamatan='${kecamatan}', 
        kota='${kota}', provinsi='${provinsi}', kode_pos='${kode_pos}', agama='${agama}', kewarganegaraan='${kewarganegaraan}', 
        pekerjaan='${pekerjaan}', status_menikah='${status_menikah}', golongan_darah='${golongan_darah}', 
        updated_at=NOW()
      WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const editPasienActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pasien 
      SET
        is_active=${is_active}, 
        updated_at=NOW()
      WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const deletePasien = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_pasien WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPasien,
  allPasien,
  countAllPasien,
  getPasienByIdPasien,
  findPasienByIdPasien,
  editPasien,
  editPasienActiveArchive,
  deletePasien,
};
