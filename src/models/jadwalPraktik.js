const pool = require("../config/db");

const createPracticeSchedule = (data) => {
  const { id, id_clinic, id_division, id_doctor, date, start_time, end_time } =
    data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jadwal_praktik (id, id_klinik, id_divisi, id_dokter, tanggal, waktu_mulai, waktu_selesai, is_active, created_at, updated_at) VALUES('${id}', '${id_clinic}', '${id_division}', '${id_doctor}', '${date}', '${start_time}', '${end_time}', 1, NOW(), NOW())`,
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

const getPracticeSchedule = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jp.id, jp.id_klinik, jp.id_divisi, jp.id_dokter, kry.nama as title, jp.tanggal, jp.waktu_mulai as start, jp.waktu_selesai as end FROM tbl_jadwal_praktik as jp
    INNER JOIN tbl_karyawan as kry ON jp.id_dokter = kry.id`,
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

const getPracticeScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jp.id, jp.id_klinik, jp.id_divisi, jp.id_dokter, kry.nama, jp.tanggal, jp.waktu_mulai, jp.waktu_selesai FROM tbl_jadwal_praktik as jp
      INNER JOIN tbl_karyawan as kry ON jp.id_dokter = kry.id
      WHERE jp.id = '${id}'`,
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

const updatePracticeSchedule = (data) => {
  const { id, id_doctor, date, start_time, end_time } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_praktik
      SET id_dokter = '${id_doctor}', tanggal = '${date}', waktu_mulai = '${start_time}', waktu_selesai = '${end_time}', updated_at = NOW()
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

const archivePracticeSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_praktik
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

const activatePracticeSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_praktik
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

const deletePracticeSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_jadwal_praktik
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
  createPracticeSchedule,
  getPracticeSchedule,
  getPracticeScheduleById,
  updatePracticeSchedule,
  archivePracticeSchedule,
  activatePracticeSchedule,
  deletePracticeSchedule,
};
