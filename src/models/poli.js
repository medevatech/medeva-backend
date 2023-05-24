const Pool = require('../config/db');

const insertPoli = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_poli 
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

const allPoli = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_poli.id, tbl_poli.nama, tbl_poli.is_active, 
          tbl_poli.created_at, tbl_poli.updated_at 
        FROM tbl_poli AS tbl_poli
        WHERE
          tbl_poli.nama ILIKE '%${search}%' 
        AND
          CAST (tbl_poli.is_active AS TEXT) ILIKE '%${searchStatus}%'
        ORDER BY tbl_poli.${sortBy} ${sortOrder} 
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

const countAllPoli = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_poli AS tbl_poli
  WHERE
    tbl_poli.nama ILIKE '%${search}%' 
  AND
    CAST (tbl_poli.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getPoliByIdPoli = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_poli.id, tbl_poli.nama, tbl_poli.is_active, 
        tbl_poli.created_at, tbl_poli.updated_at 
      FROM tbl_poli AS tbl_poli
      WHERE tbl_poli.id = '${id}'`,
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

const findPoliByIdPoli = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_poli WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editPoli = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_poli 
      SET
        nama='${nama}', is_active=${is_active}, 
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

const editPoliActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_poli 
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

const deletePoli = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_poli WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPoli,
  allPoli,
  countAllPoli,
  getPoliByIdPoli,
  findPoliByIdPoli,
  editPoli,
  editPoliActiveArchive,
  deletePoli,
};
