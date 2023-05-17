const pool = require("../config/db");

const findDaftarLayanan = (nama_layanan) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_daftar_layanan WHERE nama_layanan = '${nama_layanan}'`,
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
  const { id, id_klinik, nama_layanan, harga_layanan } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_daftar_layanan (id, id_klinik, nama_layanan, harga_layanan, is_active, created_at, updated_at) VALUES('${id}', '${id_klinik}', '${nama_layanan}', '${harga_layanan}', '1', NOW(), NOW())`,
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
  searchKlinik,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT dl.id, dl.id_klinik, dl.nama_layanan, dl.harga_layanan, klinik.nama_klinik
        FROM tbl_daftar_layanan as dl 
        INNER JOIN tbl_klinik as klinik 
        ON dl.id_klinik = klinik.id
        WHERE dl.nama_layanan ILIKE ('%${searchName}%') AND dl.is_active ILIKE '%${searchStatus}%' AND dl.id_klinik ILIKE '%${searchKlinik}%' ORDER BY dl.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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
      `SELECT dl.id, dl.id_klinik, dl.nama_layanan, dl.harga_layanan, klinik.nama_klinik
      FROM tbl_daftar_layanan as dl 
      INNER JOIN tbl_klinik as klinik 
      ON dl.id_klinik = klinik.id
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
  const { id, id_klinik, nama_layanan, harga_layanan } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_daftar_layanan
                SET id_klinik = '${id_klinik}', nama_layanan = '${nama_layanan}', harga_layanan = '${harga_layanan}'
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
