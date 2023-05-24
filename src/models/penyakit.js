const Pool = require('../config/db');

const insertPenyakit = (data) => {
  const { id, kode_icd10, nama_penyakit, kronis, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_penyakit 
        (id, kode_icd10, nama_penyakit, kronis, is_active, 
        created_at, updated_at) 
      VALUES
        ('${id}', '${kode_icd10}', '${nama_penyakit}', '${kronis}', ${is_active}, 
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

const countAll = () => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_penyakit`);
};

const allPenyakit = ({
  search,
  searchNama,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_penyakit.id, tbl_penyakit.kode_icd10, tbl_penyakit.nama_penyakit, tbl_penyakit.kronis, tbl_penyakit.is_active, 
        tbl_penyakit.created_at, tbl_penyakit.updated_at
      FROM tbl_penyakit AS tbl_penyakit
      WHERE 
        tbl_penyakit.kode_icd10 ILIKE '%${search}%' 
      AND
        tbl_penyakit.nama_penyakit ILIKE '%${searchNama}%'
      AND
        CAST(tbl_penyakit.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_penyakit.${sortBy} ${sortOrder} 
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

const countAllPenyakit = (search, searchNama, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_penyakit
  WHERE 
    tbl_penyakit.kode_icd10 ILIKE '%${search}%' 
  AND
    tbl_penyakit.nama_penyakit ILIKE '%${searchNama}%'
  AND
    CAST(tbl_penyakit.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getPenyakitByIdPenyakit = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_penyakit.id, tbl_penyakit.kode_icd10, tbl_penyakit.nama_penyakit, tbl_penyakit.kronis, tbl_penyakit.is_active, 
        tbl_penyakit.created_at, tbl_penyakit.updated_at
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

const findPenyakitByIdPenyakit = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_penyakit WHERE id = '${id}'`,
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
  const { id, kode_icd10, nama_penyakit, kronis, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_penyakit 
      SET
        kode_icd10='${kode_icd10}', nama_penyakit='${nama_penyakit}',  kronis='${kronis}', is_active=${is_active},
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

const editPenyakitActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_penyakit 
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

const deletePenyakit = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_penyakit WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPenyakit,
  countAll,
  allPenyakit,
  countAllPenyakit,
  getPenyakitByIdPenyakit,
  findPenyakitByIdPenyakit,
  editPenyakit,
  editPenyakitActiveArchive,
  deletePenyakit,
};
