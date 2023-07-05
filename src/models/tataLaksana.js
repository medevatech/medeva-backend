const Pool = require('../config/db');

const getPemeriksaanPenunjang = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_pemeriksaan_penunjang.id, 
        tbl_pemeriksaan_penunjang.id_pemeriksaan, tbl_pemeriksaan.nama AS nama_pemeriksaan,
        tbl_pemeriksaan_penunjang.id_lab, tbl_laboratorium.nama AS nama_laboratorium,
        tbl_pemeriksaan_penunjang.id_kunjungan, tbl_kunjungan.keluhan AS keluhan,
        tbl_pemeriksaan_penunjang.id_pasien, tbl_pasien.nama_lengkap,
        tbl_pemeriksaan_penunjang.status, tbl_pemeriksaan_penunjang.is_active, 
        tbl_pemeriksaan_penunjang.created_at, tbl_pemeriksaan_penunjang.updated_at
    FROM tbl_pemeriksaan_penunjang AS tbl_pemeriksaan_penunjang
    INNER JOIN tbl_pemeriksaan AS tbl_pemeriksaan ON tbl_pemeriksaan_penunjang.id_pemeriksaan = tbl_pemeriksaan.id
    INNER JOIN tbl_laboratorium AS tbl_laboratorium ON tbl_pemeriksaan_penunjang.id_lab = tbl_laboratorium.id
    INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_pemeriksaan_penunjang.id_kunjungan = tbl_kunjungan.id
    INNER JOIN tbl_pasien AS tbl_pasien ON tbl_pemeriksaan_penunjang.id_pasien = tbl_pasien.id
    WHERE tbl_pemeriksaan_penunjang.id_pasien = '${id_pasien}'`,
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

const getResep = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_resep.id, 
        tbl_resep.id_kunjungan,tbl_kunjungan.keluhan AS keluhan,
        tbl_resep.id_obat, tbl_obat.nama AS nama_obat,
        tbl_resep.id_pasien, tbl_pasien.nama_lengkap,
          tbl_resep.jumlah, tbl_resep.satuan, tbl_resep.frekuensi, tbl_resep.periode, tbl_resep.metode_konsumsi,
          tbl_resep.aturan_pakai, tbl_resep.status, tbl_resep.is_active, 
          tbl_resep.created_at, tbl_resep.updated_at
        FROM tbl_resep AS tbl_resep
        INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_resep.id_kunjungan = tbl_kunjungan.id
        INNER JOIN tbl_obat AS tbl_obat ON tbl_resep.id_obat = tbl_obat.id
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_resep.id_pasien = tbl_pasien.id
        WHERE tbl_resep.id_pasien = '${id_pasien}'`,
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

const getLayanan = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_layanan.id, 
          tbl_layanan.id_kunjungan,tbl_kunjungan.keluhan AS keluhan,
          tbl_layanan.id_daftar_layanan, tbl_daftar_layanan.nama AS nama_daftar_layanan,
          tbl_layanan.id_pasien, tbl_pasien.nama_lengkap,
          tbl_layanan.catatan, tbl_layanan.status, tbl_layanan.is_active, 
          tbl_layanan.created_at, tbl_layanan.updated_at
      FROM tbl_layanan AS tbl_layanan
      INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_layanan.id_kunjungan = tbl_kunjungan.id
      INNER JOIN tbl_daftar_layanan AS tbl_daftar_layanan ON tbl_layanan.id_daftar_layanan = tbl_daftar_layanan.id
      INNER JOIN tbl_pasien AS tbl_pasien ON tbl_layanan.id_pasien = tbl_pasien.id
      WHERE tbl_layanan.id_pasien = '${id_pasien}'`,
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

const getRujukan = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rujukan.id, 
        tbl_rujukan.id_kunjungan,tbl_kunjungan.keluhan AS keluhan,
        tbl_rujukan.id_rs, tbl_rs.nama AS nama_rs,
        tbl_rujukan.id_poli, tbl_poli.nama AS nama_poli,
        tbl_rujukan.id_pasien, tbl_pasien.nama_lengkap,
        tbl_rujukan.anamnesis, tbl_rujukan.terapi, tbl_rujukan.catatan, 
        tbl_rujukan.status, tbl_rujukan.is_active, 
        tbl_rujukan.created_at, tbl_rujukan.updated_at
    FROM tbl_rujukan AS tbl_rujukan
    INNER JOIN tbl_kunjungan AS tbl_kunjungan ON tbl_rujukan.id_kunjungan = tbl_kunjungan.id
    INNER JOIN tbl_rs AS tbl_rs ON tbl_rujukan.id_rs = tbl_rs.id
    INNER JOIN tbl_poli AS tbl_poli ON tbl_rujukan.id_poli = tbl_poli.id
    INNER JOIN tbl_pasien AS tbl_pasien ON tbl_rujukan.id_pasien = tbl_pasien.id
    WHERE tbl_rujukan.id_pasien = '${id_pasien}'`,
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

const findTataLaksanaByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_pasien
      FROM (
          SELECT id_pasien FROM tbl_pemeriksaan_penunjang WHERE id_pasien = '${id_pasien}'
          UNION
          SELECT id_pasien FROM tbl_resep WHERE id_pasien = '${id_pasien}'
          UNION
          SELECT id_pasien FROM tbl_layanan WHERE id_pasien = '${id_pasien}'
          UNION
          SELECT id_pasien FROM tbl_rujukan WHERE id_pasien = '${id_pasien}'
      ) AS subquery`,
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

const updateStatusPemeriksaanPenunjangByIdPasien = (data) => {
  const { id_pasien, status } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_pemeriksaan_penunjang 
      SET
        status='${status}'
      WHERE
        id_pasien = '${id_pasien}'`,
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

const updateStatusResepByIdPasien = (data) => {
  const { id_pasien, status } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_resep 
        SET
          status='${status}'
        WHERE
          id_pasien = '${id_pasien}'`,
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

const updateStatusLayananByIdPasien = (data) => {
  const { id_pasien, status } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_layanan 
          SET
            status='${status}'
          WHERE
            id_pasien = '${id_pasien}'`,
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

const updateStatusRujukanByIdPasien = (data) => {
  const { id_pasien, status } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rujukan 
          SET
            status='${status}'
          WHERE
            id_pasien = '${id_pasien}'`,
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
  getPemeriksaanPenunjang,
  getResep,
  getLayanan,
  getRujukan,
  findTataLaksanaByIdPasien,
  updateStatusPemeriksaanPenunjangByIdPasien,
  updateStatusResepByIdPasien,
  updateStatusLayananByIdPasien,
  updateStatusRujukanByIdPasien,
};
