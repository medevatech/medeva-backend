const Pool = require('../config/db');

const insertKunjungan = (data) => {
  const {
    id,
    id_jaga,
    id_vs,
    id_pasien,
    tipe,
    anamnesis,
    pemeriksaan_fisik,
    prognosa,
    kasus_kll,
    status_pulang,
    keluhan,
  } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO tbl_kunjungan 
      (id, id_jaga, id_vs, id_pasien,  tipe, anamnesis, 
          pemeriksaan_fisik, prognosa, kasus_kll, status_pulang, keluhan,
          created_at, updated_at) 
      VALUES
      ('${id}', '${id_jaga}', '${id_vs}', '${id_pasien}',  '${tipe}', '${anamnesis}', 
          '${pemeriksaan_fisik}', '${prognosa}', '${kasus_kll}', '${status_pulang}', '${keluhan}',
          NOW(), NOW())`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const allKunjungan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan.id, tbl_kunjungan.id_jaga, id_vs,
          tbl_kunjungan.id_pasien, 
            tbl_pasien.nama_lengkap AS nama_lengkap, 
            tbl_kunjungan.waktu_mulai,
            tbl_kunjungan.waktu_selesai,
          tbl_kunjungan.tipe, tbl_kunjungan.anamnesis, tbl_kunjungan.pemeriksaan_fisik, 
          tbl_kunjungan.prognosa, tbl_kunjungan.kasus_kll, tbl_kunjungan.status_pulang, tbl_kunjungan.keluhan, 
          tbl_kunjungan.created_at,
          tbl_kunjungan.updated_at
        FROM tbl_kunjungan AS tbl_kunjungan
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_kunjungan.id_pasien = tbl_pasien.id
        WHERE tbl_pasien.nama_lengkap
        ILIKE '%${search}%' ORDER BY tbl_kunjungan.${sortBy} ${sortOrder} 
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

const countAllKunjungan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_kunjungan`);
};

const getKunjunganById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan.id, tbl_kunjungan.id_jaga, id_vs, 
        tbl_kunjungan.id_pasien, 
          tbl_pasien.nama_lengkap AS nama_lengkap, 
          tbl_kunjungan.waktu_mulai,
          tbl_kunjungan.waktu_selesai,
        tbl_kunjungan.tipe, tbl_kunjungan.anamnesis, tbl_kunjungan.pemeriksaan_fisik, 
        tbl_kunjungan.prognosa, tbl_kunjungan.kasus_kll, tbl_kunjungan.status_pulang,  tbl_kunjungan.keluhan, 
        tbl_kunjungan.created_at,
          tbl_kunjungan.updated_at
      FROM tbl_kunjungan AS tbl_kunjungan
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_kunjungan.id_pasien = tbl_pasien.id
      WHERE tbl_kunjungan.id = '${id}'`,
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

const findKunjunganById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kunjungan WHERE id = '${id}'
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

const getKunjunganByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan.id, tbl_kunjungan.id_jaga, id_vs, 
        tbl_kunjungan.id_pasien, 
          tbl_pasien.nama_lengkap AS nama_lengkap, 
          tbl_kunjungan.waktu_mulai,
          tbl_kunjungan.waktu_selesai,
        tbl_kunjungan.tipe, tbl_kunjungan.anamnesis, tbl_kunjungan.pemeriksaan_fisik, 
        tbl_kunjungan.prognosa, tbl_kunjungan.kasus_kll, tbl_kunjungan.status_pulang,  tbl_kunjungan.keluhan, 
        tbl_kunjungan.created_at,
          tbl_kunjungan.updated_at
      FROM tbl_kunjungan AS tbl_kunjungan
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_kunjungan.id_pasien = tbl_pasien.id
      WHERE tbl_kunjungan.id_pasien = '${id_pasien}' ORDER BY created_at DESC`,
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

const findKunjunganByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kunjungan WHERE id_pasien = '${id_pasien}'
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

const countAllKunjunganPasien = (id_pasien) => {
  return Pool.query(
    `SELECT COUNT(*) AS total FROM tbl_kunjungan WHERE id_pasien = '${id_pasien}'`
  );
};

const editKunjungan = (data) => {
  const {
    id,
    id_jaga,
    id_pasien,
    id_vs,
    waktu_mulai,
    waktu_selesai,
    tipe,
    anamnesis,
    pemeriksaan_fisik,
    prognosa,
    kasus_kll,
    status_pulang,
    keluhan,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kunjungan 
          SET
            id_jaga='${id_jaga}', id_pasien='${id_pasien}', id_vs='${id_vs}', waktu_mulai='${waktu_mulai}', waktu_selesai='${waktu_selesai}', 
            tipe='${tipe}', anamnesis='${anamnesis}', pemeriksaan_fisik='${pemeriksaan_fisik}', prognosa='${prognosa}', kasus_kll='${kasus_kll}', 
            status_pulang='${status_pulang}', keluhan='${keluhan}', 
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
  insertKunjungan,
  allKunjungan,
  countAllKunjungan,
  getKunjunganById,
  findKunjunganById,
  getKunjunganByIdPasien,
  findKunjunganByIdPasien,
  countAllKunjunganPasien,
  editKunjungan,
};
