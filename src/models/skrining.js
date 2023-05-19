const Pool = require('../config/db');

const insertSkrining = (data) => {
  const { id, id_pasien } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_skrining 
        (id, id_pasien, 
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_pasien}', 
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

const allSkrining = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_skrining.id, 
        tbl_skrining.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_skrining.created_at ,
        tbl_skrining.updated_at 
      FROM tbl_skrining AS tbl_skrining
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_skrining.id_pasien = tbl_pasien.id
      WHERE tbl_pasien.nama_lengkap
      ILIKE '%${search}%' ORDER BY tbl_skrining.${sortBy} ${sortOrder} 
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

const countAllSkrining = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_skrining`);
};

const getSkriningById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_skrining.id, tbl_skrining.id_pasien, 
            tbl_pasien.nama_lengkap AS nama_lengkap, tbl_pasien.jenis_kelamin AS jenis_kelamin, tbl_pasien.nomor_kitas AS nomor_kitas, tbl_pasien.nomor_hp AS nomor_hp,
        to_char( tbl_skrining.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_skrining.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_skrining AS tbl_skrining
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_skrining.id_pasien = tbl_pasien.id
        WHERE tbl_skrining.id = '${id}'`,
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

const findSkriningById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_skrining WHERE id = '${id}'
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

const editSkrining = (data) => {
  const { id, id_pasien } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_skrining 
          SET
            id_pasien='${id_pasien}', 
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
  insertSkrining,
  allSkrining,
  countAllSkrining,
  findSkriningById,
  getSkriningById,
  editSkrining,
};
