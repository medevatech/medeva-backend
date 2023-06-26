const Pool = require('../config/db');

const insertResep = (data) => {
  const {
    id,
    id_kunjungan,
    id_obat,
    id_pasien,
    jumlah,
    satuan,
    frekuensi,
    periode,
    metode_konsumsi,
    aturan_pakai,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_resep 
        (id, id_kunjungan, id_obat, id_pasien, jumlah, satuan, 
        frekuensi, periode, metode_konsumsi, aturan_pakai, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_kunjungan}', '${id_obat}', '${id_pasien}', ${jumlah}, '${satuan}', 
        ${frekuensi}, '${periode}', '${metode_konsumsi}', '${aturan_pakai}', ${is_active}, 
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

const allResep = ({
  search,
  searchObat,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, 
        tbl_resep.id_obat, tbl_obat.nama, tbl_resep.id_pasien,
        tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, tbl_resep.is_active, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
      WHERE
        CAST(tbl_resep.jumlah AS TEXT) ILIKE '%${search}%'
      AND
        tbl_obat.nama ILIKE '%${searchObat}%' 
      AND
        CAST(tbl_resep.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_resep.${sortBy} ${sortOrder} 
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

const countAllResep = (search, searchObat, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_resep AS tbl_resep
  INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
  WHERE
    CAST(tbl_resep.jumlah AS TEXT) ILIKE '%${search}%'
  AND
    tbl_obat.nama ILIKE '%${searchObat}%' 
  AND
    CAST(tbl_resep.is_active AS TEXT) ILIKE '%${searchStatus}%'
  `);
};

const getResepByIdResep = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, 
        tbl_resep.id_obat, tbl_obat.nama, tbl_resep.id_pasien,
        tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, tbl_resep.is_active, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
      WHERE tbl_resep.id = '${id}'`,
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

const findResepByIdResep = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_resep WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getResepByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, 
        tbl_resep.id_obat, tbl_obat.nama, tbl_resep.id_pasien,
        tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, tbl_resep.is_active, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
      WHERE tbl_resep.id_kunjungan = '${id_kunjungan}'`,
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

const findResepByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_resep WHERE id_kunjungan = '${id_kunjungan}'`,
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

const getResepByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, 
        tbl_resep.id_obat, tbl_obat.nama, tbl_resep.id_pasien,
        tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, tbl_resep.is_active, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
      WHERE tbl_resep.id_pasien = '${id_pasien}'`,
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

const findResepByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_resep WHERE id_pasien = '${id_pasien}'`,
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

const editResep = (data) => {
  const {
    id,
    id_kunjungan,
    id_obat,
    id_pasien,
    jumlah,
    satuan,
    frekuensi,
    periode,
    metode_konsumsi,
    aturan_pakai,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_resep 
      SET
        id_kunjungan='${id_kunjungan}', id_obat='${id_obat}', id_pasien='${id_pasien}', jumlah=${jumlah}, satuan='${satuan}',
          frekuensi=${frekuensi}, periode='${periode}', metode_konsumsi='${metode_konsumsi}', aturan_pakai='${aturan_pakai}', is_active=${is_active},
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

const editResepActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_resep 
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

const deleteResep = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_resep WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertResep,
  allResep,
  countAllResep,
  getResepByIdResep,
  findResepByIdResep,
  getResepByIdKunjungan,
  findResepByIdKunjungan,
  getResepByIdPasien,
  findResepByIdPasien,
  editResep,
  editResepActiveArchive,
  deleteResep,
};
