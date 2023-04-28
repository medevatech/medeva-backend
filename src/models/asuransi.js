const Pool = require('../config/db');

const insertAsuransi = (data) => {
  const { id, id_pasien, tipe_asuransi, nomor_asuransi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_asuransi 
        (id, id_pasien, tipe_asuransi, nomor_asuransi, created_at, updated_at) 
        VALUES
        ('${id}', '${id_pasien}', '${tipe_asuransi}', '${nomor_asuransi}', NOW(), NOW())`,
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

const allAsuransi = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, 
        tbl_asuransi.id_pasien, 
            tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_asuransi.tipe_asuransi, tbl_asuransi.nomor_asuransi,
        to_char( tbl_asuransi.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_asuransi.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_asuransi AS tbl_asuransi
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_asuransi.id_pasien = tbl_pasien.id
      WHERE tbl_pasien.nama_lengkap
      ILIKE '%${search}%' ORDER BY tbl_asuransi.${sortBy} ${sortOrder} 
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

const countAllAsuransi = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_asuransi`);
};

const getAsuransiById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, 
        tbl_asuransi.id_pasien, 
            tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_asuransi.tipe_asuransi, tbl_asuransi.nomor_asuransi,
        to_char( tbl_asuransi.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_asuransi.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_asuransi AS tbl_asuransi
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_asuransi.id_pasien = tbl_pasien.id
      WHERE tbl_asuransi.id = '${id}'`,
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

const findAsuransiById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_asuransi WHERE id = '${id}'
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

const getAsuransiByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi.id, 
        tbl_asuransi.id_pasien, 
            tbl_pasien.nama_lengkap AS nama_lengkap, 
        tbl_asuransi.tipe_asuransi, tbl_asuransi.nomor_asuransi,
        to_char( tbl_asuransi.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_asuransi.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_asuransi AS tbl_asuransi
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_asuransi.id_pasien = tbl_pasien.id
      WHERE tbl_asuransi.id_pasien = '${id_pasien}'`,
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

const findAsuransiByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_asuransi WHERE id_pasien = '${id_pasien}'
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

const editAsuransi = (data) => {
  const { id, id_pasien, tipe_asuransi, nomor_asuransi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_asuransi 
          SET
          id='${id}', id_pasien='${id_pasien}', tipe_asuransi='${tipe_asuransi}', nomor_asuransi='${nomor_asuransi}', 
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
  insertAsuransi,
  allAsuransi,
  countAllAsuransi,
  getAsuransiById,
  findAsuransiById,
  getAsuransiByIdPasien,
  findAsuransiByIdPasien,
  editAsuransi,
};
