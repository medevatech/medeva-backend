const Pool = require('../config/db');

const insertPemakaianJasa = (data) => {
  const {
    id,
    id_layanan_jasa,
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
      `INSERT INTO tbl_pemakaian_jasa 
        (id, id_layanan_jasa, id_sales, id_sales_layanan, id_sales_paket, 
        tanggal, batch_num, harga_jual, jumlah_pakai, 
        is_active, created_at, updated_at) 
      VALUES
        ('${id}', '${id_layanan_jasa}', '${id_sales}', '${id_sales_layanan}', '${id_sales_paket}', 
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

const allPemakaianJasa = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE
        tbl_pemakaian_jasa.batch_num ILIKE '%${search}%' 
      AND
        CAST(tbl_pemakaian_jasa.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_pemakaian_jasa.${sortBy} ${sortOrder} 
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

const countAllPemakaianJasa = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
    INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
    INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
    INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
    INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
    WHERE
        tbl_pemakaian_jasa.batch_num ILIKE '%${search}%' 
    AND
        CAST(tbl_pemakaian_jasa.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getPemakaianJasaByIdPemakaianJasa = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_jasa.id = '${id}'`,
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

const findPemakaianJasaByIdPemakaianJasa = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_jasa WHERE id = '${id}'`,
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

const getPemakaianJasaByIdLayananJasa = ({ id_layanan_jasa }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_jasa.id_layanan_jasa = '${id_layanan_jasa}'`,
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

const findPemakaianJasaByIdLayananJasa = (id_layanan_jasa) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_jasa WHERE id_layanan_jasa = '${id_layanan_jasa}'`,
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

const getPemakaianJasaByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_jasa.id_sales = '${id_sales}'`,
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

const findPemakaianJasaByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_jasa WHERE id_sales = '${id_sales}'`,
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

const getPemakaianJasaByIdSalesLayanan = ({ id_sales_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_jasa.id_sales_layanan = '${id_sales_layanan}'`,
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

const findPemakaianJasaByIdSalesLayanan = (id_sales_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_jasa WHERE id_sales_layanan = '${id_sales_layanan}'`,
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

const getPemakaianJasaByIdSalesPaket = ({ id_sales_paket }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemakaian_jasa.id, 
        tbl_pemakaian_jasa.id_layanan_jasa,
        tbl_pemakaian_jasa.id_sales,
        tbl_pemakaian_jasa.id_sales_layanan,
        tbl_pemakaian_jasa.id_sales_paket,
        tbl_pemakaian_jasa.tanggal, tbl_pemakaian_jasa.batch_num, tbl_pemakaian_jasa.harga_jual, tbl_pemakaian_jasa.jumlah_pakai,
        tbl_pemakaian_jasa.is_active, tbl_pemakaian_jasa.created_at, tbl_pemakaian_jasa.updated_at
      FROM tbl_pemakaian_jasa AS tbl_pemakaian_jasa
      INNER JOIN tbl_layanan_jasa AS tbl_layanan_jasa ON tbl_pemakaian_jasa.id_layanan_jasa = tbl_layanan_jasa.id
      INNER JOIN tbl_sales AS tbl_sales ON tbl_pemakaian_jasa.id_sales = tbl_sales.id
      INNER JOIN tbl_sales_layanan AS tbl_sales_layanan ON tbl_pemakaian_jasa.id_sales_layanan = tbl_sales_layanan.id
      INNER JOIN tbl_sales_paket AS tbl_sales_paket ON tbl_pemakaian_jasa.id_sales_paket = tbl_sales_paket.id
      WHERE tbl_pemakaian_jasa.id_sales_paket = '${id_sales_paket}'`,
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

const findPemakaianJasaByIdSalesPaket = (id_sales_paket) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemakaian_jasa WHERE id_sales_paket = '${id_sales_paket}'`,
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

const editPemakaianJasa = (data) => {
  const {
    id,
    id_layanan_jasa,
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
      `UPDATE tbl_pemakaian_jasa 
      SET
        id_layanan_jasa='${id_layanan_jasa}', id_sales='${id_sales}', id_sales_layanan='${id_sales_layanan}', id_sales_paket='${id_sales_paket}', 
        tanggal='${tanggal}', batch_num='${batch_num}', harga_jual=${harga_jual}, jumlah_pakai=${jumlah_pakai}, 
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

const editPemakaianJasaActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_jasa 
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

const editPemakaianJasaArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemakaian_jasa 
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

const deletePemakaianJasa = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_pemakaian_jasa WHERE id='${id}'`,
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
  insertPemakaianJasa,
  allPemakaianJasa,
  countAllPemakaianJasa,
  getPemakaianJasaByIdPemakaianJasa,
  findPemakaianJasaByIdPemakaianJasa,
  getPemakaianJasaByIdLayananJasa,
  findPemakaianJasaByIdLayananJasa,
  getPemakaianJasaByIdSales,
  findPemakaianJasaByIdSales,
  getPemakaianJasaByIdSalesLayanan,
  findPemakaianJasaByIdSalesLayanan,
  getPemakaianJasaByIdSalesPaket,
  findPemakaianJasaByIdSalesPaket,
  editPemakaianJasa,
  editPemakaianJasaActivate,
  editPemakaianJasaArchive,
  deletePemakaianJasa,
};
