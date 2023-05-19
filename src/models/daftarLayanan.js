const Pool = require('../config/db');

const insertDaftarLayanan = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_daftar_layanan 
        (id,  nama, is_active,
            created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', ${is_active}, 
            NOW(), NOW())`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const allDaftarLayanan = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_layanan.id, tbl_daftar_layanan.nama, 
        tbl_daftar_layanan.is_active, 
        tbl_daftar_layanan.created_at, tbl_daftar_layanan.updated_at
      FROM tbl_daftar_layanan AS tbl_daftar_layanan
      WHERE
        tbl_daftar_layanan.nama ILIKE '%${search}%' 
      AND
        CAST(tbl_daftar_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_daftar_layanan.${sortBy} ${sortOrder} 
      LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const countAllDaftarLayanan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_daftar_layanan`);
};

const getDaftarLayananById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_layanan.id, tbl_daftar_layanan.nama, 
        tbl_daftar_layanan.is_active, 
        tbl_daftar_layanan.created_at, tbl_daftar_layanan.updated_at
      FROM tbl_daftar_layanan AS tbl_daftar_layanan
      WHERE tbl_daftar_layanan.id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findDaftarLayananById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_daftar_layanan WHERE id = '${id}'
           `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const editDaftarLayanan = (data) => {
  const { id, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_layanan 
          SET
            nama='${nama}', 
            updated_at=NOW()
          WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const editDaftarLayananActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_layanan 
          SET
            is_active=${is_active}, 
            updated_at=NOW()
          WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const editDaftarLayananArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_layanan 
          SET
            is_active=${is_active}, 
            updated_at=NOW()
          WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const deleteDaftarLayanan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_daftar_layanan WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  insertDaftarLayanan,
  allDaftarLayanan,
  countAllDaftarLayanan,
  findDaftarLayananById,
  getDaftarLayananById,
  editDaftarLayanan,
  editDaftarLayananActivate,
  editDaftarLayananArchive,
  deleteDaftarLayanan,
};
