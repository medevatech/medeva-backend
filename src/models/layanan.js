const Pool = require('../config/db');

const insertLayanan = (data) => {
  const { id, id_kunjungan, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_layanan 
        (id, id_kunjungan, catatan,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${catatan}',
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

const allLayanan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan, tbl_layanan.catatan, 
        tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      WHERE tbl_layanan.id
      ILIKE '%${search}%' ORDER BY tbl_layanan.${sortBy} ${sortOrder} 
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

const countAllLayanan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_layanan`);
};

const getLayananById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan, tbl_layanan.catatan, 
      tbl_layanan.created_at, tbl_layanan.updated_at
    FROM tbl_layanan AS tbl_layanan
      WHERE tbl_layanan.id = '${id}'`,
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

const findLayananById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan WHERE id = '${id}'
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

const editLayanan = (data) => {
  const { id, id_kunjungan, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan 
          SET
            id_kunjungan='${id_kunjungan}', catatan='${catatan}', 
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

const getLayananByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan, tbl_layanan.catatan, 
      tbl_layanan.created_at, tbl_layanan.updated_at
    FROM tbl_layanan AS tbl_layanan
      WHERE tbl_layanan.id_kunjungan = '${id_kunjungan}'`,
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

const findLayananByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan WHERE id_kunjungan = '${id_kunjungan}'
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

module.exports = {
  insertLayanan,
  allLayanan,
  countAllLayanan,
  findLayananById,
  getLayananById,
  editLayanan,
  getLayananByIdKunjungan,
  findLayananByIdKunjungan,
};
