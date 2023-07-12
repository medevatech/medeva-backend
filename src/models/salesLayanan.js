const Pool = require('../config/db');

const insertSalesLayanan = (data) => {
  const {
    id,
    id_sales,
    id_klinik_layanan,
    tanggal,
    harga_jual,
    jumlah_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_sales_layanan 
        (id, id_sales, id_klinik_layanan, tanggal, 
        harga_jual, jumlah_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_sales}', '${id_klinik_layanan}', '${tanggal}', 
        ${harga_jual}, ${jumlah_jual}, ${is_active}, 
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

const allSalesLayanan = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_layanan.id, 
        tbl_sales_layanan.id_sales,
        tbl_sales_layanan.id_klinik_layanan, 
        tbl_sales_layanan.tanggal, tbl_sales_layanan.harga_jual, tbl_sales_layanan.jumlah_jual, 
        tbl_sales_layanan.is_active, tbl_sales_layanan.created_at, tbl_sales_layanan.updated_at
      FROM tbl_sales_layanan AS tbl_sales_layanan
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_layanan.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_sales_layanan.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE
        CAST(tbl_sales_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_sales_layanan.${sortBy} ${sortOrder} 
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

const countAllSalesLayanan = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_sales_layanan AS tbl_sales_layanan
    INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_layanan.id_sales = tbl_sales.id
    INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_sales_layanan.id_klinik_layanan = tbl_klinik_layanan.id
    WHERE
      CAST(tbl_sales_layanan.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getSalesLayananByIdSalesLayanan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_layanan.id, 
        tbl_sales_layanan.id_sales,
        tbl_sales_layanan.id_klinik_layanan, 
        tbl_sales_layanan.tanggal, tbl_sales_layanan.harga_jual, tbl_sales_layanan.jumlah_jual, 
        tbl_sales_layanan.is_active, tbl_sales_layanan.created_at, tbl_sales_layanan.updated_at
      FROM tbl_sales_layanan AS tbl_sales_layanan
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_layanan.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_sales_layanan.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_sales_layanan.id = '${id}'`,
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

const findSalesLayananByIdSalesLayanan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_layanan WHERE id = '${id}'`,
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

const getSalesLayananByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_layanan.id, 
        tbl_sales_layanan.id_sales,
        tbl_sales_layanan.id_klinik_layanan, 
        tbl_sales_layanan.tanggal, tbl_sales_layanan.harga_jual, tbl_sales_layanan.jumlah_jual, 
        tbl_sales_layanan.is_active, tbl_sales_layanan.created_at, tbl_sales_layanan.updated_at
      FROM tbl_sales_layanan AS tbl_sales_layanan
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_layanan.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_sales_layanan.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_sales_layanan.id_sales = '${id_sales}'`,
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

const findSalesLayananByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_layanan WHERE id_sales = '${id_sales}'`,
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

const getSalesLayananByIdKlinikLayanan = ({ id_klinik_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_layanan.id, 
        tbl_sales_layanan.id_sales,
        tbl_sales_layanan.id_klinik_layanan, 
        tbl_sales_layanan.tanggal, tbl_sales_layanan.harga_jual, tbl_sales_layanan.jumlah_jual, 
        tbl_sales_layanan.is_active, tbl_sales_layanan.created_at, tbl_sales_layanan.updated_at
      FROM tbl_sales_layanan AS tbl_sales_layanan
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_layanan.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_sales_layanan.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_sales_layanan.id_klinik_layanan = '${id_klinik_layanan}'`,
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

const findSalesLayananByIdKlinikLayanan = (id_klinik_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_layanan WHERE id_klinik_layanan = '${id_klinik_layanan}'`,
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

const editSalesLayanan = (data) => {
  const {
    id,
    id_sales,
    id_klinik_layanan,
    tanggal,
    harga_jual,
    jumlah_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_layanan 
      SET
        id_sales='${id_sales}', id_klinik_layanan='${id_klinik_layanan}', 
        tanggal='${tanggal}', harga_jual=${harga_jual}, jumlah_jual=${jumlah_jual}, 
        is_active=${is_active}, updated_at=NOW()
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

const editSalesLayananActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_layanan 
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

const editSalesLayananArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_layanan 
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

const deleteSalesLayanan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_sales_layanan WHERE id='${id}'`,
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
  insertSalesLayanan,
  allSalesLayanan,
  countAllSalesLayanan,
  getSalesLayananByIdSalesLayanan,
  findSalesLayananByIdSalesLayanan,
  getSalesLayananByIdSales,
  findSalesLayananByIdSales,
  getSalesLayananByIdKlinikLayanan,
  findSalesLayananByIdKlinikLayanan,
  editSalesLayanan,
  editSalesLayananActivate,
  editSalesLayananArchive,
  deleteSalesLayanan,
};
