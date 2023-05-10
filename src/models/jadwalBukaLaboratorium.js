const pool = require("../config/db");

const countJBL = () => {
  return pool.query(
    `SELECT COUNT(*) AS total FROM tbl_jadwal_buka_laboratorium`
  );
};

const createJBL = (data) => {
  const { id, id_laboratorium, hari, jam_buka, jam_tutup } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jadwal_buka_laboratorium (id, id_laboratorium, hari, jam_buka, jam_tutup is_active, created_at, updated_at) VALUES('${id}', '${id_laboratorium}', '${hari}', '${jam_buka}', '${jam_tutup}', '1', NOW(), NOW())`,
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

const getJBL = ({
  searchLaboratorium,
  searchHari,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jbl.id, jbl.id_laboratorium, jbl.hari, jbl.jam_buka, jbl.jam_tutup, jbl.is_active, jbl.created_at, jbl.updated_at FROM tbl_jadwal_buka_laboratorium as jbl 
      INNER JOIN tbl_laboratorium as lab ON jbl.id_laboratorium = lab.id
      WHERE jbl.hari ILIKE ('%${searchHari}%') AND jbl.id_laboratorium ILIKE ('%${searchLaboratorium}%') AND lab.is_active ILIKE '%${searchStatus}%' ORDER BY jbl.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getJBLById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jbl.id, jbl.id_laboratorium, jbl.hari, jbl.jam_buka, jbl.jam_tutup, jbl.is_active, jbl.created_at, jbl.updated_at FROM tbl_jadwal_buka_laboratorium as jbl 
      INNER JOIN tbl_laboratorium as lab ON jbl.id_laboratorium = lab.id
      WHERE jbl.id = '${id}'`,
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

const updateJBL = (data) => {
  const { id, id_laboratorium, hari, jam_buka, jam_tutup } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_buka_laboratorium
                SET id_laboratorium = '${id_laboratorium}', hari = '${hari}', jam_buka = '${jam_buka}', jam_tutup = '${jam_tutup}'
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

const archiveJBL = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_buka_laboratorium SET is_active = 0 WHERE id = '${id}'`,
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

const activateJBL = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jadwal_buka_laboratorium SET is_active = 1 WHERE id = '${id}'`,
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

const deleteJBL = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_jadwal_buka_laboratorium
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
  createJBL,
  countJBL,
  getJBL,
  getJBLById,
  updateJBL,
  archiveJBL,
  activateJBL,
  deleteJBL,
};
