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
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rekam_medis 
        (id, id_kunjungan, id_vital_signs, id_anamnesis, pemeriksaan_fisik, 
        id_diagnosis, id_tata_laksana, is_active,
        created_at, updated_at) 
      VALUES
      ('${id}', '${id_kunjungan}', '${id_vital_signs}', '${id_anamnesis}', '${pemeriksaan_fisik}', 
        '${id_diagnosis}', '${id_tata_laksana}', ${is_active},
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

const allRekamMedis = ({
  search,
  searchKunjungan,
  searchVS,
  searchAnamnesis,
  searchDiagnosis,
  searchTataLaksana,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rekam_medis.id, 
        tbl_rekam_medis.id_kunjungan, tbl_kunjungan.tipe,
        tbl_rekam_medis.id_vital_signs, tbl_vital_signs.kesadaran,
        tbl_rekam_medis.id_anamnesis, 
        tbl_rekam_medis.id_diagnosis, tbl_diagnosis.tipe_wd,
        tbl_rekam_medis.id_tata_laksana, 
        tbl_rekam_medis.pemeriksaan_fisik, 
        tbl_rekam_medis.created_at, tbl_rekam_medis.updated_at
      FROM tbl_rekam_medis AS tbl_rekam_medis
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_rekam_medis.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_rekam_medis.id_vital_signs = tbl_vital_signs.id
      INNER JOIN tbl_diagnosis AS tbl_diagnosis ON tbl_rekam_medis.id_diagnosis = tbl_diagnosis.id
      WHERE
        tbl_rekam_medis.pemeriksaan_fisik ILIKE '%${search}%' 
      AND 
        tbl_kunjungan.tipe ILIKE '%${searchKunjungan}%' 
      AND
        tbl_vital_signs.kesadaran ILIKE '%${searchVS}%' 
      AND
        tbl_diagnosis.tipe_wd ILIKE '%${searchDiagnosis}%'
      ORDER BY tbl_rekam_medis.${sortBy} ${sortOrder} 
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

const countAllRekamMedis = (
  search,
  searchKunjungan,
  searchVS,
  searchAnamnesis,
  searchDiagnosis,
  searchTataLaksana,
  searchStatus
) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_rekam_medis AS tbl_rekam_medis
  INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_rekam_medis.id_kunjungan = tbl_kunjungan.id
  INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_rekam_medis.id_vital_signs = tbl_vital_signs.id
  INNER JOIN tbl_diagnosis AS tbl_diagnosis ON tbl_rekam_medis.id_diagnosis = tbl_diagnosis.id
  WHERE
    tbl_rekam_medis.pemeriksaan_fisik ILIKE '%${search}%' 
  AND 
    tbl_kunjungan.tipe ILIKE '%${searchKunjungan}%' 
  AND
    tbl_vital_signs.kesadaran ILIKE '%${searchVS}%' 
  AND
    tbl_diagnosis.tipe_wd ILIKE '%${searchDiagnosis}%'`);
};

const getRekamMedisByIdRekamMedis = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rekam_medis.id, 
        tbl_rekam_medis.id_kunjungan, tbl_kunjungan.tipe,
        tbl_rekam_medis.id_vital_signs, tbl_vital_signs.kesadaran,
        tbl_rekam_medis.id_anamnesis, 
        tbl_rekam_medis.id_diagnosis, tbl_diagnosis.tipe_wd,
        tbl_rekam_medis.id_tata_laksana, 
        tbl_rekam_medis.pemeriksaan_fisik, 
        tbl_rekam_medis.created_at, tbl_rekam_medis.updated_at
      FROM tbl_rekam_medis AS tbl_rekam_medis
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_rekam_medis.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_vital_signs AS tbl_vital_signs ON tbl_rekam_medis.id_vital_signs = tbl_vital_signs.id
      INNER JOIN tbl_diagnosis AS tbl_diagnosis ON tbl_rekam_medis.id_diagnosis = tbl_diagnosis.id
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

const findRekamMedisByIdRekamMedis = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rekam_medis WHERE id = '${id}'`,
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
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rekam_medis 
      SET
        id_kunjungan='${id_kunjungan}', id_vital_signs='${id_vital_signs}', id_anamnesis='${id_anamnesis}', pemeriksaan_fisik='${pemeriksaan_fisik}', 
        id_diagnosis='${id_diagnosis}', id_tata_laksana='${id_tata_laksana}', is_active=${is_active}, 
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

const editRekamMedisActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rekam_medis 
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

const deleteRekamMedis = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_rekam_medis WHERE id='${id}'`,
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
  getRekamMedisByIdRekamMedis,
  findRekamMedisByIdRekamMedis,
  editRekamMedis,
  editRekamMedisActiveArchive,
  deleteRekamMedis,
};
