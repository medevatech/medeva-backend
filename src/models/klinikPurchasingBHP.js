const Pool = require('../config/db');

const insertKlinikPurchasingBHP = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_bhp,
    batch_num,
    harga_beli,
    jumlah_beli,
    kadaluwarsa,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_purchasing_bhp 
        (id, id_purchase, id_klinik_bhp, batch_num,
        harga_beli, jumlah_beli, kadaluwarsa, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_purchase}', '${id_klinik_bhp}', '${batch_num}', 
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

const allKlinikPurchasingBHP = ({
  search,
  searchNamaKlinikBHP,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_bhp.id, 
        tbl_klinik_purchasing_bhp.id_purchase, 
        tbl_klinik_purchasing_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_purchasing_bhp.batch_num, tbl_klinik_purchasing_bhp.harga_beli, 
        tbl_klinik_purchasing_bhp.jumlah_beli, tbl_klinik_purchasing_bhp.is_active, 
        tbl_klinik_purchasing_bhp.created_at, tbl_klinik_purchasing_bhp.updated_at
      FROM tbl_klinik_purchasing_bhp AS tbl_klinik_purchasing_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_purchasing_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE
        tbl_klinik_purchasing_bhp.batch_num ILIKE '%${search}%' 
      AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
      AND
        CAST(tbl_klinik_purchasing_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_purchasing_bhp.${sortBy} ${sortOrder} 
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

const countAllKlinikPurchasingBHP = (
  search,
  searchNamaKlinikBHP,
  searchStatus
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_purchasing_bhp AS tbl_klinik_purchasing_bhp
    INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_bhp.id_purchase = tbl_purchase.id
    INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_purchasing_bhp.id_klinik_bhp = tbl_klinik_bhp.id
    WHERE
      tbl_klinik_purchasing_bhp.batch_num ILIKE '%${search}%' 
    AND
      tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
    AND
      CAST(tbl_klinik_purchasing_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikPurchasingBHPByIdKlinikPurchasingBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_bhp.id, 
        tbl_klinik_purchasing_bhp.id_purchase, 
        tbl_klinik_purchasing_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_purchasing_bhp.batch_num, tbl_klinik_purchasing_bhp.harga_beli, 
        tbl_klinik_purchasing_bhp.jumlah_beli, tbl_klinik_purchasing_bhp.is_active, 
        tbl_klinik_purchasing_bhp.created_at, tbl_klinik_purchasing_bhp.updated_at
      FROM tbl_klinik_purchasing_bhp AS tbl_klinik_purchasing_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_purchasing_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_purchasing_bhp.id = '${id}'`,
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

const findKlinikPurchasingBHPByIdKlinikPurchasingBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_bhp WHERE id = '${id}'`,
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

const getKlinikPurchasingBHPByIdPurchase = ({ id_purchase }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_bhp.id, 
        tbl_klinik_purchasing_bhp.id_purchase, 
        tbl_klinik_purchasing_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_purchasing_bhp.batch_num, tbl_klinik_purchasing_bhp.harga_beli, 
        tbl_klinik_purchasing_bhp.jumlah_beli, tbl_klinik_purchasing_bhp.is_active, 
        tbl_klinik_purchasing_bhp.created_at, tbl_klinik_purchasing_bhp.updated_at
      FROM tbl_klinik_purchasing_bhp AS tbl_klinik_purchasing_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_purchasing_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_purchasing_bhp.id_purchase = '${id_purchase}'`,
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

const findKlinikPurchasingBHPByIdPurchase = (id_purchase) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_bhp WHERE id_purchase = '${id_purchase}'`,
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

const getKlinikPurchasingBHPByIdKlinikBHP = ({ id_klinik_bhp }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_purchasing_bhp.id, 
        tbl_klinik_purchasing_bhp.id_purchase, 
        tbl_klinik_purchasing_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_purchasing_bhp.batch_num, tbl_klinik_purchasing_bhp.harga_beli, 
        tbl_klinik_purchasing_bhp.jumlah_beli, tbl_klinik_purchasing_bhp.is_active, 
        tbl_klinik_purchasing_bhp.created_at, tbl_klinik_purchasing_bhp.updated_at
      FROM tbl_klinik_purchasing_bhp AS tbl_klinik_purchasing_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_purchasing_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_purchasing_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_purchasing_bhp.id_klinik_bhp = '${id_klinik_bhp}'`,
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

const findKlinikPurchasingBHPByIdKlinikBHP = (id_klinik_bhp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_purchasing_bhp WHERE id_klinik_bhp = '${id_klinik_bhp}'`,
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

const editKlinikPurchasingBHP = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_bhp,
    batch_num,
    harga_beli,
    jumlah_beli,
    kadaluwarsa,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_bhp 
      SET
        id_purchase='${id_purchase}', id_klinik_bhp='${id_klinik_bhp}', batch_num='${batch_num}', 
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

const editKlinikPurchasingBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_bhp 
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

const editKlinikPurchasingBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_purchasing_bhp 
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

const deleteKlinikPurchasingBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_purchasing_bhp WHERE id='${id}'`,
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
  insertKlinikPurchasingBHP,
  allKlinikPurchasingBHP,
  countAllKlinikPurchasingBHP,
  getKlinikPurchasingBHPByIdKlinikPurchasingBHP,
  findKlinikPurchasingBHPByIdKlinikPurchasingBHP,
  getKlinikPurchasingBHPByIdPurchase,
  findKlinikPurchasingBHPByIdPurchase,
  getKlinikPurchasingBHPByIdKlinikBHP,
  findKlinikPurchasingBHPByIdKlinikBHP,
  editKlinikPurchasingBHP,
  editKlinikPurchasingBHPActivate,
  editKlinikPurchasingBHPArchive,
  deleteKlinikPurchasingBHP,
};
