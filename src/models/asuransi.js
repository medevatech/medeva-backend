const Pool = require('../config/db');

const insertAsuransi = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_asuransi 
        (id, nama, created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', NOW(), NOW())`,
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

const allAsuransi = ({ search, pasien, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, tbl_asuransi.nama, 
        tbl_asuransi.created_at,
        tbl_asuransi.updated_at
      FROM tbl_asuransi AS tbl_asuransi
      WHERE
      tbl_asuransi.nama ILIKE '%${search}%'
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

const countAllAsuransi = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_asuransi`);
};

const getAsuransiById = ({ id }) => {
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

const findAsuransiById = (id) => {
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
  const { id, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_asuransi 
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
  insertAsuransi,
  allAsuransi,
  countAllAsuransi,
  getAsuransiById,
  findAsuransiById,
  editAsuransi,
};
