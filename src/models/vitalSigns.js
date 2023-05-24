const Pool = require('../config/db');

const insertVital = (data) => {
  const {
    id,
    id_pasien,
    keluhan,
    kesadaran,
    temperatur,
    tinggi_badan,
    berat_badan,
    lingkar_perut,
    imt,
    sistole,
    diastole,
    respiratory_rate,
    heart_rate,
    catatan_tambahan,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_vital_signs 
        (id, id_pasien, keluhan, kesadaran, temperatur, tinggi_badan,
        berat_badan, lingkar_perut, imt, sistole, diastole,
        respiratory_rate, heart_rate, catatan_tambahan, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_pasien}', '${keluhan}', '${kesadaran}', ${temperatur}, ${tinggi_badan},
        ${berat_badan}, ${lingkar_perut}, ${imt}, ${sistole}, ${diastole}, 
        ${respiratory_rate}, ${heart_rate}, '${catatan_tambahan}', ${is_active},
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

const allVital = ({
  search,
  searchPasien,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, 
        tbl_vital_signs.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.keluhan, tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan, tbl_vital_signs.is_active,
        tbl_vital_signs.created_at, tbl_vital_signs.updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE
        tbl_vital_signs.keluhan ILIKE '%${search}%' 
      AND 
        tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
      AND 
        CAST(tbl_vital_signs.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_vital_signs.${sortBy} ${sortOrder} 
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

const countAllVital = (search, searchPasien, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_vital_signs AS tbl_vital_signs
  INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
  WHERE
    tbl_vital_signs.keluhan ILIKE '%${search}%' 
  AND 
    tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%'
  AND 
    CAST(tbl_vital_signs.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getVitalByIdVitalSigns = ({ id, tanggal }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, 
        tbl_vital_signs.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.keluhan, tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan, tbl_vital_signs.is_active,
        tbl_vital_signs.created_at, tbl_vital_signs.updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE
        tbl_vital_signs.id = '${id}'`,
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

const findVitalByIdVitalSigns = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_vital_signs WHERE id = '${id}'`,
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

const getVitalByIdPasien = ({ id_pasien, tanggal }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, 
        tbl_vital_signs.id_pasien, tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.keluhan, tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan, tbl_vital_signs.is_active,
        tbl_vital_signs.created_at, tbl_vital_signs.updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE
        tbl_vital_signs.id_pasien = '${id_pasien}'
      AND
        CAST(tbl_vital_signs.created_at AS TEXT) ILIKE '%${tanggal}%'`,
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

const findVitalByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_vital_signs WHERE id_pasien = '${id_pasien}'`,
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

const editVital = (data) => {
  const {
    id,
    id_pasien,
    keluhan,
    kesadaran,
    temperatur,
    tinggi_badan,
    berat_badan,
    lingkar_perut,
    imt,
    sistole,
    diastole,
    respiratory_rate,
    heart_rate,
    catatan_tambahan,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vital_signs 
      SET
        id_pasien='${id_pasien}', keluhan='${keluhan}', kesadaran='${kesadaran}', temperatur=${temperatur}, tinggi_badan=${tinggi_badan}, 
        berat_badan=${berat_badan}, lingkar_perut=${lingkar_perut}, imt=${imt}, sistole=${sistole}, 
        diastole=${diastole}, respiratory_rate=${respiratory_rate}, heart_rate=${heart_rate}, catatan_tambahan='${catatan_tambahan}', is_active=${is_active},
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

const editVitalSignsActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vital_signs 
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

const deleteVitalSigns = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_vital_signs WHERE id='${id}'`,
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
  insertVital,
  allVital,
  countAllVital,
  getVitalByIdVitalSigns,
  findVitalByIdVitalSigns,
  getVitalByIdPasien,
  findVitalByIdPasien,
  editVital,
  editVitalSignsActiveArchive,
  deleteVitalSigns,
};
