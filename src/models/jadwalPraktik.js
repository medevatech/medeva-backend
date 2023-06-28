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
    pool.query(`SELECT * FROM tbl_jadwal_praktik`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  createPracticeSchedule,
  getPracticeSchedule,
};
