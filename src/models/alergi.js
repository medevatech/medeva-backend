const Pool = require('../config/db');

const insertAlergi = (data) => {
  const { id, nama, kategori, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_alergi 
        (id, nama, kategori, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', '${kategori}', ${is_active}, 
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

const allAlergi = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi.id, tbl_alergi.nama, tbl_alergi.kategori, tbl_alergi.is_active,
        tbl_alergi.created_at, tbl_alergi.updated_at
      FROM tbl_alergi AS tbl_alergi
      WHERE
        tbl_alergi.nama ILIKE '%${search}%' 
      AND
        CAST (tbl_alergi.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_alergi.${sortBy} ${sortOrder} 
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

const countAllAlergi = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_alergi AS tbl_alergi
  WHERE
    tbl_alergi.nama ILIKE '%${search}%' 
  AND
    CAST (tbl_alergi.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getAlergiByIdAlergi = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi.id, tbl_alergi.nama, tbl_alergi.kategori, tbl_alergi.is_active,
        tbl_alergi.created_at, tbl_alergi.updated_at
      FROM tbl_alergi AS tbl_alergi
      WHERE tbl_alergi.id = '${id}'`,
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

const findAlergiByIdAlergi = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_alergi WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editAlergi = (data) => {
  const { id, nama, kategori, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi 
      SET
        nama='${nama}', kategori='${kategori}', is_active=${is_active},
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

const editAlergiActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi 
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

const deleteAlergi = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_alergi WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertAlergi,
  allAlergi,
  countAllAlergi,
  getAlergiByIdAlergi,
  findAlergiByIdAlergi,
  editAlergi,
  editAlergiActiveArchive,
  deleteAlergi,
};
