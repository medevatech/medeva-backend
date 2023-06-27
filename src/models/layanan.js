const Pool = require('../config/db');

const insertLayanan = (data) => {
  const { id, id_kunjungan, id_daftar_layanan, id_pasien, catatan, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_layanan 
        (id, id_kunjungan, id_daftar_layanan, id_pasien, catatan, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_kunjungan}', '${id_daftar_layanan}', '${id_pasien}', '${catatan}', ${is_active},
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

const allLayanan = ({
  search,
  searchDaftarLayanan,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan,
        tbl_layanan.id_daftar_layanan, tbl_daftar_layanan.nama,
        tbl_layanan.id_pasien, tbl_layanan.catatan, tbl_layanan.status, tbl_layanan.is_active, 
        tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE
        tbl_layanan.id ILIKE '%${search}%' 
      AND
        tbl_daftar_layanan.nama ILIKE '%${searchDaftarLayanan}%'
      AND
        CAST(tbl_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_layanan.${sortBy} ${sortOrder} 
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

const countAllLayanan = (search, searchDaftarLayanan, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_layanan
  INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
  WHERE
    tbl_layanan.id ILIKE '%${search}%' 
  AND
    tbl_daftar_layanan.nama ILIKE '%${searchDaftarLayanan}%'
  AND
    CAST(tbl_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getLayananByIdLayanan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan,
        tbl_layanan.id_daftar_layanan, tbl_daftar_layanan.nama,
        tbl_layanan.id_pasien, tbl_layanan.catatan, tbl_layanan.status, tbl_layanan.is_active, 
        tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_layanan.id = '${id}'`,
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

const findLayananByIdLayanan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan WHERE id = '${id}'`,
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

const getLayananByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan,
        tbl_layanan.id_daftar_layanan, tbl_daftar_layanan.nama,
        tbl_layanan.id_pasien, tbl_layanan.catatan, tbl_layanan.status, tbl_layanan.is_active, 
        tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_layanan.id_kunjungan = '${id_kunjungan}'`,
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

const findLayananByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan WHERE id_kunjungan = '${id_kunjungan}'`,
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

const getLayananByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, tbl_layanan.id_kunjungan,
        tbl_layanan.id_daftar_layanan, tbl_daftar_layanan.nama,
        tbl_layanan.id_pasien, tbl_layanan.catatan, tbl_layanan.status, tbl_layanan.is_active, 
        tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      WHERE tbl_layanan.id_pasien = '${id_pasien}'`,
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

const findLayananByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan WHERE id_pasien = '${id_pasien}'`,
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

const editLayanan = (data) => {
  const { id, id_kunjungan, id_daftar_layanan, id_pasien, catatan, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan 
      SET
        id_kunjungan='${id_kunjungan}', id_daftar_layanan='${id_daftar_layanan}', id_pasien='${id_pasien}', catatan='${catatan}',  is_active=${is_active},
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

const editLayananActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan 
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

const deleteLayanan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_layanan WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertLayanan,
  allLayanan,
  countAllLayanan,
  getLayananByIdLayanan,
  findLayananByIdLayanan,
  getLayananByIdKunjungan,
  findLayananByIdKunjungan,
  getLayananByIdPasien,
  findLayananByIdPasien,
  editLayanan,
  editLayananActiveArchive,
  deleteLayanan,
};
