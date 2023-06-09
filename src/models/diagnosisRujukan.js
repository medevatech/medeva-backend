const Pool = require('../config/db');

const insertDiagnosisRujukan = (data) => {
  const { id, id_rujukan, id_penyakit, tipe_wd, tipe_dd, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_diagnosis_rujukan 
        (id, id_rujukan, id_penyakit, tipe_wd, tipe_dd, is_active,
          created_at, updated_at) 
      VALUES
        ('${id}', '${id_rujukan}', '${id_penyakit}', ${tipe_wd}, ${tipe_dd}, ${is_active},
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

const allDiagnosisRujukan = ({
  search,
  searchPenyakit,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis_rujukan.id, tbl_diagnosis_rujukan.id_rujukan, 
        tbl_diagnosis_rujukan.id_penyakit, tbl_penyakit.nama_penyakit AS nama_penyakit,
        tbl_diagnosis_rujukan.tipe_wd, tbl_diagnosis_rujukan.tipe_dd, tbl_diagnosis_rujukan.is_active, 
        tbl_diagnosis_rujukan.created_at, tbl_diagnosis_rujukan.updated_at
      FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis_rujukan.id_penyakit = tbl_penyakit.id
      WHERE 
        tbl_diagnosis_rujukan.id ILIKE '%${search}%'
      AND
        tbl_penyakit.nama_penyakit ILIKE '%${searchPenyakit}%'
      AND
        CAST(tbl_diagnosis_rujukan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_diagnosis_rujukan.${sortBy} ${sortOrder} 
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

const countAllDiagnosisRujukan = (search, searchPenyakit, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
  INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis_rujukan.id_penyakit = tbl_penyakit.id
  WHERE 
    tbl_diagnosis_rujukan.id ILIKE '%${search}%'
  AND
    tbl_penyakit.nama_penyakit ILIKE '%${searchPenyakit}%'
  AND
    CAST(tbl_diagnosis_rujukan.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getDiagnosisRujukanByIdDiagnosisRujukan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis_rujukan.id, tbl_diagnosis_rujukan.id_rujukan, 
        tbl_diagnosis_rujukan.id_penyakit, tbl_penyakit.nama_penyakit AS nama_penyakit,
        tbl_diagnosis_rujukan.tipe_wd, tbl_diagnosis_rujukan.tipe_dd, tbl_diagnosis_rujukan.is_active, 
        tbl_diagnosis_rujukan.created_at, tbl_diagnosis_rujukan.updated_at
      FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis_rujukan.id_penyakit = tbl_penyakit.id
      WHERE tbl_diagnosis_rujukan.id = '${id}'`,
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

const findDiagnosisRujukanByIdDiagnosisRujukan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_diagnosis_rujukan WHERE id = '${id}'`,
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

const editDiagnosisRujukan = (data) => {
  const { id, id_rujukan, id_penyakit, tipe_wd, tipe_dd, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_diagnosis_rujukan 
      SET
        id_rujukan='${id_rujukan}', id_penyakit='${id_penyakit}', tipe_wd=${tipe_wd}, tipe_dd=${tipe_dd}, is_active=${is_active},
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

const getDiagnosisRujukanByIdRujukan = ({ id_rujukan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis_rujukan.id, tbl_diagnosis_rujukan.id_rujukan, 
        tbl_diagnosis_rujukan.id_penyakit, tbl_penyakit.nama_penyakit AS nama_penyakit,
        tbl_diagnosis_rujukan.tipe_wd, tbl_diagnosis_rujukan.tipe_dd, tbl_diagnosis_rujukan.is_active, 
        tbl_diagnosis_rujukan.created_at, tbl_diagnosis_rujukan.updated_at
      FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis_rujukan.id_penyakit = tbl_penyakit.id
      WHERE tbl_diagnosis_rujukan.id_rujukan = '${id_rujukan}'`,
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

const findDiagnosisRujukanByIdRujukan = (id_rujukan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_diagnosis_rujukan WHERE id_rujukan = '${id_rujukan}'`,
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

const editDiagnosisRujukanActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_diagnosis_rujukan 
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

const deleteDiagnosisRujukan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_diagnosis_rujukan WHERE id='${id}'`,
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
  insertDiagnosisRujukan,
  allDiagnosisRujukan,
  countAllDiagnosisRujukan,
  getDiagnosisRujukanByIdDiagnosisRujukan,
  findDiagnosisRujukanByIdDiagnosisRujukan,
  editDiagnosisRujukan,
  getDiagnosisRujukanByIdRujukan,
  findDiagnosisRujukanByIdRujukan,
  editDiagnosisRujukanActiveArchive,
  deleteDiagnosisRujukan,
};
