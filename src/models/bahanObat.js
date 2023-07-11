const Pool = require('../config/db');

const insertBahanObat = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_bahan_obat 
        (id, nama, is_active,
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

const allBahanObat = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_bahan_obat.id, 
        tbl_bahan_obat.nama, tbl_bahan_obat.is_active, 
        tbl_bahan_obat.created_at, tbl_bahan_obat.updated_at
      FROM tbl_bahan_obat AS tbl_bahan_obat
      WHERE
        tbl_bahan_obat.nama ILIKE '%${search}%' 
      AND
        CAST(tbl_bahan_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_bahan_obat.${sortBy} ${sortOrder} 
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

const countAllBahanObat = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_bahan_obat AS tbl_bahan_obat
    WHERE
        tbl_bahan_obat.nama ILIKE '%${search}%' 
    AND
        CAST(tbl_bahan_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getBahanObatByIdBahanObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_bahan_obat.id, 
        tbl_bahan_obat.nama, tbl_bahan_obat.is_active, 
        tbl_bahan_obat.created_at, tbl_bahan_obat.updated_at
      FROM tbl_bahan_obat AS tbl_bahan_obat
      WHERE tbl_bahan_obat.id = '${id}'`,
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

const findBahanObatByIdBahanObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_bahan_obat WHERE id = '${id}'`,
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

const editBahanObat = (data) => {
  const { id, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_bahan_obat 
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

const editBahanObatActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_bahan_obat 
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

const editBahanObatArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_bahan_obat 
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

const deleteBahanObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_bahan_obat WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertBahanObat,
  allBahanObat,
  countAllBahanObat,
  getBahanObatByIdBahanObat,
  findBahanObatByIdBahanObat,
  editBahanObat,
  editBahanObatActivate,
  editBahanObatArchive,
  deleteBahanObat,
};
