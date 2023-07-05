const Pool = require('../config/db');

const insertKlinikBHP = (data) => {
  const { id, id_klinik, nama, merk, satuan, harga_jual, tipe, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_bhp 
        (id, id_klinik, nama, merk, satuan, harga_jual, tipe, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik}', '${nama}', '${merk}', '${satuan}', ${harga_jual}, '${tipe}', ${is_active}, 
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

const allKlinikBHP = ({
  search,
  searchNamaKlinik,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_bhp.id, 
        tbl_klinik_bhp.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_bhp.nama, tbl_klinik_bhp.merk, tbl_klinik_bhp.satuan,
        tbl_klinik_bhp.harga_jual, tbl_klinik_bhp.tipe, tbl_klinik_bhp.is_active, 
        tbl_klinik_bhp.created_at, tbl_klinik_bhp.updated_at
      FROM tbl_klinik_bhp AS tbl_klinik_bhp
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_bhp.id_klinik = tbl_klinik.id
      WHERE
        tbl_klinik_bhp.satuan ILIKE '%${search}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
      AND
        CAST(tbl_klinik_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_bhp.${sortBy} ${sortOrder} 
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

const countAllKlinikBHP = (search, searchNamaKlinik, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_klinik_bhp AS tbl_klinik_bhp
  INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_bhp.id_klinik = tbl_klinik.id
  WHERE
    tbl_klinik_bhp.satuan ILIKE '%${search}%' 
  AND
    tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
  AND
    CAST(tbl_klinik_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getKlinikBHPByIdKlinikBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_bhp.id, 
        tbl_klinik_bhp.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_bhp.nama, tbl_klinik_bhp.merk, tbl_klinik_bhp.satuan,
        tbl_klinik_bhp.harga_jual, tbl_klinik_bhp.tipe, tbl_klinik_bhp.is_active, 
        tbl_klinik_bhp.created_at, tbl_klinik_bhp.updated_at
      FROM tbl_klinik_bhp AS tbl_klinik_bhp
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_bhp.id_klinik = tbl_klinik.id
      WHERE tbl_klinik_bhp.id = '${id}'`,
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

const findKlinikBHPByIdKlinikBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_bhp WHERE id = '${id}'`,
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

const getKlinikBHPByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_bhp.id, 
        tbl_klinik_bhp.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_bhp.nama, tbl_klinik_bhp.merk, tbl_klinik_bhp.satuan,
        tbl_klinik_bhp.harga_jual, tbl_klinik_bhp.tipe, tbl_klinik_bhp.is_active, 
        tbl_klinik_bhp.created_at, tbl_klinik_bhp.updated_at
      FROM tbl_klinik_bhp AS tbl_klinik_bhp
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_bhp.id_klinik = tbl_klinik.id
      WHERE tbl_klinik_bhp.id_klinik = '${id_klinik}'`,
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

const findKlinikBHPByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_bhp WHERE id_klinik = '${id_klinik}'`,
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

const editKlinikBHP = (data) => {
  const { id, id_klinik, nama, merk, satuan, harga_jual, tipe, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_bhp 
      SET
        id_klinik='${id_klinik}', nama='${nama}', merk='${merk}', satuan='${satuan}', harga_jual=${harga_jual}, tipe='${tipe}', is_active=${is_active}, 
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

const editKlinikBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_bhp 
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

const editKlinikBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_bhp 
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

const deleteKlinikBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_klinik_bhp WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertKlinikBHP,
  allKlinikBHP,
  countAllKlinikBHP,
  getKlinikBHPByIdKlinikBHP,
  findKlinikBHPByIdKlinikBHP,
  getKlinikBHPByIdKlinik,
  findKlinikBHPByIdKlinik,
  editKlinikBHP,
  editKlinikBHPActivate,
  editKlinikBHPArchive,
  deleteKlinikBHP,
};
