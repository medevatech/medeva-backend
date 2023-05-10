const Pool = require('../config/db');

const insertDiagnosisRujukan = (data) => {
  const { id, id_rujukan, id_penyakit, tipe_wd, tipe_dd } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_diagnosis_rujukan 
        (id, id_rujukan, id_penyakit, tipe_wd, tipe_dd,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_rujukan}', '${id_penyakit}', '${tipe_wd}', '${tipe_dd}',
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

const allDiagnosisRujukan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis_rujukan.id, 
          tbl_diagnosis_rujukan.id_rujukan, tbl_diagnosis_rujukan.id_penyakit, 
        tbl_diagnosis_rujukan.tipe_wd, tbl_diagnosis_rujukan.tipe_dd, 
        tbl_diagnosis_rujukan.created_at, tbl_diagnosis_rujukan.updated_at
      FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
      WHERE tbl_diagnosis_rujukan.id_penyakit
      ILIKE '%${search}%' ORDER BY tbl_diagnosis_rujukan.${sortBy} ${sortOrder} 
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

const countAllDiagnosisRujukan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_diagnosis_rujukan`);
};

const getDiagnosisRujukanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_diagnosis_rujukan.id, 
          tbl_diagnosis_rujukan.id_rujukan, tbl_diagnosis_rujukan.id_penyakit, 
        tbl_diagnosis_rujukan.tipe_wd, tbl_diagnosis_rujukan.tipe_dd, 
        tbl_diagnosis_rujukan.created_at, tbl_diagnosis_rujukan.updated_at
      FROM tbl_diagnosis_rujukan AS tbl_diagnosis_rujukan
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

const findDiagnosisRujukanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_diagnosis_rujukan WHERE id = '${id}'
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

const editDiagnosisRujukan = (data) => {
  const { id, id_rujukan, id_penyakit, tipe_wd, tipe_dd } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_diagnosis_rujukan 
          SET
            id_rujukan='${id_rujukan}', id_penyakit='${id_penyakit}', tipe_wd='${tipe_wd}', tipe_dd='${tipe_dd}',
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
  insertDiagnosisRujukan,
  allDiagnosisRujukan,
  countAllDiagnosisRujukan,
  findDiagnosisRujukanById,
  getDiagnosisRujukanById,
  editDiagnosisRujukan,
};
