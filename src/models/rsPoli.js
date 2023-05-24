const Pool = require('../config/db');

const insertRSPoli = (data) => {
  const { id, id_rs, id_poli, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rs_poli 
        (id, id_rs, id_poli, is_active,
          created_at, updated_at) 
      VALUES
        ('${id}', '${id_rs}', '${id_poli}', ${is_active}, 
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

const allRSPoli = ({
  search,
  searchRS,
  searchPoli,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs_poli.id, 
        tbl_rs_poli.id_rs, tbl_rs.nama AS nama_rs,
        tbl_rs_poli.id_poli, tbl_poli.nama AS nama_poli,
        tbl_rs_poli.created_at, tbl_rs_poli.updated_at
      FROM tbl_rs_poli AS tbl_rs_poli
      INNER JOIN tbl_rs AS tbl_rs ON tbl_rs_poli.id_rs = tbl_rs.id
      INNER JOIN tbl_poli AS tbl_poli ON tbl_rs_poli.id_poli = tbl_poli.id
      WHERE
        tbl_rs_poli.id_rs ILIKE '%${search}%'
      AND 
        tbl_rs.nama ILIKE '%${searchRS}%'
      AND 
        tbl_poli.nama ILIKE '%${searchPoli}%'
      AND 
        CAST (tbl_rs_poli.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_rs_poli.${sortBy} ${sortOrder} 
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

const countAllRSPoli = (search, searchRS, searchPoli, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_rs_poli AS tbl_rs_poli
  INNER JOIN tbl_rs AS tbl_rs ON tbl_rs_poli.id_rs = tbl_rs.id
  INNER JOIN tbl_poli AS tbl_poli ON tbl_rs_poli.id_poli = tbl_poli.id
  WHERE
    tbl_rs_poli.id_rs ILIKE '%${search}%'
  AND 
    tbl_rs.nama ILIKE '%${searchRS}%'
  AND 
    tbl_poli.nama ILIKE '%${searchPoli}%'
  AND 
    CAST (tbl_rs_poli.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getRSPoliByIdRSPoli = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs_poli.id, 
        tbl_rs_poli.id_rs, tbl_rs.nama AS nama_rs,
        tbl_rs_poli.id_poli, tbl_poli.nama AS nama_poli,
        tbl_rs_poli.created_at, tbl_rs_poli.updated_at
      FROM tbl_rs_poli AS tbl_rs_poli
      INNER JOIN tbl_rs AS tbl_rs ON tbl_rs_poli.id_rs = tbl_rs.id
      INNER JOIN tbl_poli AS tbl_poli ON tbl_rs_poli.id_poli = tbl_poli.id
      WHERE tbl_rs_poli.id = '${id}'`,
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

const findRSPoliByIdRSPoli = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rs_poli WHERE id = '${id}'`,
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

const editRSPoli = (data) => {
  const { id, id_rs, id_poli, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs_poli 
      SET
        id_rs='${id_rs}', id_poli='${id_poli}', is_active=${is_active},
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

const editRSPoliActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs_poli 
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

const deleteRSPoli = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_rs_poli WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertRSPoli,
  allRSPoli,
  countAllRSPoli,
  getRSPoliByIdRSPoli,
  findRSPoliByIdRSPoli,
  editRSPoli,
  editRSPoliActiveArchive,
  deleteRSPoli,
};
