const Pool = require('../config/db');

const insertTindakan = (data) => {
  const { id, id_kunjungan, id_daftar_tindakan, catatan, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_tindakan 
        (id, id_kunjungan, id_daftar_tindakan, catatan, is_active, 
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_kunjungan}', '${id_daftar_tindakan}', '${catatan}', ${is_active},
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

const allTindakan = ({
  search,
  searchDaftarTindakan,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, 
        tbl_tindakan.id_daftar_tindakan, tbl_daftar_tindakan.nama,
        tbl_tindakan.catatan, tbl_tindakan.is_active, 
        tbl_tindakan.created_at, tbl_tindakan.updated_at
      FROM tbl_tindakan AS tbl_tindakan
      INNER JOIN tbl_daftar_tindakan AS tbl_daftar_tindakan ON tbl_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE 
        tbl_tindakan.catatan ILIKE '%${search}%'
      AND
        tbl_daftar_tindakan.nama ILIKE '%${searchDaftarTindakan}%'
      AND
        CAST(tbl_tindakan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_tindakan.${sortBy} ${sortOrder} 
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

const countAllTindakan = (search, searchDaftarTindakan, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_tindakan
  INNER JOIN tbl_daftar_tindakan AS tbl_daftar_tindakan ON tbl_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE 
        tbl_tindakan.catatan ILIKE '%${search}%'
      AND
        tbl_daftar_tindakan.nama ILIKE '%${searchDaftarTindakan}%'
      AND
        CAST(tbl_tindakan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getTindakanByIdTindakan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, 
        tbl_tindakan.id_daftar_tindakan, tbl_daftar_tindakan.nama,
        tbl_tindakan.catatan, tbl_tindakan.is_active, 
        tbl_tindakan.created_at, tbl_tindakan.updated_at
      FROM tbl_tindakan AS tbl_tindakan
      INNER JOIN tbl_daftar_tindakan AS tbl_daftar_tindakan ON tbl_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE tbl_tindakan.id = '${id}'`,
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

const findTindakanByIdTindakan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_tindakan WHERE id = '${id}'`,
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

const editTindakan = (data) => {
  const { id, id_kunjungan, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_tindakan 
      SET
        id_kunjungan='${id_kunjungan}', catatan='${catatan}', 
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

const getTindakanByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_tindakan.id, tbl_tindakan.id_kunjungan, 
        tbl_tindakan.id_daftar_tindakan, tbl_daftar_tindakan.nama,
        tbl_tindakan.catatan, tbl_tindakan.is_active, 
        tbl_tindakan.created_at, tbl_tindakan.updated_at
      FROM tbl_tindakan AS tbl_tindakan
      INNER JOIN tbl_daftar_tindakan AS tbl_daftar_tindakan ON tbl_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE tbl_tindakan.id_kunjungan = '${id_kunjungan}'`,
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

const findTindakanByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_tindakan WHERE id_kunjungan = '${id_kunjungan}'`,
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

const editTindakanActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_tindakan 
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

const deleteTindakan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_tindakan WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertTindakan,
  allTindakan,
  countAllTindakan,
  getTindakanByIdTindakan,
  findTindakanByIdTindakan,
  editTindakan,
  getTindakanByIdKunjungan,
  findTindakanByIdKunjungan,
  editTindakanActiveArchive,
  deleteTindakan,
};
