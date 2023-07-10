const Pool = require('../config/db');

const insertKlinikStokObat = (data) => {
  const { id, id_klinik_purchasing_obat, id_klinik_obat, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_stok_obat 
        (id, id_klinik_purchasing_obat, id_klinik_obat, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_purchasing_obat}', '${id_klinik_obat}', ${is_active}, 
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

const allKlinikStokObat = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_obat.id, 
        tbl_klinik_stok_obat.id_klinik_purchasing_obat, 
        tbl_klinik_stok_obat.id_klinik_obat,
        tbl_klinik_stok_obat.is_active, 
        tbl_klinik_stok_obat.created_at, tbl_klinik_stok_obat.updated_at
      FROM tbl_klinik_stok_obat AS tbl_klinik_stok_obat
      INNER JOIN tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat ON tbl_klinik_stok_obat.id_klinik_purchasing_obat = tbl_klinik_purchasing_obat.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_stok_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE
        CAST(tbl_klinik_stok_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_stok_obat.${sortBy} ${sortOrder} 
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

const countAllKlinikStokObat = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_stok_obat AS tbl_klinik_stok_obat
    INNER JOIN tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat ON tbl_klinik_stok_obat.id_klinik_purchasing_obat = tbl_klinik_purchasing_obat.id
    INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_stok_obat.id_klinik_obat = tbl_klinik_obat.id
    WHERE
        CAST(tbl_klinik_stok_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikStokObatByIdKlinikStokObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_obat.id, 
        tbl_klinik_stok_obat.id_klinik_purchasing_obat, 
        tbl_klinik_stok_obat.id_klinik_obat,
        tbl_klinik_stok_obat.is_active, 
        tbl_klinik_stok_obat.created_at, tbl_klinik_stok_obat.updated_at
      FROM tbl_klinik_stok_obat AS tbl_klinik_stok_obat
      INNER JOIN tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat ON tbl_klinik_stok_obat.id_klinik_purchasing_obat = tbl_klinik_purchasing_obat.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_stok_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_stok_obat.id = '${id}'`,
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

const findKlinikStokObatByIdKlinikStokObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_obat WHERE id = '${id}'`,
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

const getKlinikStokObatByIdKlinikPurchasingObat = ({
  id_klinik_purchasing_obat,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_obat.id, 
        tbl_klinik_stok_obat.id_klinik_purchasing_obat, 
        tbl_klinik_stok_obat.id_klinik_obat,
        tbl_klinik_stok_obat.is_active, 
        tbl_klinik_stok_obat.created_at, tbl_klinik_stok_obat.updated_at
      FROM tbl_klinik_stok_obat AS tbl_klinik_stok_obat
      INNER JOIN tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat ON tbl_klinik_stok_obat.id_klinik_purchasing_obat = tbl_klinik_purchasing_obat.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_stok_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_stok_obat.id_klinik_purchasing_obat = '${id_klinik_purchasing_obat}'`,
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

const findKlinikStokObatByIdKlinikPurchasingObat = (
  id_klinik_purchasing_obat
) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_obat WHERE id_klinik_purchasing_obat = '${id_klinik_purchasing_obat}'`,
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

const getKlinikStokObatByIdKlinikObat = ({ id_klinik_obat }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_obat.id, 
        tbl_klinik_stok_obat.id_klinik_purchasing_obat, 
        tbl_klinik_stok_obat.id_klinik_obat,
        tbl_klinik_stok_obat.is_active, 
        tbl_klinik_stok_obat.created_at, tbl_klinik_stok_obat.updated_at
      FROM tbl_klinik_stok_obat AS tbl_klinik_stok_obat
      INNER JOIN tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat ON tbl_klinik_stok_obat.id_klinik_purchasing_obat = tbl_klinik_purchasing_obat.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_stok_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_stok_obat.id_klinik_obat = '${id_klinik_obat}'`,
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

const findKlinikStokObatByIdKlinikObat = (id_klinik_obat) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_obat WHERE id_klinik_obat = '${id_klinik_obat}'`,
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

const editKlinikStokObat = (data) => {
  const { id, id_klinik_purchasing_obat, id_klinik_obat, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_obat 
      SET
        id_klinik_purchasing_obat='${id_klinik_purchasing_obat}', id_klinik_obat='${id_klinik_obat}',
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

const editKlinikStokObatActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_obat 
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

const editKlinikStokObatArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_obat 
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

const deleteKlinikStokObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_stok_obat WHERE id='${id}'`,
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
  insertKlinikStokObat,
  allKlinikStokObat,
  countAllKlinikStokObat,
  getKlinikStokObatByIdKlinikStokObat,
  findKlinikStokObatByIdKlinikStokObat,
  getKlinikStokObatByIdKlinikPurchasingObat,
  findKlinikStokObatByIdKlinikPurchasingObat,
  getKlinikStokObatByIdKlinikObat,
  findKlinikStokObatByIdKlinikObat,
  editKlinikStokObat,
  editKlinikStokObatActivate,
  editKlinikStokObatArchive,
  deleteKlinikStokObat,
};
