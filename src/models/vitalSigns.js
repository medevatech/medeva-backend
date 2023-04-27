const Pool = require('../config/db');

const insertVital = (data) => {
  const {
    id,
    id_pasien,
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_vital_signs 
        (id, id_pasien, kesadaran, temperatur, tinggi_badan,
            berat_badan, lingkar_perut, imt, sistole, diastole,
            respiratory_rate, heart_rate, catatan_tambahan, 
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_pasien}', '${kesadaran}', '${temperatur}', '${tinggi_badan}',
            '${berat_badan}', '${lingkar_perut}', '${imt}', '${sistole}', '${diastole}', 
            '${respiratory_rate}', '${heart_rate}', '${catatan_tambahan}',
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

const allVital = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, tbl_vital_signs.id_pasien, 
          tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan,
        to_char( tbl_vital_signs.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_vital_signs.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE tbl_pasien.nama_lengkap
      ILIKE '%${search}%' ORDER BY tbl_vital_signs.${sortBy} ${sortOrder} 
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

const countAllVital = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_vital_signs`);
};

const getVitalById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, tbl_vital_signs.id_pasien, 
          tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan,
        to_char( tbl_vital_signs.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_vital_signs.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE tbl_vital_signs.id = '${id}'`,
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

const findVitalById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_vital_signs WHERE id = '${id}'
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

const getVitalByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vital_signs.id, tbl_vital_signs.id_pasien, 
          tbl_pasien.nama_lengkap AS nama_lengkap,
        tbl_vital_signs.kesadaran, tbl_vital_signs.temperatur, tbl_vital_signs.tinggi_badan, tbl_vital_signs.berat_badan, 
        tbl_vital_signs.lingkar_perut, tbl_vital_signs.imt, tbl_vital_signs.sistole, tbl_vital_signs.diastole, 
        tbl_vital_signs.respiratory_rate, tbl_vital_signs.heart_rate, tbl_vital_signs.catatan_tambahan,
        to_char( tbl_vital_signs.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_vital_signs.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
      FROM tbl_vital_signs AS tbl_vital_signs
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_vital_signs.id_pasien = tbl_pasien.id
      WHERE tbl_vital_signs.id_pasien = '${id_pasien}'`,
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
      `SELECT * FROM tbl_vital_signs WHERE id_pasien = '${id_pasien}'
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

const editVital = (data) => {
  const {
    id,
    id_pasien,
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vital_signs 
          SET
            id_pasien='${id_pasien}', kesadaran='${kesadaran}', temperatur='${temperatur}', tinggi_badan='${tinggi_badan}', 
            berat_badan='${berat_badan}', lingkar_perut='${lingkar_perut}', imt='${imt}', sistole='${sistole}', 
            diastole='${diastole}', respiratory_rate='${respiratory_rate}', heart_rate='${heart_rate}', catatan_tambahan='${catatan_tambahan}', 
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
  insertVital,
  allVital,
  countAllVital,
  findVitalById,
  getVitalById,
  findVitalByIdPasien,
  getVitalByIdPasien,
  editVital,
};
