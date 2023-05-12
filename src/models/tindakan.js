const Pool = require('../config/db');

const insertTindakan = (data) => {
  const { id, id_kunjungan, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_tindakan 
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

const allTindakan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, tbl_tindakan.catatan, 
        tbl_tindakan.created_at, tbl_tindakan.updated_at
      FROM tbl_tindakan AS tbl_tindakan
      WHERE tbl_tindakan.catatan
      ILIKE '%${search}%' ORDER BY tbl_tindakan.${sortBy} ${sortOrder} 
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

const countAllTindakan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_tindakan`);
};

const getTindakanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, tbl_tindakan.catatan, 
      tbl_tindakan.created_at, tbl_tindakan.updated_at
    FROM tbl_tindakan AS tbl_tindakan
      WHERE tbl_tindakan.id = '${id}'`,
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

const findTindakanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_tindakan WHERE id = '${id}'
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

const editTindakan = (data) => {
  const { id, id_kunjungan, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_tindakan 
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

const getTindakanByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, tbl_tindakan.catatan, 
      tbl_tindakan.created_at, tbl_tindakan.updated_at
    FROM tbl_tindakan AS tbl_tindakan
      WHERE tbl_tindakan.id_kunjungan = '${id_kunjungan}'`,
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

const findTindakanByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_tindakan WHERE id_kunjungan = '${id_kunjungan}'
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
  insertTindakan,
  allTindakan,
  countAllTindakan,
  findTindakanById,
  getTindakanById,
  editTindakan,
  getTindakanByIdKunjungan,
  findTindakanByIdKunjungan,
};
