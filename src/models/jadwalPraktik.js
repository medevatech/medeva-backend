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

module.exports = {
  createPracticeSchedule,
  getPracticeSchedule,
};
