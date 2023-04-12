const Pool = require('../config/db');

const insertKunjungan = (data) => {
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_kunjungan 
        (id, id_jaga, id_pasien, id_vs, waktu_mulai, waktu_selesai, tipe, anamnesis, 
            pemeriksaan_fisik, prognosa, kasus_kll, status_pulang,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_jaga}', '${id_pasien}', '${id_vs}', '${waktu_mulai}', '${waktu_selesai}', '${tipe}', '${anamnesis}', 
            '${pemeriksaan_fisik}', '${prognosa}', '${kasus_kll}', '${status_pulang}',
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

const allKunjungan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kunjungan.id, tbl_kunjungan.id_jaga,
            tbl_kunjungan.id_pasien, 
                tbl_pasien.nama_lengkap AS nama_lengkap, 
            id_vs, tbl_kunjungan.waktu_mulai, tbl_kunjungan.waktu_selesai, 
            tbl_kunjungan.tipe, tbl_kunjungan.anamnesis, tbl_kunjungan.pemeriksaan_fisik, 
            tbl_kunjungan.prognosa, tbl_kunjungan.kasus_kll, tbl_kunjungan.status_pulang, 
          to_char( tbl_kunjungan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
          to_char( tbl_kunjungan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
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
      `SELECT tbl_kunjungan.id, tbl_kunjungan.id_jaga, 
          tbl_kunjungan.id_pasien, 
              tbl_pasien.nama_lengkap AS nama_lengkap, 
          id_vs, tbl_kunjungan.waktu_mulai, tbl_kunjungan.waktu_selesai, 
          tbl_kunjungan.tipe, tbl_kunjungan.anamnesis, tbl_kunjungan.pemeriksaan_fisik, 
          tbl_kunjungan.prognosa, tbl_kunjungan.kasus_kll, tbl_kunjungan.status_pulang, 
        to_char( tbl_kunjungan.created_at, 'DD Month YYYY - HH24:MI' ) AS created_at,
        to_char( tbl_kunjungan.updated_at, 'DD Month YYYY - HH24:MI' ) AS updated_at
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kunjungan 
          SET
            id_jaga='${id_jaga}', id_pasien='${id_pasien}', id_vs='${id_vs}', waktu_mulai='${waktu_mulai}', waktu_selesai='${waktu_selesai}', 
            tipe='${tipe}', anamnesis='${anamnesis}', pemeriksaan_fisik='${pemeriksaan_fisik}', prognosa='${prognosa}', kasus_kll='${kasus_kll}', status_pulang='${status_pulang}', 
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
  findKunjunganById,
  getKunjunganById,
  editKunjungan,
};
