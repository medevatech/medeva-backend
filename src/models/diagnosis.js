const Pool = require('../config/db');

const insertDiagnosis = (data) => {
  const { id, id_kunjungan, id_penyakit, tipe_wd, tipe_dd } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_diagnosis 
        (id, id_kunjungan, id_penyakit, tipe_wd, tipe_dd,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_penyakit}', '${tipe_wd}', '${tipe_dd}', 
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

const allDiagnosis = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis.id, tbl_diagnosis.id_kunjungan, 
        tbl_diagnosis.id_penyakit,
            tbl_penyakit.nama_penyakit AS nama_penyakit,
        tbl_diagnosis.tipe_wd, tbl_diagnosis.tipe_dd, 
        tbl_diagnosis.created_at, tbl_diagnosis.updated_at
      FROM tbl_diagnosis AS tbl_diagnosis
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis.id_penyakit = tbl_penyakit.id
      WHERE tbl_penyakit.nama_penyakit
      ILIKE '%${search}%' ORDER BY tbl_diagnosis.${sortBy} ${sortOrder} 
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

const countAllDiagnosis = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_diagnosis`);
};

const getDiagnosisById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis.id, tbl_diagnosis.id_kunjungan, 
        tbl_diagnosis.id_penyakit,
            tbl_penyakit.nama_penyakit AS nama_penyakit,
            tbl_diagnosis.tipe_wd, tbl_diagnosis.tipe_dd, 
        tbl_diagnosis.created_at, tbl_diagnosis.updated_at
      FROM tbl_diagnosis AS tbl_diagnosis
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis.id_penyakit = tbl_penyakit.id
      WHERE tbl_diagnosis.id = '${id}'`,
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

const findDiagnosisById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_diagnosis WHERE id = '${id}'
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

const editDiagnosis = (data) => {
  const { id, id_kunjungan, id_penyakit, tipe_wd, tipe_dd } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_diagnosis 
          SET
            id_kunjungan='${id_kunjungan}', id_penyakit='${id_penyakit}', tipe_wd='${tipe_wd}', tipe_dd='${tipe_dd}',
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

const getDiagnosisByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis.id, tbl_diagnosis.id_kunjungan, 
        tbl_diagnosis.id_penyakit,
            tbl_penyakit.nama_penyakit AS nama_penyakit,
            tbl_diagnosis.tipe_wd, tbl_diagnosis.tipe_dd, 
        tbl_diagnosis.created_at, tbl_diagnosis.updated_at
      FROM tbl_diagnosis AS tbl_diagnosis
      INNER JOIN tbl_penyakit AS tbl_penyakit ON tbl_diagnosis.id_penyakit = tbl_penyakit.id
      WHERE tbl_diagnosis.id_kunjungan = '${id_kunjungan}'`,
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

const findDiagnosisByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_diagnosis WHERE id_kunjungan = '${id_kunjungan}'
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
  insertDiagnosis,
  allDiagnosis,
  countAllDiagnosis,
  findDiagnosisById,
  getDiagnosisById,
  editDiagnosis,
  getDiagnosisByIdKunjungan,
  findDiagnosisByIdKunjungan,
};
