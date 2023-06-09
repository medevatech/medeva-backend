const Pool = require('../config/db');

const insertDaftarLayanan = (data) => {
  const { id, nama, tipe, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_daftar_layanan 
        (id,  nama, tipe, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', '${tipe}', ${is_active}, 
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
  searchTipe,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_layanan.id, tbl_daftar_layanan.nama, 
        tbl_daftar_layanan.tipe, tbl_daftar_layanan.is_active, 
        tbl_daftar_layanan.created_at, tbl_daftar_layanan.updated_at
      FROM tbl_daftar_layanan AS tbl_daftar_layanan
      WHERE
        tbl_daftar_layanan.nama ILIKE '%${search}%'
      AND
        tbl_daftar_layanan.tipe ILIKE '%${searchTipe}%' 
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

const countAllDaftarLayanan = (search, searchTipe, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_daftar_layanan AS tbl_daftar_layanan
  WHERE
    tbl_daftar_layanan.nama ILIKE '%${search}%' 
  AND
    tbl_daftar_layanan.tipe ILIKE '%%${searchTipe}'
  AND
    CAST(tbl_daftar_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getDaftarLayananByIdDaftarLayanan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_layanan.id, tbl_daftar_layanan.nama, 
        tbl_daftar_layanan.tipe, tbl_daftar_layanan.is_active, 
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

const findDaftarLayananByIdDaftarLayanan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_daftar_layanan WHERE id = '${id}'`,
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
  const { id, nama, tipe, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_layanan 
      SET
        nama='${nama}', tipe='${tipe}', is_active=${is_active}, 
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
  getDaftarLayananByIdDaftarLayanan,
  findDaftarLayananByIdDaftarLayanan,
  editDaftarLayanan,
  editDaftarLayananActivate,
  editDaftarLayananArchive,
  deleteDaftarLayanan,
};
