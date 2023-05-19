const Pool = require('../config/db');

const insertHargaLayanan = (data) => {
  const { id, id_klinik, id_daftar_layanan, harga, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_harga_layanan 
        (id, id_klinik, id_daftar_layanan, harga, is_active,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_klinik}', '${id_daftar_layanan}', ${harga}, '${is_active}',
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

const allHargaLayanan = ({
  search,
  searchKlinik,
  searchStatus,
  searchDaftarLayanan,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_harga_layanan.id, 
          tbl_harga_layanan.id_klinik, tbl_klinik.nama_klinik,
          tbl_harga_layanan.id_daftar_layanan, tbl_daftar_tindakan.nama,
        tbl_harga_layanan.harga, tbl_harga_layanan.is_active, 
        tbl_harga_layanan.created_at, tbl_harga_layanan.updated_at
      FROM tbl_harga_layanan AS tbl_harga_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_tindakan as tbl_daftar_tindakan ON tbl_harga_layanan.id_daftar_layanan = tbl_daftar_tindakan.id
      WHERE 
        tbl_harga_layanan.id ILIKE '%${search}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchKlinik}%' 
      AND
        CAST(tbl_harga_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      AND
        tbl_daftar_tindakan.nama ILIKE '%${searchDaftarLayanan}%' 
      ORDER BY tbl_harga_layanan.${sortBy} ${sortOrder} 
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
          tbl_harga_layanan.id_daftar_layanan, tbl_daftar_tindakan.nama,
        tbl_harga_layanan.harga, tbl_harga_layanan.is_active, 
        tbl_harga_layanan.created_at, tbl_harga_layanan.updated_at
      FROM tbl_harga_layanan AS tbl_harga_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_tindakan as tbl_daftar_tindakan ON tbl_harga_layanan.id_daftar_layanan = tbl_daftar_tindakan.id
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
  const { id, id_klinik, id_daftar_layanan, harga, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_layanan 
          SET
            id_klinik='${id_klinik}', id_daftar_layanan='${id_daftar_layanan}', harga=${harga}, is_active=1, 
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

const editHargaLayananActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_layanan 
          SET
            is_active='${is_active}', 
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

const editHargaLayananArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_layanan 
          SET
            is_active='${is_active}', 
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

const deleteHargaLayanan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_harga_layanan WHERE id='${id}'`,
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
  editHargaLayananActivate,
  editHargaLayananArchive,
  deleteHargaLayanan,
};
