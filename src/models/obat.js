const Pool = require('../config/db');

const insertObat = (data) => {
  const {
    id,
    nama,
    golongan,
    kategori,
    dosis,
    satuan_dosis,
    satuan,
    jual_per,
    produsen,
    deskripsi,
    indikasi,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_obat 
        (id, nama, golongan, kategori, dosis, satuan_dosis,
        satuan, jual_per, produsen, deskripsi, indikasi, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', '${golongan}', '${kategori}', ${dosis}, '${satuan_dosis}', 
        '${satuan}', '${jual_per}', '${produsen}', '${deskripsi}', '${indikasi}', ${is_active}, 
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

const allObat = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_obat.id, tbl_obat.nama, tbl_obat.golongan, tbl_obat.kategori, tbl_obat.dosis, tbl_obat.satuan_dosis, 
        tbl_obat.satuan, tbl_obat.jual_per, tbl_obat.produsen, tbl_obat.deskripsi, tbl_obat.indikasi, tbl_obat.is_active, 
        tbl_obat.created_at, tbl_obat.updated_at
      FROM tbl_obat AS tbl_obat
      WHERE
        tbl_obat.nama ILIKE '%${search}%'
      OR
        tbl_obat.produsen ILIKE '%${search}%'
      OR
        tbl_obat.deskripsi ILIKE '%${search}%'
      OR
        tbl_obat.indikasi ILIKE '%${search}%'
      AND
        CAST (tbl_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_obat.${sortBy} ${sortOrder} 
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

const countAllObat = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_obat AS tbl_obat
  WHERE
    tbl_obat.nama ILIKE '%${search}%'
  OR
    tbl_obat.produsen ILIKE '%${search}%'
  OR
    tbl_obat.deskripsi ILIKE '%${search}%'
  OR
    tbl_obat.indikasi ILIKE '%${search}%'
  AND
    CAST (tbl_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getObatByIdObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_obat.id, tbl_obat.nama, tbl_obat.golongan, tbl_obat.kategori, tbl_obat.dosis, tbl_obat.satuan_dosis, 
        tbl_obat.satuan, tbl_obat.jual_per, tbl_obat.produsen, tbl_obat.deskripsi, tbl_obat.indikasi, tbl_obat.is_active, 
        tbl_obat.created_at, tbl_obat.updated_at
      FROM tbl_obat AS tbl_obat
      WHERE tbl_obat.id = '${id}'`,
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

const findObatByIdObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_obat WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editObat = (data) => {
  const {
    id,
    nama,
    golongan,
    kategori,
    dosis,
    satuan_dosis,
    satuan,
    jual_per,
    produsen,
    deskripsi,
    indikasi,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_obat 
      SET
        nama='${nama}', golongan='${golongan}', kategori='${kategori}', dosis=${dosis}, satuan_dosis='${satuan_dosis}', 
          satuan='${satuan}', jual_per='${jual_per}', produsen='${produsen}', deskripsi='${deskripsi}', indikasi='${indikasi}', is_active=${is_active}, 
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

const editObatActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_obat 
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

const deleteObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_obat WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertObat,
  allObat,
  countAllObat,
  getObatByIdObat,
  findObatByIdObat,
  editObat,
  editObatActiveArchive,
  deleteObat,
};
