const pool = require("../config/db");

const createDoctorSchedule = (data) => {
  const { id, id_clinic, id_division, id_doctor, date, start_time, end_time } =
    data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jadwal_jaga (id, id_klinik, id_divisi, id_dokter, tanggal, waktu_mulai, waktu_selesai, is_active, created_at, updated_at) VALUES('${id}', '${id_clinic}', '${id_division}', '${id_doctor}', '${date}', '${start_time}', '${end_time}', 1, NOW(), NOW())`,
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

const getDoctorSchedule = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jd.id, jd.id_klinik, jd.id_divisi, jd.id_dokter, kry.nama as title, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, jd.is_active, jd.id_pengganti
      FROM tbl_jadwal_jaga AS jd
      INNER JOIN tbl_karyawan AS kry ON jd.id_dokter = kry.id`,
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

const getDoctorScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jd.id, jd.id_klinik, jd.id_divisi, jd.id_dokter, kry.nama, jd.tanggal, jd.waktu_mulai, jd.waktu_selesai, jd.id_pengganti, jd.is_active
      FROM tbl_jadwal_jaga AS jd
      INNER JOIN tbl_karyawan AS kry ON jd.id_dokter = kry.id
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

const getDoctorScheduleByIdDivision = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jd.id, jd.id_klinik, jd.id_divisi, jd.id_dokter, jd.id_pengganti, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, jd.is_active, dvs.tipe AS nama_divisi, kry.nama AS nama_karyawan, kry.is_dokter, sub.nama AS nama_pengganti
      FROM tbl_jadwal_jaga AS jd
      INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
      INNER JOIN tbl_karyawan AS kry ON jd.id_dokter = kry.id
      FULL OUTER JOIN tbl_karyawan AS sub ON jd.id_pengganti = sub.id
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

const getDoctorScheduleByIdDoctor = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jd.id, jd.id_klinik, jd.id_divisi, jd.id_dokter, jd.id_pengganti, jd.tanggal, jd.waktu_mulai AS start, jd.waktu_selesai AS end, jd.is_active, dvs.tipe AS nama_divisi, kry.nama AS nama_karyawan, kry.is_dokter, sub.nama AS nama_pengganti
      FROM tbl_jadwal_jaga AS jd
      INNER JOIN tbl_divisi AS dvs ON jd.id_divisi = dvs.id
      INNER JOIN tbl_karyawan AS kry ON jd.id_dokter = kry.id
      FULL OUTER JOIN tbl_karyawan AS sub ON jd.id_pengganti = sub.id
      WHERE jd.id_dokter = '${id}'
      `,
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

const updateDoctorSchedule = (data) => {
  const {
    id,
    id_clinic,
    id_division,
    id_doctor,
    date,
    start_time,
    end_time,
    id_subtitute,
  } = data;
  if (id_subtitute) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE tbl_jadwal_jaga
          SET id_klinik = '${id_clinic}', id_divisi = '${id_division}', id_dokter = '${id_doctor}', tanggal = '${date}', waktu_mulai = '${start_time}', waktu_selesai = '${end_time}', updated_at = NOW(), id_pengganti = '${id_subtitute}'
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
        `UPDATE tbl_jadwal_jaga
          SET id_klinik = '${id_clinic}', id_divisi = '${id_division}', id_dokter = '${id_doctor}', tanggal = '${date}', waktu_mulai = '${start_time}', waktu_selesai = '${end_time}', updated_at = NOW()
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

const archiveDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_jaga
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

const activateDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_jaga
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

const deleteDoctorSchedule = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_jadwal_jaga
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
  createDoctorSchedule,
  getDoctorSchedule,
  getDoctorScheduleById,
  getDoctorScheduleByIdDivision,
  getDoctorScheduleByIdDoctor,
  updateDoctorSchedule,
  archiveDoctorSchedule,
  activateDoctorSchedule,
  deleteDoctorSchedule,
};
