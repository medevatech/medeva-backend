const Pool = require('../config/db');

const insertDaftarTindakan = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_daftar_tindakan 
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

const allDaftarTindakan = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.nama, 
        tbl_daftar_tindakan.is_active, 
        tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
      FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      WHERE
        tbl_daftar_tindakan.nama ILIKE '%${search}%' 
      AND
        CAST(tbl_daftar_tindakan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_daftar_tindakan.${sortBy} ${sortOrder} 
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

const countAllDaftarTindakan = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
  WHERE
    tbl_daftar_tindakan.nama ILIKE '%${search}%' 
  AND
    CAST(tbl_daftar_tindakan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getDaftarTindakanByIdDaftarTindakan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.nama, 
        tbl_daftar_tindakan.is_active, 
        tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
      FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      WHERE tbl_daftar_tindakan.id = '${id}'`,
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

const findDaftarTindakanByIdDaftarTindakan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_daftar_tindakan WHERE id = '${id}'`,
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

const editDaftarTindakan = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
          SET
            nama='${nama}', is_active=${is_active}, 
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

const editDaftarTindakanActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
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

const editDaftarTindakanArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
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

const deleteDaftarTindakan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_daftar_tindakan WHERE id='${id}'`,
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
  insertDaftarTindakan,
  allDaftarTindakan,
  countAllDaftarTindakan,
  getDaftarTindakanByIdDaftarTindakan,
  findDaftarTindakanByIdDaftarTindakan,
  editDaftarTindakan,
  editDaftarTindakanActivate,
  editDaftarTindakanArchive,
  deleteDaftarTindakan,
};
