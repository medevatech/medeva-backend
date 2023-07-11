const Pool = require('../config/db');

const insertKlinikStokBHP = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_bhp,
    nama,
    batch_num,
    jumlah_stok,
    satuan_stok,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klinik_stok_bhp 
        (id, id_purchase, id_klinik_bhp, nama, batch_num, 
        jumlah_stok, satuan_stok, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_purchase}', '${id_klinik_bhp}', '${nama}', '${batch_num}', 
        ${jumlah_stok}, '${satuan_stok}', ${is_active}, 
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

const allKlinikStokBHP = ({
  search,
  searchNama,
  searchNamaKlinikBHP,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_bhp.id, 
        tbl_klinik_stok_bhp.id_purchase, 
        tbl_klinik_stok_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_stok_bhp.nama, tbl_klinik_stok_bhp.batch_num, 
        tbl_klinik_stok_bhp.jumlah_stok, tbl_klinik_stok_bhp.satuan_stok, tbl_klinik_stok_bhp.is_active, 
        tbl_klinik_stok_bhp.created_at, tbl_klinik_stok_bhp.updated_at
      FROM tbl_klinik_stok_bhp AS tbl_klinik_stok_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_stok_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_stok_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE
        tbl_klinik_stok_bhp.batch_num ILIKE '%${search}%' 
      AND
        tbl_klinik_stok_bhp.nama ILIKE '%${searchNama}%' 
      AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
      AND
        CAST(tbl_klinik_stok_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klinik_stok_bhp.${sortBy} ${sortOrder} 
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

const countAllKlinikStokBHP = (
  search,
  searchNama,
  searchNamaKlinikBHP,
  searchStatus
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klinik_stok_bhp AS tbl_klinik_stok_bhp
    INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_stok_bhp.id_purchase = tbl_purchase.id
    INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_stok_bhp.id_klinik_bhp = tbl_klinik_bhp.id
    WHERE
      tbl_klinik_stok_bhp.batch_num ILIKE '%${search}%' 
    AND
      tbl_klinik_stok_bhp.nama ILIKE '%${searchNama}%' 
    AND
      tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
    AND
      CAST(tbl_klinik_stok_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlinikStokBHPByIdKlinikStokBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_bhp.id, 
        tbl_klinik_stok_bhp.id_purchase, 
        tbl_klinik_stok_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_stok_bhp.nama, tbl_klinik_stok_bhp.batch_num, 
        tbl_klinik_stok_bhp.jumlah_stok, tbl_klinik_stok_bhp.satuan_stok, tbl_klinik_stok_bhp.is_active, 
        tbl_klinik_stok_bhp.created_at, tbl_klinik_stok_bhp.updated_at
      FROM tbl_klinik_stok_bhp AS tbl_klinik_stok_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_stok_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_stok_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_stok_bhp.id = '${id}'`,
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

const findKlinikStokBHPByIdKlinikStokBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_bhp WHERE id = '${id}'`,
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

const getKlinikStokBHPByIdPurchase = ({ id_purchase }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_bhp.id, 
        tbl_klinik_stok_bhp.id_purchase, 
        tbl_klinik_stok_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_stok_bhp.nama, tbl_klinik_stok_bhp.batch_num, 
        tbl_klinik_stok_bhp.jumlah_stok, tbl_klinik_stok_bhp.satuan_stok, tbl_klinik_stok_bhp.is_active, 
        tbl_klinik_stok_bhp.created_at, tbl_klinik_stok_bhp.updated_at
      FROM tbl_klinik_stok_bhp AS tbl_klinik_stok_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_stok_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_stok_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_stok_bhp.id_purchase = '${id_purchase}'`,
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

const findKlinikStokBHPByIdPurchase = (id_purchase) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_bhp WHERE id_purchase = '${id_purchase}'`,
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

const getKlinikStokBHPByIdKlinikBHP = ({ id_klinik_bhp }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klinik_stok_bhp.id, 
        tbl_klinik_stok_bhp.id_purchase, 
        tbl_klinik_stok_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_klinik_stok_bhp.nama, tbl_klinik_stok_bhp.batch_num, 
        tbl_klinik_stok_bhp.jumlah_stok, tbl_klinik_stok_bhp.satuan_stok, tbl_klinik_stok_bhp.is_active, 
        tbl_klinik_stok_bhp.created_at, tbl_klinik_stok_bhp.updated_at
      FROM tbl_klinik_stok_bhp AS tbl_klinik_stok_bhp
      INNER JOIN tbl_purchase AS tbl_purchase ON tbl_klinik_stok_bhp.id_purchase = tbl_purchase.id
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_klinik_stok_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      WHERE tbl_klinik_stok_bhp.id_klinik_bhp = '${id_klinik_bhp}'`,
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

const findKlinikStokBHPByIdKlinikBHP = (id_klinik_bhp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klinik_stok_bhp WHERE id_klinik_bhp = '${id_klinik_bhp}'`,
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

const editKlinikStokBHP = (data) => {
  const {
    id,
    id_purchase,
    id_klinik_bhp,
    nama,
    batch_num,
    jumlah_stok,
    satuan_stok,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_bhp 
      SET
        id_purchase='${id_purchase}', id_klinik_bhp='${id_klinik_bhp}', nama='${nama}', batch_num='${batch_num}', 
        jumlah_stok=${jumlah_stok}, satuan_stok='${satuan_stok}', is_active=${is_active}, 
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

const editKlinikStokBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_bhp 
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

const editKlinikStokBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klinik_stok_bhp 
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

const deleteKlinikStokBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_klinik_stok_bhp WHERE id='${id}'`,
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
  insertKlinikStokBHP,
  allKlinikStokBHP,
  countAllKlinikStokBHP,
  getKlinikStokBHPByIdKlinikStokBHP,
  findKlinikStokBHPByIdKlinikStokBHP,
  getKlinikStokBHPByIdPurchase,
  findKlinikStokBHPByIdPurchase,
  getKlinikStokBHPByIdKlinikBHP,
  findKlinikStokBHPByIdKlinikBHP,
  editKlinikStokBHP,
  editKlinikStokBHPActivate,
  editKlinikStokBHPArchive,
  deleteKlinikStokBHP,
};
