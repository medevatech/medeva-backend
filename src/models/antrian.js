const pool = require("../config/db");

const countAntrianDaily = () => {
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

const countAntrianAll = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_antrian`);
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

const getAntrian = ({
  searchName,
  searchDivisi,
  searchDivisiName,
  searchJaga,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
  date,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT antrian.id, antrian.id_jaga, antrian.id_pasien, antrian.no_antrian, antrian.status, antrian.prioritas, pasien.nama_lengkap as nama_lengkap, pasien.tipe_kitas as tipe_kitas, pasien.nomor_kitas as nomor_kitas, pasien.golongan_darah as golongan_darah, pasien.jenis_kelamin as jenis_kelamin, to_char(pasien.tanggal_lahir, 'YYYY-MM-DD') AS tanggal_lahir, jaga.id_karyawan as id_karyawan, jaga.id_divisi as id_divisi, karyawan.nama as nama_karyawan, divisi.tipe as divisi, antrian.created_at, antrian.updated_at FROM tbl_antrian as antrian INNER JOIN tbl_pasien as pasien ON antrian.id_pasien = pasien.id INNER JOIN tbl_jaga as jaga ON antrian.id_jaga = jaga.id INNER JOIN tbl_karyawan as karyawan ON jaga.id_karyawan = karyawan.id INNER JOIN tbl_divisi as divisi ON jaga.id_divisi = divisi.id WHERE tanggal = '${date}' AND antrian.status = '${searchStatus}' AND divisi.id ILIKE '%${searchDivisi}%' AND divisi.tipe ILIKE '%${searchDivisiName}%' AND pasien.nama_lengkap ILIKE '%${searchName}%' AND antrian.id_jaga ILIKE '%${searchJaga}%' ORDER BY antrian.${sortBy}, antrian.no_antrian ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
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

const updatePrioritasAntrian = (id, data) => {
  return new Promise((resolve, reject) => {
    const { prioritas } = data;
    pool.query(
      `UPDATE tbl_antrian SET prioritas = ${prioritas}, updated_at = NOW() WHERE id = '${id}'`,
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

const deleteAntrian = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM tbl_antrian WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  countAntrianDaily,
  countAntrianAll,
  createAntrian,
  getAntrian,
  getTotalAntrian,
  getRestAntrian,
  getNowAntrian,
  getNextAntrian,
  updateAntrian,
  updatePrioritasAntrian,
  deleteAntrian,
};
