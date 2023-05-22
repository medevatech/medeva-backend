const Pool = require('../config/db');

const insertAlergi = (data) => {
  const { id, nama, kategori } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_alergi 
        (id, nama, kategori,
            created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', '${kategori}', 
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

const allAlergi = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi.id, tbl_alergi.nama, tbl_alergi.kategori,
        tbl_alergi.created_at, tbl_alergi.updated_at
      FROM tbl_alergi AS tbl_alergi
      WHERE tbl_alergi.nama
      ILIKE '%${search}%' ORDER BY tbl_alergi.${sortBy} ${sortOrder} 
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

const countAllAlergi = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_alergi`);
};

const getAlergiById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi.id, tbl_alergi.nama,  tbl_alergi.kategori,
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

const findAlergiById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_alergi WHERE id = '${id}'
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

const editAlergi = (data) => {
  const { id, nama, kategori } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi 
      SET
        nama='${nama}', kategori='${kategori}', 
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
  insertAlergi,
  allAlergi,
  countAllAlergi,
  findAlergiById,
  getAlergiById,
  editAlergi,
};
