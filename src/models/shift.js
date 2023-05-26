const pool = require("../config/db");

const createShift = (data) => {
  const {
    id,
    id_klinik,
    id_divisi,
    hari,
    tanggal,
    waktu_mulai,
    waktu_selesai,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_shift (id, id_klinik, id_divisi, hari, tanggal, waktu_mulai, waktu_selesai, is_active, created_at, updated_at) VALUES('${id}', '${id_klinik}', '${id_divisi}', '${hari}', '${tanggal}', '${waktu_mulai}', '${waktu_selesai}', "1", NOW(), NOW() )`,
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

const countShift = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_shift`);
};

const getShift = ({
  searchName,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_shift.id, tbl_shift.id_klinik, tbl_shift.id_divisi, tbl_shift.hari, tbl_shift.tanggal, tbl_shift.waktu_mulai, tbl_shift.waktu_selesai, tbl_shift.is_active, tbl_klinik.nama_klinik as nama_klinik, tbl_divisi.tipe as tipe FROM tbl_shift INNER JOIN tbl_klinik as tbl_klinik ON tbl_shift.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi as tbl_divisi ON tbl_shift.id_divisi = tbl_divisi.id 
                WHERE tbl_shift.hari ILIKE '%${searchName}%' AND tbl_shift.is_active ILIKE '%${searchStatus}%'
                ORDER BY tbl_shift.${sortBy} ${sortOrder}
                LIMIT ${limit}
                OFFSET ${offset}`,
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

const getShiftById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_shift.id, tbl_shift.id_klinik, tbl_shift.id_divisi, tbl_shift.hari, tbl_shift.tanggal, tbl_shift.waktu_mulai, tbl_shift.waktu_selesai, tbl_shift.is_active, tbl_klinik.nama_klinik as nama_klinik, tbl_divisi.tipe as tipe FROM tbl_shift INNER JOIN tbl_klinik as tbl_klinik ON tbl_shift.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi as tbl_divisi ON tbl_shift.id_divisi = tbl_divisi.id
                WHERE tbl_shift.id = '${id}'`,
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

const getShiftByIdClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_shift.id, tbl_shift.id_klinik, tbl_shift.id_divisi, tbl_shift.hari, tbl_shift.tanggal, tbl_shift.waktu_mulai, tbl_shift.waktu_selesai, tbl_shift.is_active, tbl_klinik.nama_klinik as nama_klinik, tbl_divisi.tipe as tipe FROM tbl_shift INNER JOIN tbl_klinik as tbl_klinik ON tbl_shift.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi as tbl_divisi ON tbl_shift.id_divisi = tbl_divisi.id
                WHERE tbl_shift.id_klinik = '${id}'`,
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

const updateShift = (data) => {
  const {
    id,
    id_klinik,
    id_divisi,
    hari,
    tanggal,
    waktu_mulai,
    waktu_selesai,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift
                SET id_klinik = '${id_klinik}', id_divisi = '${id_divisi}', hari = '${hari}', tanggal = '${tanggal}', waktu_mulai = '${waktu_mulai}', waktu_selesai = '${waktu_selesai}'
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

const archiveShift = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift SET is_active = 0 WHERE id = '${id}'`,
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

const activateShift = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift SET is_active = 1 WHERE id = '${id}'`,
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

const deleteShift = (id) => {
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
  createShift,
  countShift,
  getShift,
  getShiftById,
  getShiftByIdClinic,
  updateShift,
  archiveShift,
  activateShift,
  deleteShift,
};
