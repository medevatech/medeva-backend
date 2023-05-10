const Pool = require('../config/db');

const insertRSPoli = (data) => {
  const { id, id_rs, id_poli } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rs_poli 
        (id, id_rs, id_poli,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_rs}', '${id_poli}', 
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

const allRSPoli = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs_poli.id, 
          tbl_rs_poli.id_rs, 
          tbl_rs_poli.id_poli,
        tbl_rs_poli.created_at, tbl_rs_poli.updated_at
      FROM tbl_rs_poli AS tbl_rs_poli
      WHERE tbl_rs_poli.id_rs
      ILIKE '%${search}%' ORDER BY tbl_rs_poli.${sortBy} ${sortOrder} 
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

const countAllRSPoli = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_rs_poli`);
};

const getRSPoliById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rs_poli.id, 
          tbl_rs_poli.id_rs, 
          tbl_rs_poli.id_poli,
        tbl_rs_poli.created_at, tbl_rs_poli.updated_at
      FROM tbl_rs_poli AS tbl_rs_poli
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

const findRSPoliById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rs_poli WHERE id = '${id}'
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

const editRSPoli = (data) => {
  const { id, id_rs, id_poli } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rs_poli 
          SET
            id_rs='${id_rs}', id_poli='${id_poli}',
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
  insertRSPoli,
  allRSPoli,
  countAllRSPoli,
  findRSPoliById,
  getRSPoliById,
  editRSPoli,
};
