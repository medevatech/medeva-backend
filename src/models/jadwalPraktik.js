const pool = require("../config/db");

const createPracticeSchedule = (data) => {
  const { id, id_clinic, id_division, id_doctor, date, start_time, end_time } =
    data;
  // console.log(data);
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

// const dataa = [
//   {
//     id: 1,
//     name: "test1",
//     age: 30,
//   },
//   {
//     id: 2,
//     name: "test2",
//     age: 20,
//   },
// ];

// const generateInsertQuery = (data) => {
//   const columns = Object.keys(data[0]);
//   const values = data.map((item) => {
//     return Object.values(item);
//   });
//   const query = `INSERT INTO table (${columns.join(", ")}) VALUES ${values
//     .map((item) => {
//       return `(${item.join(", ")})`;
//     })
//     .join(", ")}`;

//   return query;
// };
// if (data?.length) {
// const columns = Object.keys(data[0]);
// const values = data.map((item) => {
//   return Object.values(item);
// });
// pool.query(
//   `INSERT INTO tbl_jadwal_praktik (${columns.join(", ")}) VALUES ${values
//     .map((item) => {
//       return `(${item.join(", ")})`;
//     })
//     .join(", ")}`,
//   (err, res) => {
//     if (!err) {
//       resolve(res);
//     } else {
//       reject(err);
//     }
//   }
// );
//   let query = "";
//   data.forEach((item) => {
//     query += `INSERT INTO tbl_jadwal_praktik (id, id_klinik, id_divisi, id_dokter, tanggal, waktu_mulai, waktu_selesai, is_active, created_at, updated_at) VALUES(${item.id}, ${item.id_klinik}, ${item.id_divisi}, ${item.id_dokter}, ${item.tanggal}, ${item.waktu_mulai}, ${item.waktu_selesai}, 1, NOW(), NOW())`;
//   });
//   console.log(query);
//   pool.query(query, (err, res) => {
//     if (!err) {
//       resolve(res);
//     } else {
//       reject(err);
//     }
//   });
// } else {

const getPracticeSchedule = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jp.id, jp.id_klinik, jp.id_divisi, jp.id_dokter, kry.nama as title, jp.tanggal, jp.waktu_mulai as start, jp.waktu_selesai as end, jp.is_active, jp.id_pengganti FROM tbl_jadwal_praktik as jp
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
      `SELECT jp.id, jp.id_klinik, jp.id_divisi, jp.id_dokter, kry.nama, jp.tanggal, jp.waktu_mulai, jp.waktu_selesai, jp.id_pengganti FROM tbl_jadwal_praktik as jp
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
        `UPDATE tbl_jadwal_praktik
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
        `UPDATE tbl_jadwal_praktik
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
