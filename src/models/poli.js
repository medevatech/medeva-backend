const Pool = require('../config/db');

const insertPoli = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_poli 
        (id, nama, 
            created_at, updated_at) 
        VALUES
        ('${id}', '${nama}',
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

const allPoli = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_poli.id, tbl_poli.nama, 
            to_char( tbl_poli.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_poli.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_poli AS tbl_poli
        WHERE tbl_poli.nama
        ILIKE '%${search}%' ORDER BY tbl_poli.${sortBy} ${sortOrder} 
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

const countAllPoli = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_poli`);
};

const getPoliById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_poli.id, tbl_poli.nama, 
        to_char( tbl_poli.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_poli.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
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

const findPoliById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_poli WHERE id = '${id}'
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

const editPoli = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_poli 
          SET
            nama='${nama}', 
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
  insertPoli,
  allPoli,
  countAllPoli,
  findPoliById,
  getPoliById,
  editPoli,
};
