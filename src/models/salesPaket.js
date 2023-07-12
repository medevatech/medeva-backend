const Pool = require('../config/db');

const insertSalesPaket = (data) => {
  const {
    id,
    id_sales,
    id_klinik_paket,
    tanggal,
    harga_jual,
    jumlah_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_sales_paket 
        (id, id_sales, id_klinik_paket, tanggal,
        harga_jual, jumlah_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_sales}', '${id_klinik_paket}', '${tanggal}', 
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

const allSalesPaket = ({
  search,
  searchNamaKlinikPaket,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_paket.id, 
        tbl_sales_paket.id_sales,
        tbl_sales_paket.id_klinik_paket, tbl_klinik_paket.nama AS nama_klinik_paket,
        tbl_sales_paket.tanggal, tbl_sales_paket.harga_jual, tbl_sales_paket.jumlah_jual, 
        tbl_sales_paket.is_active, tbl_sales_paket.created_at, tbl_sales_paket.updated_at
      FROM tbl_sales_paket AS tbl_sales_paket
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_paket.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_sales_paket.id_klinik_paket = tbl_klinik_paket.id
      WHERE
        tbl_klinik_paket.nama ILIKE '%${searchNamaKlinikPaket}%' 
      AND
        CAST(tbl_sales_paket.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_sales_paket.${sortBy} ${sortOrder} 
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

const countAllSalesPaket = (search, searchNamaKlinikPaket, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_sales_paket AS tbl_sales_paket
    INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_paket.id_sales = tbl_sales.id
    INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_sales_paket.id_klinik_paket = tbl_klinik_paket.id
    WHERE
        tbl_klinik_paket.nama ILIKE '%${searchNamaKlinikPaket}%' 
    AND
        CAST(tbl_sales_paket.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getSalesPaketByIdSalesPaket = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_paket.id, 
        tbl_sales_paket.id_sales,
        tbl_sales_paket.id_klinik_paket, tbl_klinik_paket.nama AS nama_klinik_paket,
        tbl_sales_paket.tanggal, tbl_sales_paket.harga_jual, tbl_sales_paket.jumlah_jual, 
        tbl_sales_paket.is_active, tbl_sales_paket.created_at, tbl_sales_paket.updated_at
      FROM tbl_sales_paket AS tbl_sales_paket
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_paket.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_sales_paket.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_sales_paket.id = '${id}'`,
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

const findSalesPaketByIdSalesPaket = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_paket WHERE id = '${id}'`,
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

const getSalesPaketByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_paket.id, 
        tbl_sales_paket.id_sales,
        tbl_sales_paket.id_klinik_paket, tbl_klinik_paket.nama AS nama_klinik_paket,
        tbl_sales_paket.tanggal, tbl_sales_paket.harga_jual, tbl_sales_paket.jumlah_jual, 
        tbl_sales_paket.is_active, tbl_sales_paket.created_at, tbl_sales_paket.updated_at
      FROM tbl_sales_paket AS tbl_sales_paket
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_paket.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_sales_paket.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_sales_paket.id_sales = '${id_sales}'`,
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

const findSalesPaketByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_paket WHERE id_sales = '${id_sales}'`,
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

const getSalesPaketByIdKlinikPaket = ({ id_klinik_paket }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_sales_paket.id, 
        tbl_sales_paket.id_sales,
        tbl_sales_paket.id_klinik_paket, tbl_klinik_paket.nama AS nama_klinik_paket,
        tbl_sales_paket.tanggal, tbl_sales_paket.harga_jual, tbl_sales_paket.jumlah_jual, 
        tbl_sales_paket.is_active, tbl_sales_paket.created_at, tbl_sales_paket.updated_at
      FROM tbl_sales_paket AS tbl_sales_paket
      INNER JOIN tbl_sales AS tbl_sales ON tbl_sales_paket.id_sales = tbl_sales.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_sales_paket.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_sales_paket.id_klinik_paket = '${id_klinik_paket}'`,
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

const findSalesPaketByIdKlinikPaket = (id_klinik_paket) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_sales_paket WHERE id_klinik_paket = '${id_klinik_paket}'`,
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

const editSalesPaket = (data) => {
  const {
    id,
    id_sales,
    id_klinik_paket,
    tanggal,
    harga_jual,
    jumlah_jual,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_paket 
      SET
        id_sales='${id_sales}', id_klinik_paket='${id_klinik_paket}', tanggal='${tanggal}', 
        harga_jual=${harga_jual}, jumlah_jual=${jumlah_jual}, is_active=${is_active}, 
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

const editSalesPaketActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_paket 
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

const editSalesPaketArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_sales_paket 
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

const deleteSalesPaket = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_sales_paket WHERE id='${id}'`,
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
  insertSalesPaket,
  allSalesPaket,
  countAllSalesPaket,
  getSalesPaketByIdSalesPaket,
  findSalesPaketByIdSalesPaket,
  getSalesPaketByIdSales,
  findSalesPaketByIdSales,
  getSalesPaketByIdKlinikPaket,
  findSalesPaketByIdKlinikPaket,
  editSalesPaket,
  editSalesPaketActivate,
  editSalesPaketArchive,
  deleteSalesPaket,
};
