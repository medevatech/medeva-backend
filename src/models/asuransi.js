const Pool = require('../config/db');

const insertAsuransi = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_asuransi
        (id, nama, is_active, created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', ${is_active}, NOW(), NOW())`,
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

const allAsuransi = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, tbl_asuransi.nama, tbl_asuransi.is_active, 
        tbl_asuransi.created_at,
        tbl_asuransi.updated_at
      FROM tbl_asuransi AS tbl_asuransi
      WHERE
        tbl_asuransi.nama ILIKE '%${search}%'
      AND
        CAST(tbl_asuransi.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_asuransi.${sortBy} ${sortOrder} 
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

const countAllAsuransi = (search, searchStatus) => {
  return Pool.query(`SELECT COUNT(*) AS total 
  FROM tbl_asuransi
  WHERE
    tbl_asuransi.nama ILIKE '%${search}%' 
  AND
    CAST(tbl_asuransi.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getAsuransiByIdAsuransi = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, tbl_asuransi.nama, 
        tbl_asuransi.created_at,
        tbl_asuransi.updated_at
      FROM tbl_asuransi AS tbl_asuransi
      WHERE tbl_asuransi.id = '${id}'`,
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

const findAsuransiByIdAsuransi = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_asuransi WHERE id = '${id}'
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

const editAsuransi = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_asuransi 
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

const editAsuransiActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_asuransi 
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

const deleteAsuransi = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_asuransi WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertAsuransi,
  allAsuransi,
  countAllAsuransi,
  getAsuransiByIdAsuransi,
  findAsuransiByIdAsuransi,
  editAsuransi,
  editAsuransiActiveArchive,
  deleteAsuransi,
};
