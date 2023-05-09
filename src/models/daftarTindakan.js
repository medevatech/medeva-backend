const Pool = require('../config/db');

const insertDaftarTindakan = (data) => {
  const { id, id_kunjungan, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_daftar_tindakan 
        (id, id_kunjungan, nama,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${nama}', 
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

const allDaftarTindakan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.id_kunjungan, tbl_daftar_tindakan.nama, 
        tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
      FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      WHERE tbl_daftar_tindakan.nama
      ILIKE '%${search}%' ORDER BY tbl_daftar_tindakan.${sortBy} ${sortOrder} 
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

const countAllDaftarTindakan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_daftar_tindakan`);
};

const getDaftarTindakanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.id_kunjungan, tbl_daftar_tindakan.nama, 
      tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
    FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      WHERE tbl_daftar_tindakan.id = '${id}'`,
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

const findDaftarTindakanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_daftar_tindakan WHERE id = '${id}'
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

const editDaftarTindakan = (data) => {
  const { id, id_kunjungan, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
          SET
            id_kunjungan='${id_kunjungan}', nama='${nama}', 
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
  insertDaftarTindakan,
  allDaftarTindakan,
  countAllDaftarTindakan,
  findDaftarTindakanById,
  getDaftarTindakanById,
  editDaftarTindakan,
};
