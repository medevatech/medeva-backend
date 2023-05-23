const Pool = require('../config/db');

const insertAlergiPasien = (data) => {
  const {
    id,
    id_pasien,
    id_alergi,
    tanggal_kunjungan_dicatat,
    tanggal_kunjungan_dihapus,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_alergi_pasien 
        (id, id_pasien, id_alergi, tanggal_kunjungan_dicatat, tanggal_kunjungan_dihapus, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_pasien}', '${id_alergi}',  NOW(),  NOW(), ${is_active},
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

const allAlergiPasien = ({
  search,
  searchStatus,
  searchPasien,
  searchAlergi,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
        tbl_alergi_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_alergi_pasien.id_alergi, tbl_alergi.nama AS nama_alergi,
        tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus, tbl_alergi_pasien.is_active,
        tbl_alergi_pasien.created_at, tbl_alergi_pasien.updated_at
      FROM tbl_alergi_pasien AS tbl_alergi_pasien
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
      INNER JOIN tbl_alergi AS tbl_alergi ON tbl_alergi_pasien.id_alergi = tbl_alergi.id
      WHERE 
        tbl_alergi_pasien.id ILIKE '%${search}%' 
      AND
        CAST(tbl_alergi_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
      AND
        tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
      AND
        tbl_alergi.nama ILIKE '%${searchAlergi}%'
      ORDER BY tbl_alergi_pasien.${sortBy} ${sortOrder} 
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

const countAllAlergiPasien = (
  search,
  searchStatus,
  searchPasien,
  searchAlergi
) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_alergi_pasien AS tbl_alergi_pasien
  INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
  INNER JOIN tbl_alergi AS tbl_alergi ON tbl_alergi_pasien.id_alergi = tbl_alergi.id
  WHERE 
    tbl_alergi_pasien.id ILIKE '%${search}%' 
  AND
    CAST(tbl_alergi_pasien.is_active AS TEXT) ILIKE '%${searchStatus}%'
  AND
    tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
  AND
    tbl_alergi.nama ILIKE '%${searchAlergi}%'`);
};

const getAlergiPasienByIdAlergiPasien = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
        tbl_alergi_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_alergi_pasien.id_alergi, tbl_alergi.nama AS nama_alergi,
        tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus, tbl_alergi_pasien.is_active,
        tbl_alergi_pasien.created_at, tbl_alergi_pasien.updated_at
      FROM tbl_alergi_pasien AS tbl_alergi_pasien
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
      INNER JOIN tbl_alergi AS tbl_alergi ON tbl_alergi_pasien.id_alergi = tbl_alergi.id
      WHERE tbl_alergi_pasien.id = '${id}'`,
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

const findAlergiPasienByIdAlergiPasien = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_alergi_pasien 
      WHERE
        id = '${id}'`,
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

const getAlergiPasienByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
        tbl_alergi_pasien.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_alergi_pasien.id_alergi, tbl_alergi.nama AS nama_alergi,
        tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus, tbl_alergi_pasien.is_active,
        tbl_alergi_pasien.created_at, tbl_alergi_pasien.updated_at
      FROM tbl_alergi_pasien AS tbl_alergi_pasien
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
      INNER JOIN tbl_alergi AS tbl_alergi ON tbl_alergi_pasien.id_alergi = tbl_alergi.id
      WHERE tbl_alergi_pasien.id_pasien = '${id_pasien}'`,
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

const findAlergiPasienByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_alergi_pasien 
      WHERE
        id_pasien = '${id_pasien}'`,
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

const editAlergiPasien = (data) => {
  const {
    id,
    id_pasien,
    id_alergi,
    tanggal_kunjungan_dicatat,
    tanggal_kunjungan_dihapus,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi_pasien 
      SET
        id_pasien='${id_pasien}', id_alergi='${id_alergi}',  tanggal_kunjungan_dicatat='${tanggal_kunjungan_dicatat}',  tanggal_kunjungan_dihapus='${tanggal_kunjungan_dihapus}', 
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

const editAlergiPasienActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi_pasien 
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

const deleteAlergiPasien = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_alergi_pasien WHERE id='${id}'`,
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
  insertAlergiPasien,
  allAlergiPasien,
  countAllAlergiPasien,
  getAlergiPasienByIdAlergiPasien,
  findAlergiPasienByIdAlergiPasien,
  getAlergiPasienByIdPasien,
  findAlergiPasienByIdPasien,
  editAlergiPasien,
  editAlergiPasienActiveArchive,
  deleteAlergiPasien,
};
