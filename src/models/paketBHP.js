const Pool = require('../config/db');

const insertPaketBHP = (data) => {
  const { id, id_klinik_bhp, id_klinik_paket, jumlah_pakai, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_paket_bhp 
        (id, id_klinik_bhp, id_klinik_paket, jumlah_pakai, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_bhp}', '${id_klinik_paket}', ${jumlah_pakai}, ${is_active}, 
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

const allPaketBHP = ({
  search,
  searchNamaKlinikBHP,
  searchNamaKlinikPaket,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_paket_bhp.id, 
        tbl_paket_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_paket_bhp.id_klinik_paket, tbl_klinik_paket.nama,
        tbl_paket_bhp.jumlah_pakai, tbl_paket_bhp.is_active, 
        tbl_paket_bhp.created_at, tbl_paket_bhp.updated_at
      FROM tbl_paket_bhp AS tbl_paket_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_paket_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_paket_bhp.id_klinik_paket = tbl_klinik_paket.id
      WHERE
        CAST(tbl_paket_bhp.jumlah_pakai AS TEXT) ILIKE '%${search}%' 
      AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
      AND
        tbl_klinik_paket.nama ILIKE '%${searchNamaKlinikPaket}%' 
      AND
        CAST(tbl_paket_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_paket_bhp.${sortBy} ${sortOrder} 
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

const countAllPaketBHP = (
  search,
  searchNamaKlinikBHP,
  searchNamaKlinikPaket,
  searchStatus
) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_paket_bhp AS tbl_paket_bhp
    INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_paket_bhp.id_klinik_bhp = tbl_klinik_bhp.id
    INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_paket_bhp.id_klinik_paket = tbl_klinik_paket.id
    WHERE
      CAST(tbl_paket_bhp.jumlah_pakai AS TEXT) ILIKE '%${search}%' 
    AND
      tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
    AND
      tbl_klinik_paket.nama ILIKE '%${searchNamaKlinikPaket}%' 
    AND
      CAST(tbl_paket_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getPaketBHPByIdPaketBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_paket_bhp.id, 
        tbl_paket_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_paket_bhp.id_klinik_paket, tbl_klinik_paket.nama,
        tbl_paket_bhp.jumlah_pakai, tbl_paket_bhp.is_active, 
        tbl_paket_bhp.created_at, tbl_paket_bhp.updated_at
      FROM tbl_paket_bhp AS tbl_paket_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_paket_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_paket_bhp.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_paket_bhp.id = '${id}'`,
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

const findPaketBHPByIdPaketBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_paket_bhp WHERE id = '${id}'`,
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

const getPaketBHPByIdKlinikBHP = ({ id_klinik_bhp }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_paket_bhp.id, 
        tbl_paket_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_paket_bhp.id_klinik_paket, tbl_klinik_paket.nama,
        tbl_paket_bhp.jumlah_pakai, tbl_paket_bhp.is_active, 
        tbl_paket_bhp.created_at, tbl_paket_bhp.updated_at
      FROM tbl_paket_bhp AS tbl_paket_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_paket_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_paket_bhp.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_paket_bhp.id_klinik_bhp = '${id_klinik_bhp}'`,
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

const findPaketBHPByIdKlinikBHP = (id_klinik_bhp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_paket_bhp WHERE id_klinik_bhp = '${id_klinik_bhp}'`,
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

const getPaketBHPByIdKlinikPaket = ({ id_klinik_paket }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_paket_bhp.id, 
        tbl_paket_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_paket_bhp.id_klinik_paket, tbl_klinik_paket.nama,
        tbl_paket_bhp.jumlah_pakai, tbl_paket_bhp.is_active, 
        tbl_paket_bhp.created_at, tbl_paket_bhp.updated_at
      FROM tbl_paket_bhp AS tbl_paket_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_paket_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_paket AS tbl_klinik_paket ON tbl_paket_bhp.id_klinik_paket = tbl_klinik_paket.id
      WHERE tbl_paket_bhp.id_klinik_paket = '${id_klinik_paket}'`,
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

const findPaketBHPByIdKlinikPaket = (id_klinik_paket) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_paket_bhp WHERE id_klinik_paket = '${id_klinik_paket}'`,
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

const editPaketBHP = (data) => {
  const { id, id_klinik_bhp, id_klinik_paket, jumlah_pakai, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_paket_bhp 
      SET
        id_klinik_bhp='${id_klinik_bhp}', id_klinik_paket='${id_klinik_paket}', 
        jumlah_pakai=${jumlah_pakai}, is_active=${is_active}, 
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

const editPaketBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_paket_bhp 
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

const editPaketBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_paket_bhp 
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

const deletePaketBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_paket_bhp WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPaketBHP,
  allPaketBHP,
  countAllPaketBHP,
  getPaketBHPByIdPaketBHP,
  findPaketBHPByIdPaketBHP,
  getPaketBHPByIdKlinikBHP,
  findPaketBHPByIdKlinikBHP,
  getPaketBHPByIdKlinikPaket,
  findPaketBHPByIdKlinikPaket,
  editPaketBHP,
  editPaketBHPActivate,
  editPaketBHPArchive,
  deletePaketBHP,
};
