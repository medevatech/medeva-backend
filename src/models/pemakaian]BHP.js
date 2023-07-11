const Pool = require('../config/db');

const insertPemakaianBHP = (data) => {
  const {
    id,
    id_klinik_bhp,
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
      `INSERT INTO tbl_pemakaian_bhp 
        (id, id_klinik_bhp, id_sales, id_sales_layanan, id_sales_paket,
        tanggal, batch_num, harga_jual, jumlah_pakai, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_bhp}', '${id_sales}', '${id_sales_layanan}', '${id_sales_paket}', 
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

const allPemakaianBHP = ({
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
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE
        tbl_pemakaian_bhp.batch_num ILIKE '%${search}%' 
      AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
      AND
        CAST(tbl_pemakaian_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pemakaian_bhp.${sortBy} ${sortOrder} 
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

const countAllPemakaianBHP = (search, searchNamaKlinikBHP, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
    INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
    INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
    INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
    INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
    WHERE
        tbl_pemakaian_bhp.batch_num ILIKE '%${search}%' 
    AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
    AND
        CAST(tbl_pemakaian_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getPemakaianBHPByIdPemakaianBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_bhp.id = '${id}'`,
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

const findPemakaianBHPByIdPemakaianBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_bhp WHERE id = '${id}'`,
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

const getPemakaianBHPByIdKlinikBHP = ({ id_klinik_bhp }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_bhp.id_klinik_bhp = '${id_klinik_bhp}'`,
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

const findPemakaianBHPByIdKlinikBHP = (id_klinik_bhp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_bhp WHERE id_klinik_bhp = '${id_klinik_bhp}'`,
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

const getPemakaianBHPByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_bhp.id_sales = '${id_sales}'`,
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

const findPemakaianBHPByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_bhp WHERE id_sales = '${id_sales}'`,
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

const getPemakaianBHPByIdSalesLayanan = ({ id_sales_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_bhp.id_sales_layanan = '${id_sales_layanan}'`,
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

const findPemakaianBHPByIdSalesLayanan = (id_sales_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_bhp WHERE id_sales_layanan = '${id_sales_layanan}'`,
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

const getPemakaianBHPByIdSalesPaket = ({ id_sales_paket }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_bhp.id, 
        tbl_pemakaian_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_pemakaian_bhp.id_sales, 
        tbl_pemakaian_bhp.id_sales_layanan,
        tbl_pemakaian_bhp.id_sales_paket,
        tbl_pemakaian_bhp.tanggal, tbl_pemakaian_bhp.batch_num, tbl_pemakaian_bhp.harga_jual, tbl_pemakaian_bhp.jumlah_pakai,
        tbl_pemakaian_bhp.is_active, tbl_pemakaian_bhp.created_at, tbl_pemakaian_bhp.updated_at
      FROM tbl_pemakaian_bhp AS tbl_pemakaian_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_pemakaian_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_bhp.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_bhp.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_bhp.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_bhp.id_sales_paket = '${id_sales_paket}'`,
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

const findPemakaianBHPByIdSalesPaket = (id_sales_paket) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_bhp WHERE id_sales_paket = '${id_sales_paket}'`,
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

const editPemakaianBHP = (data) => {
  const {
    id,
    id_klinik_bhp,
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
      `UPDATE tbl_pemakaian_bhp 
      SET
        id_klinik_bhp='${id_klinik_bhp}', id_sales='${id_sales}', id_sales_layanan='${id_sales_layanan}', id_sales_paket='${id_sales_paket}', 
        tanggal='${tanggal}', batch_num='${batch_num}', harga_jual=${harga_jual}, jumlah_pakai=${jumlah_pakai}, is_active=${is_active}, 
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

const editPemakaianBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_bhp 
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

const editPemakaianBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_bhp 
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

const deletePemakaianBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_pemakaian_bhp WHERE id='${id}'`,
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
  insertPemakaianBHP,
  allPemakaianBHP,
  countAllPemakaianBHP,
  getPemakaianBHPByIdPemakaianBHP,
  findPemakaianBHPByIdPemakaianBHP,
  getPemakaianBHPByIdKlinikBHP,
  findPemakaianBHPByIdKlinikBHP,
  getPemakaianBHPByIdSales,
  findPemakaianBHPByIdSales,
  getPemakaianBHPByIdSalesLayanan,
  findPemakaianBHPByIdSalesLayanan,
  getPemakaianBHPByIdSalesPaket,
  findPemakaianBHPByIdSalesPaket,
  editPemakaianBHP,
  editPemakaianBHPActivate,
  editPemakaianBHPArchive,
  deletePemakaianBHP,
};
