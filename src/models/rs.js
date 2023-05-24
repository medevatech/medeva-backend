const Pool = require('../config/db');

const insertRS = (data) => {
  const { id, nama, tipe, alamat, nomor_telepon, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rs 
        (id, nama, tipe, alamat, nomor_telepon, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', '${tipe}', '${alamat}', '${nomor_telepon}', ${is_active},
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

const allRS = ({ search, searchStatus, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs.id, tbl_rs.nama, tbl_rs.tipe, tbl_rs.alamat, tbl_rs.nomor_telepon, tbl_rs.is_active,
        tbl_rs.created_at, tbl_rs.updated_at
      FROM tbl_rs AS tbl_rs
      WHERE
        tbl_rs.nama ILIKE '%${search}%' 
      AND
        CAST (tbl_rs.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_rs.${sortBy} ${sortOrder} 
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

const countAllRS = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_rs AS tbl_rs
  WHERE
    tbl_rs.nama ILIKE '%${search}%' 
  AND
    CAST (tbl_rs.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getRSByIdRS = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs.id, tbl_rs.nama, tbl_rs.tipe, tbl_rs.alamat, tbl_rs.nomor_telepon,
        tbl_rs.created_at, tbl_rs.updated_at
      FROM tbl_rs AS tbl_rs
      WHERE tbl_rs.id = '${id}'`,
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

const findRSByIdRS = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_rs WHERE id = '${id}' `, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editRS = (data) => {
  const { id, nama, tipe, alamat, nomor_telepon, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs 
      SET
        nama='${nama}', tipe='${tipe}', alamat='${alamat}', nomor_telepon='${nomor_telepon}', is_active=${is_active},
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

const editRSActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs 
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

const deleteRS = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_rs WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertRS,
  allRS,
  countAllRS,
  getRSByIdRS,
  findRSByIdRS,
  editRS,
  editRSActiveArchive,
  deleteRS,
};
