const Pool = require('../config/db');

const insertPemeriksaanPenunjang = (data) => {
  const { id, id_pemeriksaan, id_lab, id_kunjungan, id_pasien, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pemeriksaan_penunjang 
        (id, id_pemeriksaan, id_lab, id_kunjungan, id_pasien, is_active,
        created_at, updated_at)  
      VALUES
        ('${id}', '${id_pemeriksaan}', '${id_lab}', '${id_kunjungan}', '${id_pasien}', ${is_active}, 
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

const allPemeriksaanPenunjang = ({
  search,
  searchPemeriksaan,
  searchLab,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, tbl_pemeriksaan.nama AS nama_pemeriksaan,
        tbl_pemeriksaan_penunjang.id_lab, tbl_laboratorium.nama AS nama_laboratorium,
        tbl_pemeriksaan_penunjang.id_kunjungan, tbl_pemeriksaan_penunjang.id_pasien, tbl_pemeriksaan_penunjang.status, tbl_pemeriksaan_penunjang.is_active,
        tbl_pemeriksaan_penunjang.created_at, tbl_pemeriksaan_penunjang.updated_at
      FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
      INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
      INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
      WHERE
        tbl_pemeriksaan.id ILIKE '%${search}%' 
      AND
        tbl_pemeriksaan.nama ILIKE '%${searchPemeriksaan}%'
      AND
        tbl_laboratorium.nama ILIKE '%${searchLab}%'
      AND
        CAST(tbl_pemeriksaan_penunjang.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pemeriksaan_penunjang.${sortBy} ${sortOrder} 
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

const countAllPemeriksaanPenunjang = (
  search,
  searchPemeriksaan,
  searchLab,
  searchStatus
) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
  INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
  INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
  WHERE
    tbl_pemeriksaan.id ILIKE '%${search}%' 
  AND
    tbl_pemeriksaan.nama ILIKE '%${searchPemeriksaan}%'
  AND
    tbl_laboratorium.nama ILIKE '%${searchLab}%'
  AND
    CAST(tbl_pemeriksaan_penunjang.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getPemeriksaanPenunjangByIdPemeriksaanPenunjang = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, tbl_pemeriksaan.nama AS nama_pemeriksaan,
        tbl_pemeriksaan_penunjang.id_lab, tbl_laboratorium.nama AS nama_laboratorium,
        tbl_pemeriksaan_penunjang.id_kunjungan, tbl_pemeriksaan_penunjang.id_pasien, tbl_pemeriksaan_penunjang.status, tbl_pemeriksaan_penunjang.is_active,
        tbl_pemeriksaan_penunjang.created_at, tbl_pemeriksaan_penunjang.updated_at
      FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
      INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
      INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
      WHERE tbl_pemeriksaan_penunjang.id = '${id}'`,
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

const findPemeriksaanPenunjangByIdPemeriksaanPenunjang = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan_penunjang WHERE id = '${id}'`,
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

const getPemeriksaanPenunjangByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, tbl_pemeriksaan.nama AS nama_pemeriksaan,
        tbl_pemeriksaan_penunjang.id_lab, tbl_laboratorium.nama AS nama_laboratorium,
        tbl_pemeriksaan_penunjang.id_kunjungan, tbl_pemeriksaan_penunjang.id_pasien, tbl_pemeriksaan_penunjang.status, tbl_pemeriksaan_penunjang.is_active,
        tbl_pemeriksaan_penunjang.created_at, tbl_pemeriksaan_penunjang.updated_at
      FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
      INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
      INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
      WHERE tbl_pemeriksaan_penunjang.id_kunjungan = '${id_kunjungan}'`,
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

const findPemeriksaanPenunjangByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan_penunjang WHERE id_kunjungan = '${id_kunjungan}'`,
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

const getPemeriksaanPenunjangByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, tbl_pemeriksaan.nama AS nama_pemeriksaan,
        tbl_pemeriksaan_penunjang.id_lab, tbl_laboratorium.nama AS nama_laboratorium,
        tbl_pemeriksaan_penunjang.id_kunjungan, tbl_pemeriksaan_penunjang.id_pasien, tbl_pemeriksaan_penunjang.status, tbl_pemeriksaan_penunjang.is_active,
        tbl_pemeriksaan_penunjang.created_at, tbl_pemeriksaan_penunjang.updated_at
      FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
      INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
      INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
      WHERE tbl_pemeriksaan_penunjang.id_pasien = '${id_pasien}'`,
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

const findPemeriksaanPenunjangByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan_penunjang WHERE id_pasien = '${id_pasien}'`,
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

const editPemeriksaanPenunjang = (data) => {
  const { id, id_pemeriksaan, id_lab, id_kunjungan, id_pasien, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan_penunjang 
      SET
        id_pemeriksaan='${id_pemeriksaan}', id_lab='${id_lab}', id_kunjungan='${id_kunjungan}', id_pasien='${id_pasien}', is_active=${is_active}, 
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

const editPemeriksaanPenunjangActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan_penunjang 
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

const deletePemeriksaanPenunjang = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_pemeriksaan_penunjang WHERE id='${id}'`,
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
  insertPemeriksaanPenunjang,
  allPemeriksaanPenunjang,
  countAllPemeriksaanPenunjang,
  getPemeriksaanPenunjangByIdPemeriksaanPenunjang,
  findPemeriksaanPenunjangByIdPemeriksaanPenunjang,
  getPemeriksaanPenunjangByIdKunjungan,
  findPemeriksaanPenunjangByIdKunjungan,
  getPemeriksaanPenunjangByIdPasien,
  findPemeriksaanPenunjangByIdPasien,
  editPemeriksaanPenunjang,
  editPemeriksaanPenunjangActiveArchive,
  deletePemeriksaanPenunjang,
};
