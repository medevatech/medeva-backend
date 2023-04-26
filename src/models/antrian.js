const pool = require("../config/db");

const countAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) AS total FROM tbl_antrian WHERE tanggal = '${date}'`,
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

const createAntrian = (data) => {
  const { id, id_jaga, id_pasien, no_antrian, tanggal, prioritas } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_antrian (id, id_jaga, id_pasien, tanggal, no_antrian, status, prioritas, created_at, updated_at) VALUES('${id}', '${id_jaga}', '${id_pasien}', '${tanggal}', '${no_antrian}', 1, '${prioritas}', NOW(), NOW())`,
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

const getAntrian = ({ searchName, searchDivisi, sortBy, sortOrder }) => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT antrian.id, antrian.id_jaga, antrian.id_pasien, antrian.no_antrian, antrian.status, antrian.prioritas, pasien.nama_lengkap as nama_lengkap, pasien.tipe_kitas as tipe_kitas, pasien.nomor_kitas as nomor_kitas, pasien.golongan_darah as golongan_darah, jaga.id_karyawan as id_karyawan, jaga.id_divisi as id_divisi, karyawan.nama as nama_karyawan, divisi.tipe as divisi FROM tbl_antrian as antrian INNER JOIN tbl_pasien as pasien ON antrian.id_pasien = pasien.id INNER JOIN tbl_jaga as jaga ON antrian.id_jaga = jaga.id INNER JOIN tbl_karyawan as karyawan ON jaga.id_karyawan = karyawan.id INNER JOIN tbl_divisi as divisi ON jaga.id_divisi = divisi.id WHERE tanggal = '${date}' AND status = 1 AND divisi.tipe ILIKE '%${searchDivisi}%' AND pasien.nama_lengkap ILIKE '%${searchName}%' ORDER BY antrian.${sortBy} ${sortOrder}`,
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

const getTotalAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) as total FROM tbl_antrian WHERE tanggal = '${date}' AND status = 1`,
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

const getRestAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) as total FROM tbl_antrian WHERE tanggal = '${date}' AND status = 0`,
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

const getNowAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT no_antrian FROM tbl_antrian WHERE tanggal = '${date}' AND status = 0 ORDER BY updated_at DESC LIMIT 1`,
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

const getNextAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT no_antrian FROM tbl_antrian WHERE tanggal = '${date}' AND status = 1 ORDER BY no_antrian ASC LIMIT 1`,
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

const updateAntrian = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_antrian SET status = 0, updated_at = NOW() WHERE id = '${id}'`,
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
  countAntrian,
  createAntrian,
  getAntrian,
  getTotalAntrian,
  getRestAntrian,
  getNowAntrian,
  getNextAntrian,
  updateAntrian,
};
