const Pool = require('../config/db');

const insertRS = (data) => {
  const { id, nama, tipe, alamat, nomor_telepon } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rs 
        (id, nama, tipe, alamat, nomor_telepon,
            created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', '${tipe}', '${alamat}', '${nomor_telepon}',
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

const allRS = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs.id, tbl_rs.nama, tbl_rs.tipe, tbl_rs.alamat, tbl_rs.nomor_telepon,
        tbl_rs.created_at, tbl_rs.updated_at
      FROM tbl_rs AS tbl_rs
      WHERE tbl_rs.nama
      ILIKE '%${search}%' ORDER BY tbl_rs.${sortBy} ${sortOrder} 
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

const countAllRS = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_rs`);
};

const getRSById = ({ id }) => {
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

const findRSById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rs WHERE id = '${id}'
           `,
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

const editRS = (data) => {
  const { id, nama, tipe, alamat, nomor_telepon } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs 
          SET
            nama='${nama}', tipe='${tipe}', alamat='${alamat}', nomor_telepon='${nomor_telepon}',
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

module.exports = {
  insertRS,
  allRS,
  countAllRS,
  findRSById,
  getRSById,
  editRS,
};
