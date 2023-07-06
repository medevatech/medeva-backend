const Pool = require('../config/db');

const insertKlinikPaket = (data) => {
  const { id, nama, harga_jual, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_paket 
        (id, nama, harga_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', ${harga_jual}, ${is_active}, 
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

const allKlinikPaket = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_paket.id, 
        tbl_klinik_paket.nama, tbl_klinik_paket.harga_jual, tbl_klinik_paket.is_active, 
        tbl_klinik_paket.created_at, tbl_klinik_paket.updated_at
      FROM tbl_klinik_paket AS tbl_klinik_paket
      WHERE
        tbl_klinik_paket.nama ILIKE '%${search}%' 
      AND
        CAST(tbl_klinik_paket.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_paket.${sortBy} ${sortOrder} 
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

const countAllKlinikPaket = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_paket AS tbl_klinik_paket
    WHERE
    tbl_klinik_paket.nama ILIKE '%${search}%' 
    AND
    CAST(tbl_klinik_paket.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikPaketByIdKlinikPaket = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_paket.id, 
        tbl_klinik_paket.nama, tbl_klinik_paket.harga_jual, tbl_klinik_paket.is_active, 
        tbl_klinik_paket.created_at, tbl_klinik_paket.updated_at
      FROM tbl_klinik_paket AS tbl_klinik_paket
      WHERE tbl_klinik_paket.id = '${id}'`,
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

const findKlinikPaketByIdKlinikPaket = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_paket WHERE id = '${id}'`,
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

const editKlinikPaket = (data) => {
  const { id, nama, harga_jual, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_paket 
      SET
        nama='${nama}', harga_jual=${harga_jual}, is_active=${is_active}, 
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

const editKlinikPaketActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_paket 
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

const editKlinikPaketArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_paket 
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

const deleteKlinikPaket = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_paket WHERE id='${id}'`,
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
  insertKlinikPaket,
  allKlinikPaket,
  countAllKlinikPaket,
  getKlinikPaketByIdKlinikPaket,
  findKlinikPaketByIdKlinikPaket,
  editKlinikPaket,
  editKlinikPaketActivate,
  editKlinikPaketArchive,
  deleteKlinikPaket,
};
