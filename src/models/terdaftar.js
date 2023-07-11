const Pool = require('../config/db');

const insertTerdaftar = (data) => {
  const { id, id_pasien, id_klinik, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_terdaftar 
        (id, id_pasien, id_klinik, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_pasien}', '${id_klinik}', ${is_active}, 
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

const allTerdaftar = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_terdaftar.id, 
        tbl_terdaftar.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_terdaftar.id_klinik, tbl_klinik.nama_klinik AS nama_klinik, 
        tbl_terdaftar.is_active, 
        tbl_terdaftar.created_at, tbl_terdaftar.updated_at
      FROM tbl_terdaftar AS tbl_terdaftar
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_terdaftar.id_pasien = tbl_pasien.id
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_terdaftar.id_klinik = tbl_klinik.id
      WHERE
        tbl_pasien.nama_lengkap ILIKE '%${search}%' 
      OR
        tbl_klinik.nama_klinik ILIKE '%${search}%' 
      AND
        CAST(tbl_terdaftar.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_terdaftar.${sortBy} ${sortOrder} 
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

const countAllTerdaftar = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_terdaftar AS tbl_terdaftar
    INNER JOIN tbl_pasien AS tbl_pasien ON tbl_terdaftar.id_pasien = tbl_pasien.id
    INNER JOIN tbl_klinik AS tbl_klinik ON tbl_terdaftar.id_klinik = tbl_klinik.id
    WHERE
        tbl_pasien.nama_lengkap ILIKE '%${search}%' 
    OR
        tbl_klinik.nama_klinik ILIKE '%${search}%' 
    AND
        CAST(tbl_terdaftar.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getTerdaftarByIdTerdaftar = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_terdaftar.id, 
        tbl_terdaftar.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_terdaftar.id_klinik, tbl_klinik.nama_klinik AS nama_klinik, 
        tbl_terdaftar.is_active, 
        tbl_terdaftar.created_at, tbl_terdaftar.updated_at
      FROM tbl_terdaftar AS tbl_terdaftar
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_terdaftar.id_pasien = tbl_pasien.id
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_terdaftar.id_klinik = tbl_klinik.id
      WHERE tbl_terdaftar.id = '${id}'`,
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

const findTerdaftarByIdTerdaftar = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_terdaftar WHERE id = '${id}'`,
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

const getTerdaftarByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_terdaftar.id, 
        tbl_terdaftar.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_terdaftar.id_klinik, tbl_klinik.nama_klinik AS nama_klinik, 
        tbl_terdaftar.is_active, 
        tbl_terdaftar.created_at, tbl_terdaftar.updated_at
      FROM tbl_terdaftar AS tbl_terdaftar
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_terdaftar.id_pasien = tbl_pasien.id
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_terdaftar.id_klinik = tbl_klinik.id
      WHERE tbl_terdaftar.id_pasien = '${id_pasien}'`,
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

const findTerdaftarByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_terdaftar WHERE id_pasien = '${id_pasien}'`,
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

const getTerdaftarByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_terdaftar.id, 
        tbl_terdaftar.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_terdaftar.id_klinik, tbl_klinik.nama_klinik AS nama_klinik, 
        tbl_terdaftar.is_active, 
        tbl_terdaftar.created_at, tbl_terdaftar.updated_at
      FROM tbl_terdaftar AS tbl_terdaftar
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_terdaftar.id_pasien = tbl_pasien.id
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_terdaftar.id_klinik = tbl_klinik.id
      WHERE tbl_terdaftar.id_klinik = '${id_klinik}'`,
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

const findTerdaftarByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_terdaftar WHERE id_klinik = '${id_klinik}'`,
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

const editTerdaftar = (data) => {
  const { id, id_pasien, id_klinik, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_terdaftar 
      SET
        id_pasien='${id_pasien}', id_klinik='${id_klinik}',
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

const editTerdaftarActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_terdaftar 
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

const editTerdaftarArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_terdaftar 
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

const deleteTerdaftar = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_terdaftar WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertTerdaftar,
  allTerdaftar,
  countAllTerdaftar,
  getTerdaftarByIdTerdaftar,
  findTerdaftarByIdTerdaftar,
  getTerdaftarByIdPasien,
  findTerdaftarByIdPasien,
  getTerdaftarByIdKlinik,
  findTerdaftarByIdKlinik,
  editTerdaftar,
  editTerdaftarActivate,
  editTerdaftarArchive,
  deleteTerdaftar,
};
