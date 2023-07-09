const pool = require("../config/db");

const createNonDoctorSchedule = (data) => {
  const { id, id_employee, id_doctor_schedule } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_shift
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
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama
            FROM tbl_shift AS jnd
            INNER JOIN tbl_jadwal_jaga AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id`,
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
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama
            FROM tbl_shift AS jnd
            INNER JOIN tbl_jadwal_jaga AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
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
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama
            FROM tbl_shift AS jnd
            INNER JOIN tbl_jadwal_jaga AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            WHERE jd.id_divisi = '${id}'`,
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
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama
            FROM tbl_shift AS jnd
            INNER JOIN tbl_jadwal_jaga AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
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

const getNonDoctorScheduleByIdDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jnd.id, jnd.id_jadwal_dokter, jnd.id_karyawan, jnd.is_active, jnd.created_at, jnd.updated_at, jd.id_klinik, jd.id_divisi, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, dvs.tipe AS nama_divisi, kry.nama AS nama
            FROM tbl_shift AS jnd
            INNER JOIN tbl_jadwal_jaga AS jd ON jnd.id_jadwal_dokter = jd.id
            INNER JOIN tbl_karyawan AS kry ON jnd.id_karyawan = kry.id
            INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
            WHERE jnd.id_jadwal_dokter = '${id}'`,
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
  const { id, id_doctor_schedule, id_employee } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift
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
};

const archiveNonDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift
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
      `UPDATE tbl_shift
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
      `DELETE FROM tbl_shift
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
  getNonDoctorScheduleByIdDoctorSchedule,
  updateNonDoctorSchedule,
  archiveNonDoctorSchedule,
  activateNonDoctorSchedule,
  deleteNonDoctorSchedule,
};
