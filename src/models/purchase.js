const Pool = require('../config/db');

const insertPurchase = (data) => {
  const { id, id_klinik, id_vendor, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_purchase 
        (id, id_klinik, id_vendor, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik}', '${id_vendor}', ${is_active}, 
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

const allPurchase = ({
  search,
  searchNamaKlinik,
  searchNamaVendor,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_purchase.id, 
        tbl_purchase.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_purchase.id_vendor, tbl_vendor.nama AS nama_vendor, 
        tbl_purchase.is_active, 
        tbl_purchase.created_at, tbl_purchase.updated_at
      FROM tbl_purchase AS tbl_purchase
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_purchase.id_klinik = tbl_klinik.id
      INNER JOIN tbl_vendor AS tbl_vendor ON tbl_purchase.id_vendor = tbl_vendor.id
      WHERE
        CAST(tbl_klinik.id AS TEXT) ILIKE '%${search}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
      AND
        tbl_vendor.nama ILIKE '%${searchNamaVendor}%' 
      AND
        CAST(tbl_purchase.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_purchase.${sortBy} ${sortOrder} 
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

const countAllPurchase = (
  search,
  searchNamaKlinik,
  searchNamaVendor,
  searchStatus
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_purchase AS tbl_purchase
    INNER JOIN tbl_klinik AS tbl_klinik ON tbl_purchase.id_klinik = tbl_klinik.id
    INNER JOIN tbl_vendor AS tbl_vendor ON tbl_purchase.id_vendor = tbl_vendor.id
    WHERE
        tbl_klinik.nama_klinik ILIKE '%${search}%' 
    AND
        tbl_klinik.nama_klinik ILIKE '%${searchNamaKlinik}%' 
    AND
        tbl_vendor.nama ILIKE '%${searchNamaVendor}%' 
    AND
        CAST(tbl_purchase.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getPurchaseByIdPurchase = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_purchase.id, 
        tbl_purchase.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_purchase.id_vendor, tbl_vendor.nama AS nama_vendor, 
        tbl_purchase.is_active, 
        tbl_purchase.created_at, tbl_purchase.updated_at
      FROM tbl_purchase AS tbl_purchase
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_purchase.id_klinik = tbl_klinik.id
      INNER JOIN tbl_vendor AS tbl_vendor ON tbl_purchase.id_vendor = tbl_vendor.id
      WHERE tbl_purchase.id = '${id}'`,
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

const findPurchaseByIdPurchase = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_purchase WHERE id = '${id}'`,
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

const getPurchaseByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_purchase.id, 
        tbl_purchase.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_purchase.id_vendor, tbl_vendor.nama AS nama_vendor, 
        tbl_purchase.is_active, 
        tbl_purchase.created_at, tbl_purchase.updated_at
      FROM tbl_purchase AS tbl_purchase
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_purchase.id_klinik = tbl_klinik.id
      INNER JOIN tbl_vendor AS tbl_vendor ON tbl_purchase.id_vendor = tbl_vendor.id
      WHERE tbl_purchase.id_klinik = '${id_klinik}'`,
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

const findPurchaseByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_purchase WHERE id_klinik = '${id_klinik}'`,
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

const getPurchaseByIdVendor = ({ id_vendor }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_purchase.id, 
        tbl_purchase.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_purchase.id_vendor, tbl_vendor.nama AS nama_vendor, 
        tbl_purchase.is_active, 
        tbl_purchase.created_at, tbl_purchase.updated_at
      FROM tbl_purchase AS tbl_purchase
      INNER JOIN tbl_klinik AS tbl_klinik ON tbl_purchase.id_klinik = tbl_klinik.id
      INNER JOIN tbl_vendor AS tbl_vendor ON tbl_purchase.id_vendor = tbl_vendor.id
      WHERE tbl_purchase.id_vendor = '${id_vendor}'`,
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

const findPurchaseByIdVendor = (id_vendor) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_purchase WHERE id_vendor = '${id_vendor}'`,
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

const editPurchase = (data) => {
  const { id, id_klinik, id_vendor, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_purchase 
      SET
        id_klinik='${id_klinik}', id_vendor='${id_vendor}', is_active=${is_active}, 
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

const editPurchaseActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_purchase 
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

const editPurchaseArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_purchase 
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

const deletePurchase = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_purchase WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPurchase,
  allPurchase,
  countAllPurchase,
  getPurchaseByIdPurchase,
  findPurchaseByIdPurchase,
  getPurchaseByIdKlinik,
  findPurchaseByIdKlinik,
  getPurchaseByIdVendor,
  findPurchaseByIdVendor,
  editPurchase,
  editPurchaseActivate,
  editPurchaseArchive,
  deletePurchase,
};
