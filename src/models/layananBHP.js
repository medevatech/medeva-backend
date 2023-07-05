const Pool = require('../config/db');

const insertLayananBHP = (data) => {
  const { id, id_klinik_bhp, id_klinik_layanan, jumlah_pakai, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_layanan_bhp 
        (id, id_klinik_bhp, id_klinik_layanan, jumlah_pakai, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_klinik_bhp}', '${id_klinik_layanan}', ${jumlah_pakai}, ${is_active}, 
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

const allLayananBHP = ({
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
      `SELECT tbl_layanan_bhp.id, 
        tbl_layanan_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_layanan_bhp.id_klinik_layanan, tbl_layanan_bhp.jumlah_pakai, tbl_layanan_bhp.is_active, 
        tbl_layanan_bhp.created_at, tbl_layanan_bhp.updated_at
      FROM tbl_layanan_bhp AS tbl_layanan_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_layanan_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_bhp.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE
        CAST(tbl_layanan_bhp.jumlah_pakai AS TEXT) ILIKE '%${search}%' 
      AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
      AND
        CAST(tbl_layanan_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_layanan_bhp.${sortBy} ${sortOrder} 
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

const countAllLayananBHP = (search, searchNamaKlinikBHP, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_layanan_bhp AS tbl_layanan_bhp
    INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_layanan_bhp.id_klinik_bhp = tbl_klinik_bhp.id
    INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_bhp.id_klinik_layanan = tbl_klinik_layanan.id
    WHERE
        CAST(tbl_layanan_bhp.jumlah_pakai AS TEXT) ILIKE '%${search}%' 
    AND
        tbl_klinik_bhp.nama ILIKE '%${searchNamaKlinikBHP}%' 
    AND
        CAST(tbl_layanan_bhp.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getLayananBHPByIdLayananBHP = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_bhp.id, 
        tbl_layanan_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_layanan_bhp.id_klinik_layanan, tbl_layanan_bhp.jumlah_pakai, tbl_layanan_bhp.is_active, 
        tbl_layanan_bhp.created_at, tbl_layanan_bhp.updated_at
      FROM tbl_layanan_bhp AS tbl_layanan_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_layanan_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_bhp.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_layanan_bhp.id = '${id}'`,
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

const findLayananBHPByIdLayananBHP = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan_bhp WHERE id = '${id}'`,
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

const getLayananBHPByIdKlinikBHP = ({ id_klinik_bhp }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_bhp.id, 
        tbl_layanan_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_layanan_bhp.id_klinik_layanan, tbl_layanan_bhp.jumlah_pakai, tbl_layanan_bhp.is_active, 
        tbl_layanan_bhp.created_at, tbl_layanan_bhp.updated_at
      FROM tbl_layanan_bhp AS tbl_layanan_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_layanan_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_bhp.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_layanan_bhp.id_klinik_bhp = '${id_klinik_bhp}'`,
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

const findLayananBHPByIdKlinikBHP = (id_klinik_bhp) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan_bhp WHERE id_klinik_bhp = '${id_klinik_bhp}'`,
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

const getLayananBHPByIdKlinikLayanan = ({ id_klinik_layanan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan_bhp.id, 
        tbl_layanan_bhp.id_klinik_bhp, tbl_klinik_bhp.nama AS nama_klinik_bhp,
        tbl_layanan_bhp.id_klinik_layanan, tbl_layanan_bhp.jumlah_pakai, tbl_layanan_bhp.is_active, 
        tbl_layanan_bhp.created_at, tbl_layanan_bhp.updated_at
      FROM tbl_layanan_bhp AS tbl_layanan_bhp
      INNER JOIN tbl_klinik_bhp AS tbl_klinik_bhp ON tbl_layanan_bhp.id_klinik_bhp = tbl_klinik_bhp.id
      INNER JOIN tbl_klinik_layanan AS tbl_klinik_layanan ON tbl_layanan_bhp.id_klinik_layanan = tbl_klinik_layanan.id
      WHERE tbl_layanan_bhp.id_klinik_layanan = '${id_klinik_layanan}'`,
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

const findLayananBHPByIdKlinikLayanan = (id_klinik_layanan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_layanan_bhp WHERE id_klinik_layanan = '${id_klinik_layanan}'`,
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

const editLayananBHP = (data) => {
  const { id, id_klinik_bhp, id_klinik_layanan, jumlah_pakai, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_bhp 
      SET
        id_klinik_bhp='${id_klinik_bhp}', id_klinik_layanan='${id_klinik_layanan}', 
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

const editLayananBHPActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_bhp 
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

const editLayananBHPArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan_bhp 
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

const deleteLayananBHP = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_layanan_bhp WHERE id='${id}'`,
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
  insertLayananBHP,
  allLayananBHP,
  countAllLayananBHP,
  getLayananBHPByIdLayananBHP,
  findLayananBHPByIdLayananBHP,
  getLayananBHPByIdKlinikBHP,
  findLayananBHPByIdKlinikBHP,
  getLayananBHPByIdKlinikLayanan,
  findLayananBHPByIdKlinikLayanan,
  editLayananBHP,
  editLayananBHPActivate,
  editLayananBHPArchive,
  deleteLayananBHP,
};
