const Pool = require('../config/db');

const insertKlinikPasien = (data) => {
  const { id, id_klinik, id_pasien, jumlah_pakai, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_pasien 
        (id, id_klinik, id_pasien, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik}', '${id_pasien}', ${is_active}, 
        NOW(), NOW())`,
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

const allKlinikPasien = ({
  search,
  searchNamaKlinik,
  searchNamaPasien,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_klinik_pasien.is_active, 
        tbl_klinik_pasien.created_at, tbl_klinik_pasien.updated_at
      FROM tbl_klinik_pasien AS tbl_klinik_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_klinik_pasien.id_pasien = tbl_pasien.id
      WHERE
        tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
      AND
        tbl_pasien.nama_lengkap ILIKE '%${searchNamaPasien}%' 
      AND
        CAST(tbl_klinik_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_pasien.${sortBy} ${sortOrder} 
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

const countAllKlinikPasien = (
  search,
  searchNamaKlinik,
  searchNamaPasien,
  searchStatus
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_pasien AS tbl_klinik_pasien
    INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
    INNER JOIN tbl_pasien AS tbl_pasien ON tbl_klinik_pasien.id_pasien = tbl_pasien.id
    WHERE
    tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
    AND
    tbl_pasien.nama_lengkap ILIKE '%${searchNamaPasien}%' 
    AND
    CAST(tbl_klinik_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikPasienByIdKlinikPasien = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_klinik_pasien.is_active, 
        tbl_klinik_pasien.created_at, tbl_klinik_pasien.updated_at
      FROM tbl_klinik_pasien AS tbl_klinik_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_klinik_pasien.id_pasien = tbl_pasien.id
      WHERE tbl_klinik_pasien.id = '${id}'`,
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

const findKlinikPasienByIdKlinikPasien = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_pasien WHERE id = '${id}'`,
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

const getKlinikPasienByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_klinik_pasien.is_active, 
        tbl_klinik_pasien.created_at, tbl_klinik_pasien.updated_at
      FROM tbl_klinik_pasien AS tbl_klinik_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_klinik_pasien.id_pasien = tbl_pasien.id
      WHERE tbl_klinik_pasien.id_klinik = '${id_klinik}'`,
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

const findKlinikPasienByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_pasien WHERE id_klinik = '${id_klinik}'`,
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

const getKlinikPasienByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_pasien.id, 
        tbl_klinik_pasien.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_klinik_pasien.is_active, 
        tbl_klinik_pasien.created_at, tbl_klinik_pasien.updated_at
      FROM tbl_klinik_pasien AS tbl_klinik_pasien
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_klinik_pasien.id_klinik = tbl_klinik.id
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_klinik_pasien.id_pasien = tbl_pasien.id
      WHERE tbl_klinik_pasien.id_pasien = '${id_pasien}'`,
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

const findKlinikPasienByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_pasien WHERE id_pasien = '${id_pasien}'`,
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

const editKlinikPasien = (data) => {
  const { id, id_klinik, id_pasien, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_pasien 
      SET
        id_klinik='${id_klinik}', id_pasien='${id_pasien}', is_active=${is_active}, 
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

const editKlinikPasienActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_pasien 
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

const editKlinikPasienArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_pasien 
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

const deleteKlinikPasien = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_pasien WHERE id='${id}'`,
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

module.exports = {
  insertKlinikPasien,
  allKlinikPasien,
  countAllKlinikPasien,
  getKlinikPasienByIdKlinikPasien,
  findKlinikPasienByIdKlinikPasien,
  getKlinikPasienByIdKlinik,
  findKlinikPasienByIdKlinik,
  getKlinikPasienByIdPasien,
  findKlinikPasienByIdPasien,
  editKlinikPasien,
  editKlinikPasienActivate,
  editKlinikPasienArchive,
  deleteKlinikPasien,
};
