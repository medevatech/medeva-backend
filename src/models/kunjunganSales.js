const Pool = require('../config/db');

const insertKunjunganSales = (data) => {
  const { id, id_kunjungan, id_sales, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_kunjungan_sales 
        (id, id_kunjungan, id_sales, 
        is_active, created_at, updated_at) 
      VALUES
        ('${id}', '${id_kunjungan}', '${id_sales}', 
        ${is_active}, NOW(), NOW())`,
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

const allKunjunganSales = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan_sales.id, 
        tbl_kunjungan_sales.id_kunjungan,
        tbl_kunjungan_sales.id_sales,
        tbl_kunjungan_sales.is_active, tbl_kunjungan_sales.created_at, tbl_kunjungan_sales.updated_at
      FROM tbl_kunjungan_sales AS tbl_kunjungan_sales
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_kunjungan_sales.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_kunjungan_sales.id_sales = tbl_sales.id
      WHERE
        CAST(tbl_kunjungan_sales.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_kunjungan_sales.${sortBy} ${sortOrder} 
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

const countAllKunjunganSales = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_kunjungan_sales AS tbl_kunjungan_sales
    INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_kunjungan_sales.id_kunjungan = tbl_kunjungan.id
    INNER JOIN tbl_sales AS tbl_sales ON tbl_kunjungan_sales.id_sales = tbl_sales.id
    WHERE
        CAST(tbl_kunjungan_sales.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKunjunganSalesByIdKunjunganSales = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan_sales.id, 
        tbl_kunjungan_sales.id_kunjungan,
        tbl_kunjungan_sales.id_sales,
        tbl_kunjungan_sales.is_active, tbl_kunjungan_sales.created_at, tbl_kunjungan_sales.updated_at
      FROM tbl_kunjungan_sales AS tbl_kunjungan_sales
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_kunjungan_sales.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_kunjungan_sales.id_sales = tbl_sales.id
      WHERE tbl_kunjungan_sales.id = '${id}'`,
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

const findKunjunganSalesByIdKunjunganSales = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kunjungan_sales WHERE id = '${id}'`,
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

const getKunjunganSalesByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan_sales.id, 
        tbl_kunjungan_sales.id_kunjungan,
        tbl_kunjungan_sales.id_sales,
        tbl_kunjungan_sales.is_active, tbl_kunjungan_sales.created_at, tbl_kunjungan_sales.updated_at
      FROM tbl_kunjungan_sales AS tbl_kunjungan_sales
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_kunjungan_sales.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_kunjungan_sales.id_sales = tbl_sales.id
      WHERE tbl_kunjungan_sales.id_kunjungan = '${id_kunjungan}'`,
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

const findKunjunganSalesByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kunjungan_sales WHERE id_kunjungan = '${id_kunjungan}'`,
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

const getKunjunganSalesByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan_sales.id, 
        tbl_kunjungan_sales.id_kunjungan,
        tbl_kunjungan_sales.id_sales,
        tbl_kunjungan_sales.is_active, tbl_kunjungan_sales.created_at, tbl_kunjungan_sales.updated_at
      FROM tbl_kunjungan_sales AS tbl_kunjungan_sales
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_kunjungan_sales.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_kunjungan_sales.id_sales = tbl_sales.id
      WHERE tbl_kunjungan_sales.id_sales = '${id_sales}'`,
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

const findKunjunganSalesByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kunjungan_sales WHERE id_sales = '${id_sales}'`,
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

const editKunjunganSales = (data) => {
  const { id, id_kunjungan, id_sales, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kunjungan_sales 
      SET
        id_kunjungan='${id_kunjungan}', id_sales='${id_sales}', 
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

const editKunjunganSalesActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kunjungan_sales 
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

const editKunjunganSalesArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kunjungan_sales 
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

const deleteKunjunganSales = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_kunjungan_sales WHERE id='${id}'`,
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
  insertKunjunganSales,
  allKunjunganSales,
  countAllKunjunganSales,
  getKunjunganSalesByIdKunjunganSales,
  findKunjunganSalesByIdKunjunganSales,
  getKunjunganSalesByIdKunjungan,
  findKunjunganSalesByIdKunjungan,
  getKunjunganSalesByIdSales,
  findKunjunganSalesByIdSales,
  editKunjunganSales,
  editKunjunganSalesActivate,
  editKunjunganSalesArchive,
  deleteKunjunganSales,
};
