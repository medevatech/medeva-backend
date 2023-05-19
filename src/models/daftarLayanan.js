const pool = require('../config/db');

const findDaftarLayanan = (nama) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_daftar_layanan WHERE nama = '${nama}'`,
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

const countDaftarLayanan = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_daftar_layanan`);
};

const createDaftarLayanan = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_daftar_layanan (id,  nama, is_active, created_at, updated_at) VALUES('${id}',  '${nama}', 1, NOW(), NOW())`,
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

const getDaftarLayanan = ({
  searchName,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT dl.id, dl.nama, dl.is_active, dl.created_at, dl.updated_at
        FROM tbl_daftar_layanan as dl 
        WHERE dl.nama ILIKE ('%${searchName}%') AND CAST(dl.is_active AS TEXT)  ILIKE '%${searchStatus}%'  ORDER BY dl.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getDaftarLayananById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT dl.id, dl.nama, dl.is_active, dl.created_at, dl.updated_at
      FROM tbl_daftar_layanan as dl 
      WHERE dl.id = '${id}'`,
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

const updateDaftarLayanan = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_daftar_layanan
                SET nama = '${nama}',
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

const archiveDaftarLayanan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_daftar_layanan SET is_active = 0 WHERE id = '${id}'`,
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

const activateDaftarLayanan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_daftar_layanan SET is_active = 1 WHERE id = '${id}'`,
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

const deleteDaftarLayanan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_daftar_layanan
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
  createDaftarLayanan,
  findDaftarLayanan,
  countDaftarLayanan,
  getDaftarLayanan,
  getDaftarLayananById,
  updateDaftarLayanan,
  archiveDaftarLayanan,
  activateDaftarLayanan,
  deleteDaftarLayanan,
};
