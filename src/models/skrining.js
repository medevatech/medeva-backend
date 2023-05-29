const Pool = require('../config/db');

const insertSkrining = (data) => {
  const { id, id_pasien, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_skrining 
        (id, id_pasien, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_pasien}', ${is_active}, 
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

const allSkrining = ({
  search,
  searchPasien,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_skrining.id, 
        tbl_skrining.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_skrining.is_active, 
        tbl_skrining.created_at, tbl_skrining.updated_at 
      FROM tbl_skrining AS tbl_skrining
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_skrining.id_pasien = tbl_pasien.id
      WHERE
        tbl_skrining.id ILIKE '%${search}%'
      AND
        tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
      AND
        CAST (tbl_skrining.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_skrining.${sortBy} ${sortOrder} 
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

const countAllSkrining = (search, searchPasien, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_skrining AS tbl_skrining
  INNER JOIN tbl_pasien AS tbl_pasien ON tbl_skrining.id_pasien = tbl_pasien.id
  WHERE
    tbl_skrining.id ILIKE '%${search}%'
  AND
    tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
  AND
    CAST (tbl_skrining.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getSkriningByIdSkrining = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_skrining.id, 
        tbl_skrining.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_skrining.is_active, 
        tbl_skrining.created_at, tbl_skrining.updated_at 
      FROM tbl_skrining AS tbl_skrining
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_skrining.id_pasien = tbl_pasien.id
      WHERE tbl_skrining.id = '${id}'`,
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

const findSkriningByIdSkrining = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_skrining WHERE id = '${id}'`,
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

const editSkrining = (data) => {
  const { id, id_pasien, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_skrining 
      SET
        id_pasien='${id_pasien}', is_active=${is_active}, 
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

const editSkriningActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_skrining 
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

const deleteSkrining = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_skrining WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertSkrining,
  allSkrining,
  countAllSkrining,
  getSkriningByIdSkrining,
  findSkriningByIdSkrining,
  editSkrining,
  editSkriningActiveArchive,
  deleteSkrining,
};
