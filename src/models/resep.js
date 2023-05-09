const Pool = require('../config/db');

const insertResep = (data) => {
  const { id, id_kunjungan, id_obat, jumlah, satuan, frekuensi, periode, metode_konsumsi, aturan_pakai, } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_resep 
        (id, id_kunjungan, id_obat, jumlah, satuan, 
          frekuensi, periode, metode_konsumsi, aturan_pakai,
          created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_obat}', '${jumlah}', '${satuan}', 
            '${frekuensi}', '${periode}', '${metode_konsumsi}', '${aturan_pakai}', 
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

const allResep = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, tbl_resep.id_obat, tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      WHERE tbl_resep.jumlah
      ILIKE '%${search}%' ORDER BY tbl_resep.${sortBy} ${sortOrder} 
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

const countAllResep = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_resep`);
};

const getResepById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, tbl_resep.id_kunjungan, tbl_resep.id_obat, tbl_resep.jumlah, tbl_resep.satuan, 
        tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi, tbl_resep.aturan_pakai, 
        tbl_resep.created_at, tbl_resep.updated_at
      FROM tbl_resep AS tbl_resep
      WHERE tbl_resep.id = '${id}'`,
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

const findResepById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_resep WHERE id = '${id}'
           `,
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

const editResep = (data) => {
  const {
    id,
    id_kunjungan,
    id_obat,
    jumlah,
    satuan,
    frekuensi,
    periode,
    metode_konsumsi,
    aturan_pakai,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_resep 
          SET
            id_kunjungan='${id_kunjungan}', id_obat='${id_obat}', jumlah='${jumlah}', satuan='${satuan}',
                frekuensi='${frekuensi}', periode='${periode}', metode_konsumsi='${metode_konsumsi}', aturan_pakai='${aturan_pakai}',
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

module.exports = {
  insertResep,
  allResep,
  countAllResep,
  findResepById,
  getResepById,
  editResep,
};
