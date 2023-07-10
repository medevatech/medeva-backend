const Pool = require('../config/db');

const insertKlinikPurchasingObat = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_obat,
    batch_num,
    harga_beli,
    jumlah_beli,
    kadaluwarsa,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_purchasing_obat 
        (id, id_purchase, id_klinik_obat, batch_num, 
        harga_beli, jumlah_beli, kadaluwarsa, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_purchase}', '${id_klinik_obat}', '${batch_num}', 
        ${harga_beli}, ${jumlah_beli}, '${kadaluwarsa}', ${is_active},
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

const allKlinikPurchasingObat = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_obat.id, 
        tbl_klinik_purchasing_obat.id_purchase, 
        tbl_klinik_purchasing_obat.id_klinik_obat,
        tbl_klinik_purchasing_obat.batch_num, 
        tbl_klinik_purchasing_obat.harga_beli, tbl_klinik_purchasing_obat.jumlah_beli, 
        tbl_klinik_purchasing_obat.kadaluwarsa, tbl_klinik_purchasing_obat.is_active, 
        tbl_klinik_purchasing_obat.created_at, tbl_klinik_purchasing_obat.updated_at
      FROM tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_obat.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_purchasing_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE
        tbl_klinik_purchasing_obat.batch_num ILIKE '%${search}%' 
      AND
        CAST(tbl_klinik_purchasing_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_purchasing_obat.${sortBy} ${sortOrder} 
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

const countAllKlinikPurchasingObat = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat
    INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_obat.id_purchase = tbl_purchase.id
    INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_purchasing_obat.id_klinik_obat = tbl_klinik_obat.id
    WHERE
    tbl_klinik_purchasing_obat.batch_num ILIKE '%${search}%' 
    AND
    CAST(tbl_klinik_purchasing_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikPurchasingObatByIdKlinikPurchasingObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_obat.id, 
        tbl_klinik_purchasing_obat.id_purchase, 
        tbl_klinik_purchasing_obat.id_klinik_obat,
        tbl_klinik_purchasing_obat.batch_num, 
        tbl_klinik_purchasing_obat.harga_beli, tbl_klinik_purchasing_obat.jumlah_beli, 
        tbl_klinik_purchasing_obat.kadaluwarsa, tbl_klinik_purchasing_obat.is_active, 
        tbl_klinik_purchasing_obat.created_at, tbl_klinik_purchasing_obat.updated_at
      FROM tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_obat.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_purchasing_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_purchasing_obat.id = '${id}'`,
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

const findKlinikPurchasingObatByIdKlinikPurchasingObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_obat WHERE id = '${id}'`,
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

const getKlinikPurchasingObatByIdPurchase = ({ id_purchase }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_obat.id, 
        tbl_klinik_purchasing_obat.id_purchase, 
        tbl_klinik_purchasing_obat.id_klinik_obat,
        tbl_klinik_purchasing_obat.batch_num, 
        tbl_klinik_purchasing_obat.harga_beli, tbl_klinik_purchasing_obat.jumlah_beli, 
        tbl_klinik_purchasing_obat.kadaluwarsa, tbl_klinik_purchasing_obat.is_active, 
        tbl_klinik_purchasing_obat.created_at, tbl_klinik_purchasing_obat.updated_at
      FROM tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_obat.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_purchasing_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_purchasing_obat.id_purchase = '${id_purchase}'`,
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

const findKlinikPurchasingObatByIdPurchase = (id_purchase) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_obat WHERE id_purchase = '${id_purchase}'`,
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

const getKlinikPurchasingObatByIdKlinikObat = ({ id_klinik_obat }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_obat.id, 
        tbl_klinik_purchasing_obat.id_purchase, 
        tbl_klinik_purchasing_obat.id_klinik_obat,
        tbl_klinik_purchasing_obat.batch_num, 
        tbl_klinik_purchasing_obat.harga_beli, tbl_klinik_purchasing_obat.jumlah_beli, 
        tbl_klinik_purchasing_obat.kadaluwarsa, tbl_klinik_purchasing_obat.is_active, 
        tbl_klinik_purchasing_obat.created_at, tbl_klinik_purchasing_obat.updated_at
      FROM tbl_klinik_purchasing_obat AS tbl_klinik_purchasing_obat
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_obat.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_klinik_purchasing_obat.id_klinik_obat = tbl_klinik_obat.id
      WHERE tbl_klinik_purchasing_obat.id_klinik_obat = '${id_klinik_obat}'`,
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

const findKlinikPurchasingObatByIdKlinikObat = (id_klinik_obat) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_obat WHERE id_klinik_obat = '${id_klinik_obat}'`,
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

const editKlinikPurchasingObat = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_obat,
    batch_num,
    harga_beli,
    jumlah_beli,
    kadaluwarsa,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_obat 
      SET
        id_purchase='${id_purchase}', id_klinik_obat='${id_klinik_obat}', batch_num='${batch_num}', 
        harga_beli=${harga_beli}, jumlah_beli=${jumlah_beli}, kadaluwarsa='${kadaluwarsa}', is_active=${is_active}, 
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

const editKlinikPurchasingObatActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_obat 
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

const editKlinikPurchasingObatArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_obat 
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

const deleteKlinikPurchasingObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_purchasing_obat WHERE id='${id}'`,
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
  insertKlinikPurchasingObat,
  allKlinikPurchasingObat,
  countAllKlinikPurchasingObat,
  getKlinikPurchasingObatByIdKlinikPurchasingObat,
  findKlinikPurchasingObatByIdKlinikPurchasingObat,
  getKlinikPurchasingObatByIdPurchase,
  findKlinikPurchasingObatByIdPurchase,
  getKlinikPurchasingObatByIdKlinikObat,
  findKlinikPurchasingObatByIdKlinikObat,
  editKlinikPurchasingObat,
  editKlinikPurchasingObatActivate,
  editKlinikPurchasingObatArchive,
  deleteKlinikPurchasingObat,
};
