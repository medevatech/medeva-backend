const Pool = require('../config/db');

const insertPemeriksaan = (data) => {
  const { id, nama, id_layanan_lab } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pemeriksaan 
        (id, nama, id_layanan_lab,
            created_at, updated_at) 
        VALUES
        ('${id}', '${nama}', '${id_layanan_lab}', 
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

const allPemeriksaan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan.id, tbl_pemeriksaan.nama, tbl_pemeriksaan.id_layanan_lab, 
            to_char( tbl_pemeriksaan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_pemeriksaan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_pemeriksaan AS tbl_pemeriksaan
        WHERE tbl_pemeriksaan.nama
        ILIKE '%${search}%' ORDER BY tbl_pemeriksaan.${sortBy} ${sortOrder} 
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

const countAllPemeriksaan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_pemeriksaan`);
};

const getPemeriksaanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan.id, tbl_pemeriksaan.nama, tbl_pemeriksaan.id_layanan_lab, 
          to_char( tbl_pemeriksaan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
          to_char( tbl_pemeriksaan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_pemeriksaan AS tbl_pemeriksaan
      WHERE tbl_pemeriksaan.id = '${id}'`,
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

const findPemeriksaanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan WHERE id = '${id}'
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

const editPemeriksaan = (data) => {
  const { id, nama, id_layanan_lab } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan 
          SET
            nama='${nama}', id_layanan_lab='${id_layanan_lab}', 
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

const getPemeriksaanByIdLayananLab = ({ id_layanan_lab }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan.id, tbl_pemeriksaan.nama, tbl_pemeriksaan.id_layanan_lab, 
          to_char( tbl_pemeriksaan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
          to_char( tbl_pemeriksaan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_pemeriksaan AS tbl_pemeriksaan
      WHERE tbl_pemeriksaan.id_layanan_lab = '${id_layanan_lab}'`,
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

const findPemeriksaanByIdLayananLab = (id_layanan_lab) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan WHERE id_layanan_lab = '${id_layanan_lab}'
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

module.exports = {
  insertPemeriksaan,
  allPemeriksaan,
  countAllPemeriksaan,
  findPemeriksaanById,
  getPemeriksaanById,
  editPemeriksaan,
  getPemeriksaanByIdLayananLab,
  findPemeriksaanByIdLayananLab,
};
