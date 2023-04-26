const pool = require("../config/db");

const findKlinik = (nama_klinik) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_klinik WHERE nama_klinik = '${nama_klinik}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const createKlinik = (data) => {
  const { id, nama_klinik, tipe, alamat, nomor_telepon } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_klinik (id, nama_klinik, tipe, alamat, nomor_telepon) VALUES('${id}', '${nama_klinik}', '${tipe}', '${alamat}', '${nomor_telepon}')`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKlinik = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_klinik
              WHERE tbl_klinik.nama_klinik ILIKE ('%${search}%')
              ORDER BY tbl_klinik.${sortBy} ${sortOrder}
              LIMIT ${limit}
              OFFSET ${offset}`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKlinikById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_klinik
              WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateKlinik = (data) => {
  const { id, nama_klinik, tipe, alamat, nomor_telepon } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik
              SET nama_klinik = '${nama_klinik}', tipe = '${tipe}', alamat = '${alamat}', nomor_telepon = '${nomor_telepon}'
              WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteKlinik = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_klinik
              WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  createKlinik,
  findKlinik,
  getKlinik,
  getKlinikById,
  updateKlinik,
  deleteKlinik,
};
