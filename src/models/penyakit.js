const Pool = require('../config/db');

const insertPenyakit = (data) => {
  const { id, kode_icd10, nama_penyakit, kronis } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_penyakit 
        (id, kode_icd10, nama_penyakit, kronis, 
            created_at, updated_at) 
        VALUES
        ('${id}', '${kode_icd10}', '${nama_penyakit}', '${kronis}', 
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

const allPenyakit = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_penyakit.id, tbl_penyakit.kode_icd10, tbl_penyakit.nama_penyakit, tbl_penyakit.kronis, 
          to_char( tbl_penyakit.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
          to_char( tbl_penyakit.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_penyakit AS tbl_penyakit
        WHERE tbl_penyakit.nama_penyakit
        ILIKE '%${search}%' ORDER BY tbl_penyakit.${sortBy} ${sortOrder} 
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

const countAllPenyakit = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_penyakit`);
};

const getPenyakitById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_penyakit.id, tbl_penyakit.kode_icd10, tbl_penyakit.nama_penyakit, tbl_penyakit.kronis, 
            to_char( tbl_penyakit.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_penyakit.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_penyakit AS tbl_penyakit
        WHERE tbl_penyakit.id = '${id}'`,
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

const findPenyakitById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_penyakit 
        WHERE
            id = '${id}' 
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

const editPenyakit = (data) => {
  const { id, kode_icd10, nama_penyakit, kronis } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_penyakit 
          SET
            kode_icd10='${kode_icd10}', nama_penyakit='${nama_penyakit}',  kronis='${kronis}',
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
  insertPenyakit,
  allPenyakit,
  countAllPenyakit,
  getPenyakitById,
  findPenyakitById,
  editPenyakit,
};
