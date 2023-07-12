const Pool = require('../config/db');

const insertPemakaianObat = (data) => {
  const {
    id,
    id_klinik_obat,
    id_sales,
    id_sales_layanan,
    id_sales_paket,
    tanggal,
    batch_num,
    harga_jual,
    jumlah_pakai,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pemakaian_obat 
        (id, id_klinik_obat, id_sales, id_sales_layanan, id_sales_paket, 
        tanggal, batch_num, harga_jual, jumlah_pakai, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_obat}', '${id_sales}', '${id_sales_layanan}', '${id_sales_paket}',
        '${tanggal}', '${batch_num}', ${harga_jual}, ${jumlah_pakai}, ${is_active}, 
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

const allPemakaianObat = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE
        tbl_pemakaian_obat.batch_num ILIKE '%${search}%' 
      AND
        CAST(tbl_pemakaian_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pemakaian_obat.${sortBy} ${sortOrder} 
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

const countAllPemakaianObat = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
    INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
    INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
    INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
    INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
    WHERE
        tbl_pemakaian_obat.batch_num ILIKE '%${search}%' 
    AND
        CAST(tbl_pemakaian_obat.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getPemakaianObatByIdPemakaianObat = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_obat.id = '${id}'`,
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

const findPemakaianObatByIdPemakaianObat = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_obat WHERE id = '${id}'`,
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

const getPemakaianObatByIdKlinikObat = ({ id_klinik_obat }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_obat.id_klinik_obat = '${id_klinik_obat}'`,
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

const findPemakaianObatByIdKlinikObat = (id_klinik_obat) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_obat WHERE id_klinik_obat = '${id_klinik_obat}'`,
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

const getPemakaianObatByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_obat.id_sales = '${id_sales}'`,
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

const findPemakaianObatByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_obat WHERE id_sales = '${id_sales}'`,
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

const getPemakaianObatByIdSalesLayanan = ({ id_sales_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_obat.id_sales_layanan = '${id_sales_layanan}'`,
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

const findPemakaianObatByIdSalesLayanan = (id_sales_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_obat WHERE id_sales_layanan = '${id_sales_layanan}'`,
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

const getPemakaianObatByIdSalesPaket = ({ id_sales_paket }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_obat.id, 
        tbl_pemakaian_obat.id_klinik_obat,
        tbl_pemakaian_obat.id_sales,
        tbl_pemakaian_obat.id_sales_layanan,
        tbl_pemakaian_obat.id_sales_paket,
        tbl_pemakaian_obat.tanggal, tbl_pemakaian_obat.batch_num, tbl_pemakaian_obat.harga_jual, tbl_pemakaian_obat.jumlah_pakai, 
        tbl_pemakaian_obat.is_active, tbl_pemakaian_obat.created_at, tbl_pemakaian_obat.updated_at
      FROM tbl_pemakaian_obat AS tbl_pemakaian_obat
      INNER JOIN tbl_klinik_obat AS tbl_klinik_obat ON tbl_pemakaian_obat.id_klinik_obat = tbl_klinik_obat.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_obat.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_obat.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_obat.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_obat.id_sales_paket = '${id_sales_paket}'`,
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

const findPemakaianObatByIdSalesPaket = (id_sales_paket) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_obat WHERE id_sales_paket = '${id_sales_paket}'`,
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

const editPemakaianObat = (data) => {
  const {
    id,
    id_klinik_obat,
    id_sales,
    id_sales_layanan,
    id_sales_paket,
    tanggal,
    batch_num,
    harga_jual,
    jumlah_pakai,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_obat 
      SET
        id_klinik_obat='${id_klinik_obat}', id_sales='${id_sales}', id_sales_layanan='${id_sales_layanan}', id_sales_paket='${id_sales_paket}', 
        tanggal='${tanggal}', batch_num='${batch_num}',  harga_jual=${harga_jual}, jumlah_pakai=${jumlah_pakai}, 
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

const editPemakaianObatActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_obat 
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

const editPemakaianObatArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_obat 
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

const deletePemakaianObat = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_pemakaian_obat WHERE id='${id}'`,
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
  insertPemakaianObat,
  allPemakaianObat,
  countAllPemakaianObat,
  getPemakaianObatByIdPemakaianObat,
  findPemakaianObatByIdPemakaianObat,
  getPemakaianObatByIdKlinikObat,
  findPemakaianObatByIdKlinikObat,
  getPemakaianObatByIdSales,
  findPemakaianObatByIdSales,
  getPemakaianObatByIdSalesLayanan,
  findPemakaianObatByIdSalesLayanan,
  getPemakaianObatByIdSalesPaket,
  findPemakaianObatByIdSalesPaket,
  editPemakaianObat,
  editPemakaianObatActivate,
  editPemakaianObatArchive,
  deletePemakaianObat,
};
