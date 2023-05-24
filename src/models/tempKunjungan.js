const Pool = require('../config/db');

const insertTempKunjungan = (data) => {
  const { id, id_kunjungan, id_vs, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_temp_kunjungan 
        (id, id_kunjungan, id_vs, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_kunjungan}', '${id_vs}', ${is_active},
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

const allTempKunjungan = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_temp_kunjungan.id, 
        tbl_temp_kunjungan.id_kunjungan, tbl_kunjungan.anamnesis,
        tbl_temp_kunjungan.id_vs, tbl_vital_signs.kesadaran AS kesadaran,
        tbl_temp_kunjungan.is_active,
        tbl_temp_kunjungan.created_at to_char, tbl_temp_kunjungan.updated_at
      FROM tbl_temp_kunjungan AS tbl_temp_kunjungan
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_temp_kunjungan.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_temp_kunjungan.id_vs = tbl_vital_signs.id
      WHERE 
        tbl_kunjungan.anamnesis ILIKE '%${search}%' 
      AND
        CAST (tbl_temp_kunjungan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_temp_kunjungan.${sortBy} ${sortOrder} 
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

const countAllTempKunjungan = (search, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_temp_kunjungan AS tbl_temp_kunjungan
  INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_temp_kunjungan.id_kunjungan = tbl_kunjungan.id
  INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_temp_kunjungan.id_vs = tbl_vital_signs.id
  WHERE 
    tbl_kunjungan.anamnesis ILIKE '%${search}%' 
  AND
    CAST (tbl_temp_kunjungan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getTempKunjunganByIdTempKunjungan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_temp_kunjungan.id, 
        tbl_temp_kunjungan.id_kunjungan, tbl_kunjungan.anamnesis,
        tbl_temp_kunjungan.id_vs, tbl_vital_signs.kesadaran AS kesadaran,
        tbl_temp_kunjungan.is_active,
        tbl_temp_kunjungan.created_at to_char, tbl_temp_kunjungan.updated_at
      FROM tbl_temp_kunjungan AS tbl_temp_kunjungan
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_temp_kunjungan.id_kunjungan = tbl_kunjungan.id
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

const findTempKunjunganByIdTempKunjungan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_temp_kunjungan WHERE id = '${id}'`,
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
  const { id, id_kunjungan, id_vs, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_temp_kunjungan 
      SET
        id_kunjungan='${id_kunjungan}', id_vs='${id_vs}', is_active=${is_active},
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

const editTempKunjunganActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_temp_kunjungan 
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

const deleteTempKunjungan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_temp_kunjungan WHERE id='${id}'`,
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
  getTempKunjunganByIdTempKunjungan,
  findTempKunjunganByIdTempKunjungan,
  editTempKunjungan,
  editTempKunjunganActiveArchive,
  deleteTempKunjungan,
};
