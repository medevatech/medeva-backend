const Pool = require('../config/db');

const insertTempKunjungan = (data) => {
  const { id, id_kunjungan, id_vs } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_temp_kunjungan 
        (id, id_kunjungan, id_vs,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_vs}', 
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

const allTempKunjungan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_temp_kunjungan.id, tbl_temp_kunjungan.id_kunjungan, 
            tbl_temp_kunjungan.id_vs,
                tbl_vital_signs.kesadaran AS kesadaran,
            to_char( tbl_temp_kunjungan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_temp_kunjungan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_temp_kunjungan AS tbl_temp_kunjungan
        INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_temp_kunjungan.id_vs = tbl_vital_signs.id
        WHERE tbl_vital_signs.kesadaran
        ILIKE '%${search}%' ORDER BY tbl_temp_kunjungan.${sortBy} ${sortOrder} 
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

const countAllTempKunjungan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_temp_kunjungan`);
};

const getTempKunjunganById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_temp_kunjungan.id, tbl_temp_kunjungan.id_kunjungan, 
        tbl_temp_kunjungan.id_vs,
            tbl_vital_signs.kesadaran AS kesadaran,
        to_char( tbl_temp_kunjungan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_temp_kunjungan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_temp_kunjungan AS tbl_temp_kunjungan
      INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_temp_kunjungan.id_vs = tbl_vital_signs.id
      WHERE tbl_temp_kunjungan.id = '${id}'`,
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

const findTempKunjunganById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_temp_kunjungan WHERE id = '${id}'
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

const editTempKunjungan = (data) => {
  const { id, id_kunjungan, id_vs } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_temp_kunjungan 
          SET
            id_kunjungan='${id_kunjungan}', id_vs='${id_vs}', 
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
  insertTempKunjungan,
  allTempKunjungan,
  countAllTempKunjungan,
  findTempKunjunganById,
  getTempKunjunganById,
  editTempKunjungan,
};
