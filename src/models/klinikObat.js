const Pool = require('../config/db');

const insertKlinikObat = (data) => {
  const { id, id_klinik, id_obat, harga_jual, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_obat 
        (id, id_klinik, id_obat, harga_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik}', '${id_obat}', ${harga_jual}, ${is_active}, 
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

const allKlinikObat = ({
  search,
  searchNamaKlinik,
  searchNamaObat,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_obat.id, 
        tbl_klinik_obat.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_obat.id_obat, tbl_obat.nama AS nama_obat,
        tbl_klinik_obat.harga_jual, tbl_klinik_obat.is_active, 
        tbl_klinik_obat.created_at, tbl_klinik_obat.updated_at
      FROM tbl_klinik_obat AS tbl_klinik_obat
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_obat.id_klinik = tbl_klinik.id
      INNER JOIN tbl_obat as tbl_obat ON tbl_klinik_obat.id_obat = tbl_obat.id
      WHERE
        tbl_klinik.nama_klinik ILIKE '%${search}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
      AND
        tbl_obat.nama ILIKE '%${searchNamaObat}%' 
      AND
        CAST(tbl_klinik_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_obat.${sortBy} ${sortOrder} 
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

const countAllKlinikObat = (
  search,
  searchNamaKlinik,
  searchNamaObat,
  searchStatus
) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_klinik_obat AS tbl_klinik_obat
  INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_obat.id_klinik = tbl_klinik.id
  INNER JOIN tbl_obat as tbl_obat ON tbl_klinik_obat.id_obat = tbl_obat.id
  WHERE
    tbl_klinik.nama_klinik ILIKE '%${search}%' 
  AND
    tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
  AND
    tbl_obat.nama ILIKE '%${searchNamaObat}%' 
  AND
    CAST(tbl_klinik_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getKlinikObatByIdKlinikObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_obat.id, 
        tbl_klinik_obat.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_obat.id_obat, tbl_obat.nama AS nama_obat,
        tbl_klinik_obat.harga_jual, tbl_klinik_obat.is_active, 
        tbl_klinik_obat.created_at, tbl_klinik_obat.updated_at
      FROM tbl_klinik_obat AS tbl_klinik_obat
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_obat.id_klinik = tbl_klinik.id
      INNER JOIN tbl_obat as tbl_obat ON tbl_klinik_obat.id_obat = tbl_obat.id
      WHERE tbl_klinik_obat.id = '${id}'`,
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

const findKlinikObatByIdKlinikObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_obat WHERE id = '${id}'`,
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

const getKlinikObatByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_obat.id, 
        tbl_klinik_obat.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_obat.id_obat, tbl_obat.nama AS nama_obat,
        tbl_klinik_obat.harga_jual, tbl_klinik_obat.is_active, 
        tbl_klinik_obat.created_at, tbl_klinik_obat.updated_at
      FROM tbl_klinik_obat AS tbl_klinik_obat
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_obat.id_klinik = tbl_klinik.id
      INNER JOIN tbl_obat as tbl_obat ON tbl_klinik_obat.id_obat = tbl_obat.id
      WHERE tbl_klinik_obat.id_klinik = '${id_klinik}'`,
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

const findKlinikObatByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_obat WHERE id_klinik = '${id_klinik}'`,
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

const getKlinikObatByIdObat = ({ id_obat }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_obat.id, 
        tbl_klinik_obat.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_klinik_obat.id_obat, tbl_obat.nama AS nama_obat,
        tbl_klinik_obat.harga_jual, tbl_klinik_obat.is_active, 
        tbl_klinik_obat.created_at, tbl_klinik_obat.updated_at
      FROM tbl_klinik_obat AS tbl_klinik_obat
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_klinik_obat.id_klinik = tbl_klinik.id
      INNER JOIN tbl_obat as tbl_obat ON tbl_klinik_obat.id_obat = tbl_obat.id
      WHERE tbl_klinik_obat.id_obat = '${id_obat}'`,
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

const findKlinikObatByIdObat = (id_obat) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_obat WHERE id_obat = '${id_obat}'`,
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

const editKlinikObat = (data) => {
  const { id, id_klinik, id_obat, harga_jual, tipe, besar_klaim, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_obat 
      SET
        id_klinik='${id_klinik}', id_obat='${id_obat}', harga_jual=${harga_jual}, is_active=${is_active}, 
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

const editKlinikObatActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_obat 
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

const editKlinikObatArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_obat 
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

const deleteKlinikObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_obat WHERE id='${id}'`,
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
  insertKlinikObat,
  allKlinikObat,
  countAllKlinikObat,
  getKlinikObatByIdKlinikObat,
  findKlinikObatByIdKlinikObat,
  getKlinikObatByIdKlinik,
  findKlinikObatByIdKlinik,
  getKlinikObatByIdObat,
  findKlinikObatByIdObat,
  editKlinikObat,
  editKlinikObatActivate,
  editKlinikObatArchive,
  deleteKlinikObat,
};
