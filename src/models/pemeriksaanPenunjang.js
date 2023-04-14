const Pool = require('../config/db');

const insertPemeriksaanPenunjang = (data) => {
  const { id, id_pemeriksaan, id_lab, id_kunjungan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_pemeriksaan_penunjang 
        (id, id_pemeriksaan, id_lab, id_kunjungan,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_pemeriksaan}', '${id_lab}', '${id_kunjungan}', 
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

const allPemeriksaanPenunjang = ({
  search,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
            tbl_pemeriksaan_penunjang.id_pemeriksaan, 
                tbl_pemeriksaan.nama AS nama,
            tbl_pemeriksaan_penunjang.id_lab, id_kunjungan,
            to_char( tbl_pemeriksaan_penunjang.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_pemeriksaan_penunjang.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
        INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
        WHERE tbl_pemeriksaan.nama
        ILIKE '%${search}%' ORDER BY tbl_pemeriksaan_penunjang.${sortBy} ${sortOrder} 
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

const countAllPemeriksaanPenunjang = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_pemeriksaan_penunjang`);
};

const getPemeriksaanPenunjangById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, 
            tbl_pemeriksaan.nama AS nama,
        tbl_pemeriksaan_penunjang.id_lab, id_kunjungan,
        to_char( tbl_pemeriksaan_penunjang.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_pemeriksaan_penunjang.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
      INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
      WHERE tbl_pemeriksaan_penunjang.id = '${id}'`,
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

const findPemeriksaanPenunjangById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_pemeriksaan_penunjang WHERE id = '${id}'
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

const editPemeriksaanPenunjang = (data) => {
  const { id, id_pemeriksaan, id_lab } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan_penunjang 
          SET
            id_pemeriksaan='${id_pemeriksaan}', id_lab='${id_lab}', 
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
  insertPemeriksaanPenunjang,
  allPemeriksaanPenunjang,
  countAllPemeriksaanPenunjang,
  findPemeriksaanPenunjangById,
  getPemeriksaanPenunjangById,
  editPemeriksaanPenunjang,
};
