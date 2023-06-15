const pool = require("../config/db");

const createShift = (data) => {
  const { id, id_schedule, id_employee } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_shift (id, id_jaga, id_karyawan, is_active, created_at, updated_at) VALUES('${id}', '${id_schedule}', '${id_employee}', '1', NOW(), NOW() )`,
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
      `SELECT shift.id, shift.id_jaga as id_jaga, shift.id_karyawan as id_karyawan, kry.nama as nama_karyawan
      INNER JOIN tbl_karyawan as kry ON shift.id_karyawan = kry.id
                WHERE kry.nama ILIKE '%${searchName}%' AND AND CAST(shift.is_active AS TEXT) ILIKE '%${searchStatus}%'
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
      `SELECT shift.id, shift.id_jaga, shift.id_karyawan, 
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

const updateShift = (data) => {
  const { id, id_schedule, id_employee } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_shift
                SET id_jaga = '${id_schedule}', id_karyawan = '${id_employee}'
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
  updateShift,
  archiveShift,
  activateShift,
  deleteShift,
};
