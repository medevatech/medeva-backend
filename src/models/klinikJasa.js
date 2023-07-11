const pool = require("../config/db");

const createServiceClinic = (data) => {
  const { id, id_clinic, name, price } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_klinik_jasa (id, id_klinik, nama, harga)
            VALUES ('${id}', '${id_clinic}', '${name}', '${price}')`,
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

const getServiceClinic = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kj.id, kj.id_klinik, kj.nama, kj.harga, kln.nama_klinik
            FROM tbl_klinik_jasa AS kj
            INNER JOIN tbl_klinik AS kln ON kj.id_klinik = kln.id`,
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

const getServiceClinicById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kj.id, kj.id_klinik, kj.nama, kj.harga, kln.nama_klinik
            FROM tbl_klinik_jasa AS kj
            INNER JOIN tbl_klinik AS kln ON kj.id_klinik = kln.id
            WHERE kj.id = '${id}'`,
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

const updateServiceClinic = (id, data) => {
  const { id_clinic, name, price } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET id_klinik = '${id_clinic}'
            nama = '${name}'
            harga = '${price}'
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

const archiveServiceClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET is_active = 0
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

const activateServiceClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET is_active = 1
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
  createServiceClinic,
  getServiceClinic,
  getServiceClinicById,
  updateServiceClinic,
  archiveServiceClinic,
  activateServiceClinic,
};
