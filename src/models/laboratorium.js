const pool = require("../config/db");

const findLaboratorium = (nama) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_laboratorium WHERE nama = '${nama}'`,
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

const countLaboratorium = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_laboratorium`);
};

const createLaboratorium = (data) => {
  const { id, nama, no_telepon, alamat } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_laboratorium (id, nama, no_telepon, alamat, is_active, created_at, updated_at) VALUES('${id}', '${nama}', '${no_telepon}', '${alamat}', '1', NOW(), NOW())`,
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

const getLaboratorium = ({
  searchName,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT lab.id, lab.nama, lab.no_telepon, lab.alamat, lab.is_active FROM tbl_laboratorium as lab
        WHERE lab.nama ILIKE ('%${searchName}%') AND lab.is_active ILIKE '%${searchStatus}%' ORDER BY lab.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getLaboratoriumById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT lab.id, lab.nama, lab.no_telepon, lab.alamat, lab.is_active FROM tbl_laboratorium as lab
      WHERE lab.id = '${id}'`,
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

const updateLaboratorium = (data) => {
  const { id, nama, no_telepon, alamat } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_laboratorium
                SET nama = '${nama}', no_telepon = '${no_telepon}', alamat = '${alamat}'
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

const archiveLaboratorium = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_laboratorium SET is_active = 0 WHERE id = '${id}'`,
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

const activateLaboratorium = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_laboratorium SET is_active = 1 WHERE id = '${id}'`,
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

const deleteLaboratorium = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_laboratorium
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
  createLaboratorium,
  findLaboratorium,
  countLaboratorium,
  getLaboratorium,
  getLaboratoriumById,
  updateLaboratorium,
  archiveLaboratorium,
  activateLaboratorium,
  deleteLaboratorium,
};
