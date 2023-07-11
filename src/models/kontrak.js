const pool = require("../config/db");

const createContract = (data) => {
  const { id, id_clinic, id_employee } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_kontrak
            (id, id_klinik, id_karyawan)
            VALUES ('${id}', '${id_clinic}', '${id_employee}')`,
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

const getContract = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kt.id, kt.id_klinik, kt.id_karyawan, kln.nama_klinik, kry.nama AS nama_karyawan
            FROM tbl_kontrak AS kt
            INNER JOIN tbl_klinik AS kln ON kt.id_klinik = kln.id
            INNER JOIN tbl_karyawan AS kry ON kt.id_karyawan = kry.id`,
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

const getContractById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kt.id, kt.id_klinik, kt.id_karyawan, kln.nama_klinik, kry.nama AS nama_karyawan
                  FROM tbl_kontrak AS kt
                  INNER JOIN tbl_klinik AS kln ON kt.id_klinik = kln.id
                  INNER JOIN tbl_karyawan AS kry ON kt.id_karyawan = kry.id
                  WHERE kt.id = '${id}'`,
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

const getContractByIdEmployee = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kt.id, kt.id_klinik, kt.id_karyawan, kln.nama_klinik, kry.nama AS nama_karyawan
            FROM tbl_kontrak AS kt
            INNER JOIN tbl_klinik AS kln ON kt.id_klinik = kln.id
            INNER JOIN tbl_karyawan AS kry ON kt.id_karyawan = kry.id
            WHERE kt.id_karyawan = '${id}'`,
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

const updateContract = (id, data) => {
  const { id_clinic, id_employee } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_kontrak
            SET id_klinik = '${id_clinic}',
            id_karyawan = '${id_employee}'
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

const archiveContract = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_kontrak
            SET is_active = 0
            WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject;
        }
      }
    );
  });
};

const activateContract = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_kontrak
            SET is_active = 1
            WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject;
        }
      }
    );
  });
};

const deleteContract = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_kontrak
            WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject;
        }
      }
    );
  });
};

module.exports = {
  createContract,
  getContract,
  getContractById,
  getContractByIdEmployee,
  updateContract,
  archiveContract,
  activateContract,
  deleteContract,
};
