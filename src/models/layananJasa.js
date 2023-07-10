const Pool = require('../config/db');

const insertLayananJasa = (data) => {
  const { id, id_klinik_layanan, harga_jasa, harga_jual, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_layanan_jasa 
        (id, id_klinik_layanan, harga_jasa, harga_jual, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_layanan}', ${harga_jasa}, ${harga_jual}, ${is_active}, 
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

const allLayananJasa = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_jasa.id, 
        tbl_layanan_jasa.id_klinik_layanan, 
        tbl_layanan_jasa.harga_jasa, tbl_layanan_jasa.harga_jual, tbl_layanan_jasa.is_active, 
        tbl_layanan_jasa.created_at, tbl_layanan_jasa.updated_at
      FROM tbl_layanan_jasa AS tbl_layanan_jasa
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_jasa.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE
        CAST(tbl_layanan_jasa.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_layanan_jasa.${sortBy} ${sortOrder} 
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

const countAllLayananJasa = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_layanan_jasa AS tbl_layanan_jasa
    INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_jasa.id_klinik_layanan = tbl_klinik_layanan.id
    WHERE
      CAST(tbl_layanan_jasa.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getLayananJasaByIdLayananJasa = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_jasa.id, 
        tbl_layanan_jasa.id_klinik_layanan, 
        tbl_layanan_jasa.harga_jasa, tbl_layanan_jasa.harga_jual, tbl_layanan_jasa.is_active, 
        tbl_layanan_jasa.created_at, tbl_layanan_jasa.updated_at
      FROM tbl_layanan_jasa AS tbl_layanan_jasa
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_jasa.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_layanan_jasa.id = '${id}'`,
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

const findLayananJasaByIdLayananJasa = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan_jasa WHERE id = '${id}'`,
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

const getLayananJasaByIdKlinikLayanan = ({ id_klinik_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_jasa.id, 
        tbl_layanan_jasa.id_klinik_layanan, 
        tbl_layanan_jasa.harga_jasa, tbl_layanan_jasa.harga_jual, tbl_layanan_jasa.is_active, 
        tbl_layanan_jasa.created_at, tbl_layanan_jasa.updated_at
      FROM tbl_layanan_jasa AS tbl_layanan_jasa
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_jasa.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_layanan_jasa.id_klinik_layanan = '${id_klinik_layanan}'`,
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

const findLayananJasaByIdKlinikLayanan = (id_klinik_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan_jasa WHERE id_klinik_layanan = '${id_klinik_layanan}'`,
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

const editLayananJasa = (data) => {
  const { id, id_klinik_layanan, harga_jasa, harga_jual, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_jasa 
      SET
        id_klinik_layanan='${id_klinik_layanan}', harga_jasa=${harga_jasa}, harga_jual=${harga_jual}, is_active=${is_active}, 
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

const editLayananJasaActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_jasa 
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

const editLayananJasaArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_jasa 
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

const deleteLayananJasa = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_layanan_jasa WHERE id='${id}'`,
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
  insertLayananJasa,
  allLayananJasa,
  countAllLayananJasa,
  getLayananJasaByIdLayananJasa,
  findLayananJasaByIdLayananJasa,
  getLayananJasaByIdKlinikLayanan,
  findLayananJasaByIdKlinikLayanan,
  editLayananJasa,
  editLayananJasaActivate,
  editLayananJasaArchive,
  deleteLayananJasa,
};
