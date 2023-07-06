const pool = require("../config/db");

const createNonDoctorSchedule = (data) => {
  const { id, id_employee, id_doctor_schedule } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jadwal_non_dokter
        (id, id_karyawan, id_jadwal_dokter, is_active, created_at, updated_at)
        VALUES ('${id}', '${id_employee}', '${id_doctor_schedule}', 1, NOW(), NOW())`,
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

const getNonDoctorSchedule = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.id_pengganti, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama, sub.nama AS nama_pengganti
            FROM tbl_jadwal_non_dokter AS jnd
            INNER JOIN tbl_jadwal_dokter AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            FULL OUTER JOIN tbl_karyawan AS sub ON jnd.id_pengganti = sub.id`,
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

const getNonDoctorScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.id_pengganti, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama, sub.nama AS nama_pengganti
            FROM tbl_jadwal_non_dokter AS jnd
            INNER JOIN tbl_jadwal_dokter AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            FULL OUTER JOIN tbl_karyawan AS sub ON jnd.id_pengganti = sub.id
            WHERE jnd.id = '${id}'`,
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

const getNonDoctorScheduleByIdDivision = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.id_pengganti, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama, sub.nama AS nama_pengganti
            FROM tbl_jadwal_non_dokter AS jnd
            INNER JOIN tbl_jadwal_dokter AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            FULL OUTER JOIN tbl_karyawan AS sub ON jnd.id_pengganti = sub.id
            WHERE jd.id = '${id}'`,
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

const getNonDoctorScheduleByIdEmployee = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.id_pengganti, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama, sub.nama AS nama_pengganti
            FROM tbl_jadwal_non_dokter AS jnd
            INNER JOIN tbl_jadwal_dokter AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            FULL OUTER JOIN tbl_karyawan AS sub ON jnd.id_pengganti = sub.id
            WHERE jnd.id_karyawan = '${id}'`,
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

const updateNonDoctorSchedule = (data) => {
  const { id, id_doctor_schedule, id_employee, id_subtitute } = data;
  if (id_subtitute) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE tbl_jadwal_non_dokter
                SET id_jadwal_dokter = '${id_doctor_schedule}', id_karyawan = '${id_employee}', id_pengganti = '${id_subtitute}', updated_at = 'NOW()'
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
  } else {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE tbl_jadwal_non_dokter
                SET id_jadwal_dokter = '${id_doctor_schedule}', id_karyawan = '${id_employee}', updated_at = 'NOW()'
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
  }
};

const archiveNonDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_non_dokter
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

const activateNonDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_non_dokter
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

const deleteNonDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_jadwal_non_dokter
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
  createNonDoctorSchedule,
  getNonDoctorSchedule,
  getNonDoctorScheduleById,
  getNonDoctorScheduleByIdDivision,
  getNonDoctorScheduleByIdEmployee,
  updateNonDoctorSchedule,
  archiveNonDoctorSchedule,
  activateNonDoctorSchedule,
  deleteNonDoctorSchedule,
};
