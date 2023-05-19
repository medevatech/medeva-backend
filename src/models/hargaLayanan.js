const Pool = require('../config/db');

const insertHargaLayanan = (data) => {
  const { id, id_klinik, id_daftar_layanan, harga } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_harga_layanan 
        (id, id_klinik, id_daftar_layanan, harga,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_klinik}', '${id_daftar_layanan}', ${harga}, 
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

const allHargaLayanan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_harga_layanan.id, 
        tbl_harga_layanan.id_klinik, tbl_klinik.nama_klinik,
        tbl_harga_layanan.id_daftar_layanan, tbl_daftar_layanan.nama_layanan,
        tbl_harga_layanan.harga,
        tbl_harga_layanan.created_at, tbl_harga_layanan.updated_at
      FROM tbl_harga_layanan AS tbl_harga_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_harga_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_harga_layanan.id
      ILIKE '%${search}%' ORDER BY tbl_harga_layanan.${sortBy} ${sortOrder} 
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

const countAllHargaLayanan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_harga_layanan`);
};

const getHargaLayananById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_harga_layanan.id, 
        tbl_harga_layanan.id_klinik, tbl_klinik.nama_klinik,
        tbl_harga_layanan.id_daftar_layanan, tbl_daftar_layanan.nama_layanan,
        tbl_harga_layanan.harga,
        tbl_harga_layanan.created_at, tbl_harga_layanan.updated_at
      FROM tbl_harga_layanan AS tbl_harga_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_harga_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_harga_layanan.id = '${id}'`,
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

const findHargaLayananById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_harga_layanan WHERE id = '${id}'
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

const editHargaLayanan = (data) => {
  const { id, id_klinik, id_daftar_layanan, harga } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_layanan 
          SET
            id_klinik='${id_klinik}', id_daftar_layanan='${id_daftar_layanan}', harga=${harga}, 
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

module.exports = {
  insertHargaLayanan,
  allHargaLayanan,
  countAllHargaLayanan,
  getHargaLayananById,
  findHargaLayananById,
  editHargaLayanan,
};
