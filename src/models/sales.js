const Pool = require('../config/db');

const insertSales = (data) => {
  const {
    id,
    id_pasien,
    tanggal,
    total_penjualan,
    metode_pembayaran,
    status_pembayaran,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_sales 
        (id, id_pasien, tanggal, total_penjualan, metode_pembayaran,
        status_pembayaran, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_pasien}', '${tanggal}', ${total_penjualan}, '${metode_pembayaran}', 
        '${status_pembayaran}', ${is_active}, 
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

const allSales = ({
  search,
  searchNamaPasien,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales.id, 
        tbl_sales.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_sales.tanggal, tbl_sales.total_penjualan, tbl_sales.metode_pembayaran, 
        tbl_sales.status_pembayaran, tbl_sales.is_active, 
        tbl_sales.created_at, tbl_sales.updated_at
      FROM tbl_sales AS tbl_sales
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_sales.id_pasien = tbl_pasien.id
      WHERE
        (tbl_sales.metode_pembayaran ILIKE '%${search}%' 
      OR
        tbl_sales.status_pembayaran ILIKE '%${search}%')
      AND
        tbl_pasien.nama_lengkap ILIKE '%${searchNamaPasien}%' 
      AND
        CAST(tbl_sales.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_sales.${sortBy} ${sortOrder} 
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

const countAllSales = (search, searchNamaPasien, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_sales AS tbl_sales
    INNER JOIN tbl_pasien AS tbl_pasien ON tbl_sales.id_pasien = tbl_pasien.id
    WHERE
        tbl_sales.metode_pembayaran ILIKE '%${search}%' 
    OR
        tbl_sales.status_pembayaran ILIKE '%${search}%' 
    AND
        tbl_pasien.nama_lengkap ILIKE '%${searchNamaPasien}%' 
    AND
        CAST(tbl_sales.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getSalesByIdSales = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales.id, 
        tbl_sales.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_sales.tanggal, tbl_sales.total_penjualan, tbl_sales.metode_pembayaran, 
        tbl_sales.status_pembayaran, tbl_sales.is_active, 
        tbl_sales.created_at, tbl_sales.updated_at
      FROM tbl_sales AS tbl_sales
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_sales.id_pasien = tbl_pasien.id
      WHERE tbl_sales.id = '${id}'`,
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

const findSalesByIdSales = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_sales WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getSalesByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales.id, 
        tbl_sales.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_sales.tanggal, tbl_sales.total_penjualan, tbl_sales.metode_pembayaran, 
        tbl_sales.status_pembayaran, tbl_sales.is_active, 
        tbl_sales.created_at, tbl_sales.updated_at
      FROM tbl_sales AS tbl_sales
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_sales.id_pasien = tbl_pasien.id
      WHERE tbl_sales.id_pasien = '${id_pasien}'`,
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

const findSalesByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales WHERE id_pasien = '${id_pasien}'`,
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

const editSales = (data) => {
  const {
    id,
    id_pasien,
    tanggal,
    total_penjualan,
    metode_pembayaran,
    status_pembayaran,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales 
      SET
        id_pasien='${id_pasien}', tanggal='${tanggal}', total_penjualan=${total_penjualan}, metode_pembayaran='${metode_pembayaran}', 
        status_pembayaran='${status_pembayaran}', is_active=${is_active}, 
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

const editSalesActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales 
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

const editSalesArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales 
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

const deleteSales = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_sales WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertSales,
  allSales,
  countAllSales,
  getSalesByIdSales,
  findSalesByIdSales,
  getSalesByIdPasien,
  findSalesByIdPasien,
  editSales,
  editSalesActivate,
  editSalesArchive,
  deleteSales,
};
