const Pool = require('../config/db');

const insertRekamMedis = (data) => {
  const {
    id,
    id_kunjungan,
    id_vital_signs,
    id_anamnesis,
    pemeriksaan_fisik,
    id_diagnosis,
    id_tata_laksana,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rekam_medis 
        (id, id_kunjungan, id_vital_signs, id_anamnesis, pemeriksaan_fisik, 
            id_diagnosis, id_tata_laksana,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_vital_signs}', '${id_anamnesis}', '${pemeriksaan_fisik}', 
            '${id_diagnosis}', '${id_tata_laksana}',
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

const allRekamMedis = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rekam_medis.id, tbl_rekam_medis.id_kunjungan, 
            to_char( tbl_rekam_medis.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
            to_char( tbl_rekam_medis.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
        FROM tbl_rekam_medis AS tbl_rekam_medis
        WHERE tbl_rekam_medis.pemeriksaan_fisik
        ILIKE '%${search}%' ORDER BY tbl_rekam_medis.${sortBy} ${sortOrder} 
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

const countAllRekamMedis = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_rekam_medis`);
};

const getRekamMedisById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rekam_medis.id, tbl_rekam_medis.id_kunjungan, 
        to_char( tbl_rekam_medis.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_rekam_medis.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_rekam_medis AS tbl_rekam_medis
      WHERE tbl_rekam_medis.id = '${id}'`,
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

const findRekamMedisById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rekam_medis WHERE id = '${id}'
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

const editRekamMedis = (data) => {
  const {
    id,
    id_kunjungan,
    id_vital_signs,
    id_anamnesis,
    pemeriksaan_fisik,
    id_diagnosis,
    id_tata_laksana,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rekam_medis 
          SET
            id_kunjungan='${id_kunjungan}', id_vital_signs='${id_vital_signs}', id_anamnesis='${id_anamnesis}', pemeriksaan_fisik='${pemeriksaan_fisik}', 
            id_diagnosis='${id_diagnosis}', id_tata_laksana='${id_tata_laksana}', 
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
  insertRekamMedis,
  allRekamMedis,
  countAllRekamMedis,
  findRekamMedisById,
  getRekamMedisById,
  editRekamMedis,
};
