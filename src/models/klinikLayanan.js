const Pool = require('../config/db');

const insertKlinikLayanan = (data) => {
  const {
    id,
    id_klinik,
    id_daftar_layanan,
    harga_jasa,
    harga_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_layanan 
        (id, id_klinik, id_daftar_layanan, harga_jasa, harga_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik}', '${id_daftar_layanan}', ${harga_jasa}, ${harga_jual}, ${is_active}, 
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

const allKlinikLayanan = ({
  search,
  searchKlinik,
  searchNamaDaftarLayanan,
  searchStatus,
  searchTipeDaftarLayanan,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_layanan.id, 
        tbl_klinik_layanan.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_layanan.id_daftar_layanan, tbl_daftar_layanan.nama AS nama_daftar_layanan, tbl_daftar_layanan.tipe,
        tbl_klinik_layanan.harga_jasa, tbl_klinik_layanan.harga_jual, tbl_klinik_layanan.is_active, 
        tbl_klinik_layanan.created_at, tbl_klinik_layanan.updated_at
      FROM tbl_klinik_layanan AS tbl_klinik_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_klinik_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE
        CAST(tbl_klinik_layanan.harga_jual AS TEXT) ILIKE '%${search}%' 
      AND
        tbl_klinik_layanan.id_klinik ILIKE '%${searchKlinik}%' 
      AND
        tbl_daftar_layanan.nama ILIKE '%${searchNamaDaftarLayanan}%' 
      AND
        tbl_daftar_layanan.tipe ILIKE '%${searchTipeDaftarLayanan}%' 
      AND
        CAST(tbl_klinik_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_layanan.${sortBy} ${sortOrder} 
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

const countAllKlinikLayanan = (
  search,
  searchKlinik,
  searchNamaDaftarLayanan,
  searchStatus,
  searchTipeDaftarLayanan
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total 
    FROM tbl_klinik_layanan AS tbl_klinik_layanan
    INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_layanan.id_klinik = tbl_klinik.id
    INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_klinik_layanan.id_daftar_layanan = tbl_daftar_layanan.id
    WHERE
      CAST(tbl_klinik_layanan.harga_jual AS TEXT) ILIKE '%${search}%' 
    AND
      tbl_klinik_layanan.id_klinik ILIKE '%${searchKlinik}%' 
    AND
        tbl_daftar_layanan.nama ILIKE '%${searchNamaDaftarLayanan}%' 
    AND
        tbl_daftar_layanan.tipe ILIKE '%${searchTipeDaftarLayanan}%' 
    AND
        CAST(tbl_klinik_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'`
  );
};

const getKlinikLayananByIdKlinikLayanan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_layanan.id, 
        tbl_klinik_layanan.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_layanan.id_daftar_layanan, tbl_daftar_layanan.nama AS nama_daftar_layanan, tbl_daftar_layanan.tipe,
        tbl_klinik_layanan.harga_jasa, tbl_klinik_layanan.harga_jual, tbl_klinik_layanan.is_active, 
        tbl_klinik_layanan.created_at, tbl_klinik_layanan.updated_at
      FROM tbl_klinik_layanan AS tbl_klinik_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_klinik_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_klinik_layanan.id = '${id}'`,
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

const findKlinikLayananByIdKlinikLayanan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_layanan WHERE id = '${id}'`,
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

const getKlinikLayananByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_layanan.id, 
        tbl_klinik_layanan.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_layanan.id_daftar_layanan, tbl_daftar_layanan.nama AS nama_daftar_layanan, tbl_daftar_layanan.tipe,
        tbl_klinik_layanan.harga_jasa, tbl_klinik_layanan.harga_jual, tbl_klinik_layanan.is_active, 
        tbl_klinik_layanan.created_at, tbl_klinik_layanan.updated_at
      FROM tbl_klinik_layanan AS tbl_klinik_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_klinik_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_klinik_layanan.id_klinik = '${id_klinik}'`,
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

const findKlinikLayananByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_layanan WHERE id_klinik = '${id_klinik}'`,
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

const getKlinikLayananByIdDaftarLayanan = ({ id_daftar_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_layanan.id, 
        tbl_klinik_layanan.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_layanan.id_daftar_layanan, tbl_daftar_layanan.nama AS nama_daftar_layanan, tbl_daftar_layanan.tipe,
        tbl_klinik_layanan.harga_jasa, tbl_klinik_layanan.harga_jual, tbl_klinik_layanan.is_active, 
        tbl_klinik_layanan.created_at, tbl_klinik_layanan.updated_at
      FROM tbl_klinik_layanan AS tbl_klinik_layanan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_layanan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_layanan as tbl_daftar_layanan ON tbl_klinik_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_klinik_layanan.id_daftar_layanan = '${id_daftar_layanan}'`,
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

const findKlinikLayananByIdDaftarLayanan = (id_daftar_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_layanan WHERE id_daftar_layanan = '${id_daftar_layanan}'`,
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

const editKlinikLayanan = (data) => {
  const {
    id,
    id_klinik,
    id_daftar_layanan,
    harga_jasa,
    harga_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_layanan 
      SET
        id_klinik='${id_klinik}', id_daftar_layanan='${id_daftar_layanan}', 
        harga_jasa=${harga_jasa}, harga_jual=${harga_jual}, is_active=${is_active}, 
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

const editKlinikLayananActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_layanan 
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

const editKlinikLayananArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_layanan 
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

const deleteKlinikLayanan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_layanan WHERE id='${id}'`,
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
  insertKlinikLayanan,
  allKlinikLayanan,
  countAllKlinikLayanan,
  getKlinikLayananByIdKlinikLayanan,
  findKlinikLayananByIdKlinikLayanan,
  getKlinikLayananByIdKlinik,
  findKlinikLayananByIdKlinik,
  getKlinikLayananByIdDaftarLayanan,
  findKlinikLayananByIdDaftarLayanan,
  editKlinikLayanan,
  editKlinikLayananActivate,
  editKlinikLayananArchive,
  deleteKlinikLayanan,
};
