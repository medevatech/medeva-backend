const Pool = require('../config/db');

const insertPemeriksaan = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pemeriksaan 
        (id, nama, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', ${is_active}, 
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

const allPemeriksaan = ({
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
      `SELECT tbl_pemeriksaan.id, tbl_pemeriksaan.nama, tbl_pemeriksaan.is_active, 
        tbl_pemeriksaan.created_at, tbl_pemeriksaan.updated_at
      FROM tbl_pemeriksaan AS tbl_pemeriksaan
      WHERE
        tbl_pemeriksaan.id ILIKE '%${search}%' 
      AND
        tbl_pemeriksaan.nama ILIKE '%${searchNama}%'
      AND
        CAST(tbl_pemeriksaan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pemeriksaan.${sortBy} ${sortOrder} 
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

const countAllPemeriksaan = (search, searchNama, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_pemeriksaan
  WHERE
    tbl_pemeriksaan.id ILIKE '%${search}%' 
  AND
    tbl_pemeriksaan.nama ILIKE '%${searchNama}%'
  AND
    CAST(tbl_pemeriksaan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getPemeriksaanByIdPemeriksaan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan.id, tbl_pemeriksaan.nama, tbl_pemeriksaan.is_active, 
        tbl_pemeriksaan.created_at, tbl_pemeriksaan.updated_at
      FROM tbl_pemeriksaan AS tbl_pemeriksaan
      WHERE tbl_pemeriksaan.id = '${id}'`,
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

const findPemeriksaanByIdPemeriksaan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan WHERE id = '${id}'`,
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

const editPemeriksaan = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan 
      SET
        nama='${nama}', is_active=${is_active}
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

const editPemeriksaanActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan 
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

const deletePemeriksaan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_pemeriksaan WHERE id='${id}'`,
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
  insertPemeriksaan,
  allPemeriksaan,
  countAllPemeriksaan,
  getPemeriksaanByIdPemeriksaan,
  findPemeriksaanByIdPemeriksaan,
  editPemeriksaan,
  editPemeriksaanActiveArchive,
  deletePemeriksaan,
};
