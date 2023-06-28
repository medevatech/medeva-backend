const Pool = require('../config/db.js');

const totalKlaimFFS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(tbl_klaim.besar_klaim)::int
      FROM tbl_klaim AS tbl_klaim`,
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

const totalKlaimPPS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(tbl_pendapatan_pps.jumlah_peserta * tbl_kerjasama.besar_klaim)::int 
      FROM tbl_pendapatan_pps as tbl_pendapatan_pps
        LEFT JOIN 
          tbl_kerjasama AS tbl_kerjasama ON tbl_pendapatan_pps.id_asuransi = tbl_kerjasama.id_asuransi 
        AND 
          tbl_pendapatan_pps.id_asuransi_kelas = tbl_kerjasama.id_asuransi_kelas`,
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

const totalPendapatanFFS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(tbl_klaim.besar_klaim)::int
      FROM tbl_klaim AS tbl_klaim
      WHERE
        tbl_klaim.status_klaim = 'DITERIMA'`,
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

const totalPendapatanPPS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(tbl_pendapatan_pps.pendapatan)::int
      FROM tbl_pendapatan_pps AS tbl_pendapatan_pps`,
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

const klaimBerhasilA = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT COUNT(tbl_klaim.besar_klaim)::int
      FROM tbl_klaim AS tbl_klaim
      WHERE
        tbl_klaim.status_klaim = 'DITERIMA'`,
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

const klaimBerhasilB = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT COUNT(tbl_klaim.besar_klaim)::int
      FROM tbl_klaim AS tbl_klaim
      WHERE
        tbl_klaim.status_klaim = 'DITERIMA'
      OR
        tbl_klaim.status_klaim = 'DITOLAK'
      OR
        tbl_klaim.status_klaim = 'DISPUTED'`,
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

const countAllTableAS02 = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
          COUNT(*) AS total
      FROM (
          SELECT 
              tbl_klaim.id_asuransi AS id_asuransi,
              COALESCE(tbl_klaim_produk.nama_kelas, tbl_pendapatan_produk.nama_kelas) AS produk,
              tbl_klaim.id_asuransi_kelas AS id_asuransi_kelas,
              COALESCE(tbl_klaim_asuransi.nama, tbl_pendapatan_asuransi.nama) AS asuransi,
              SUM(tbl_klaim.besar_klaim)::int AS total_klaim,
              SUM(CASE WHEN tbl_klaim.status_klaim = 'DITERIMA' THEN tbl_klaim.besar_klaim ELSE 0 END)::int AS total_klaim_diterima,
              COALESCE(tbl_pendapatan_pps.pendapatan, 0) AS pendapatan
          FROM tbl_klaim
          LEFT JOIN tbl_asuransi_kelas AS tbl_klaim_produk ON tbl_klaim.id_asuransi_kelas = tbl_klaim_produk.id
          LEFT JOIN tbl_asuransi AS tbl_klaim_asuransi ON tbl_klaim.id_asuransi = tbl_klaim_asuransi.id
          LEFT JOIN tbl_kerjasama ON tbl_klaim.id_asuransi = tbl_kerjasama.id_asuransi AND tbl_klaim.id_asuransi_kelas = tbl_kerjasama.id_asuransi_kelas
          LEFT JOIN tbl_pendapatan_pps ON tbl_klaim.id_asuransi_kelas = tbl_pendapatan_pps.id_asuransi_kelas AND tbl_klaim.id_asuransi = tbl_pendapatan_pps.id_asuransi
          LEFT JOIN tbl_asuransi_kelas AS tbl_pendapatan_produk ON tbl_pendapatan_pps.id_asuransi_kelas = tbl_pendapatan_produk.id
          LEFT JOIN tbl_asuransi AS tbl_pendapatan_asuransi ON tbl_pendapatan_pps.id_asuransi = tbl_pendapatan_asuransi.id
          WHERE (tbl_kerjasama.tipe = 'FFSP' OR tbl_kerjasama.tipe = 'FFSNP')
              OR (tbl_kerjasama.tipe = 'PPST' OR tbl_kerjasama.tipe = 'PPSK')
          GROUP BY tbl_klaim.id_asuransi, tbl_klaim.id_asuransi_kelas, COALESCE(tbl_klaim_produk.nama_kelas, tbl_pendapatan_produk.nama_kelas), COALESCE(tbl_klaim_asuransi.nama, tbl_pendapatan_asuransi.nama), tbl_pendapatan_pps.pendapatan
          ORDER BY pendapatan
      ) AS subquery;`,
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

const tableAS02 = ({ limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_klaim.id_asuransi AS id_asuransi,
        COALESCE(tbl_klaim_produk.nama_kelas, tbl_pendapatan_produk.nama_kelas) AS produk,
        tbl_klaim.id_asuransi_kelas AS id_asuransi_kelas,
        tbl_kerjasama.tipe AS tipe,
        COALESCE(tbl_klaim_asuransi.nama, tbl_pendapatan_asuransi.nama) AS asuransi,
        SUM(tbl_klaim.besar_klaim)::int AS total_klaim,
        SUM(CASE WHEN tbl_klaim.status_klaim = 'DITERIMA' THEN tbl_klaim.besar_klaim ELSE 0 END)::int AS total_klaim_diterima,
        COALESCE(tbl_pendapatan_pps.pendapatan, 0) AS pendapatan
      FROM tbl_klaim
      LEFT JOIN tbl_asuransi_kelas AS tbl_klaim_produk ON tbl_klaim.id_asuransi_kelas = tbl_klaim_produk.id
      LEFT JOIN tbl_asuransi AS tbl_klaim_asuransi ON tbl_klaim.id_asuransi = tbl_klaim_asuransi.id
      LEFT JOIN tbl_kerjasama ON tbl_klaim.id_asuransi = tbl_kerjasama.id_asuransi AND tbl_klaim.id_asuransi_kelas = tbl_kerjasama.id_asuransi_kelas
      LEFT JOIN tbl_pendapatan_pps ON tbl_klaim.id_asuransi_kelas = tbl_pendapatan_pps.id_asuransi_kelas AND tbl_klaim.id_asuransi = tbl_pendapatan_pps.id_asuransi
      LEFT JOIN tbl_asuransi_kelas AS tbl_pendapatan_produk ON tbl_pendapatan_pps.id_asuransi_kelas = tbl_pendapatan_produk.id
      LEFT JOIN tbl_asuransi AS tbl_pendapatan_asuransi ON tbl_pendapatan_pps.id_asuransi = tbl_pendapatan_asuransi.id
      WHERE (tbl_kerjasama.tipe = 'FFSP' OR tbl_kerjasama.tipe = 'FFSNP')
          OR (tbl_kerjasama.tipe = 'PPST' OR tbl_kerjasama.tipe = 'PPSK')
      GROUP BY COALESCE(tbl_klaim_produk.nama_kelas, tbl_pendapatan_produk.nama_kelas), COALESCE(tbl_klaim_asuransi.nama, tbl_pendapatan_asuransi.nama), COALESCE(tbl_klaim_asuransi.nama, tbl_pendapatan_asuransi.nama), tbl_pendapatan_pps.pendapatan, tbl_klaim.id_asuransi, tbl_klaim.id_asuransi_kelas, tbl_kerjasama.tipe
      ORDER BY pendapatan
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

const totalPendapatanByIdAsuransiAndAsuransiKelas = ({
  id_asuransi,
  id_asuransi_kelas,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(tbl_pendapatan_pps.pendapatan)::int
      FROM tbl_pendapatan_pps AS tbl_pendapatan_pps
      WHERE
        tbl_pendapatan_pps.id_asuransi = '${id_asuransi}'
      AND
        tbl_pendapatan_pps.id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const kunjunganSales = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_penyakit.nama_penyakit, AVG(tbl_klaim.besar_klaim), SUM(tbl_klaim.besar_klaim)
      FROM tbl_kunjungan_sales 
      LEFT JOIN tbl_klaim ON tbl_kunjungan_sales.id_sales = tbl_klaim.id_sales
      LEFT JOIN tbl_diagnosis ON tbl_kunjungan_sales.id_kunjungan = tbl_diagnosis.id_kunjungan
      LEFT JOIN tbl_penyakit ON tbl_diagnosis.id_penyakit = tbl_penyakit.id
      GROUP BY tbl_penyakit.id;`,
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

const totalKunjunganByIdAsuransiKelas = ({ id_asuransi_kelas }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT COUNT(tbl_kunjungan.id)::int
      FROM tbl_kunjungan AS tbl_kunjungan
      LEFT JOIN tbl_antrian AS tbl_antrian ON tbl_kunjungan.id_jaga = tbl_antrian.id_jaga AND tbl_kunjungan.id_pasien = tbl_kunjungan.id_pasien
      LEFT JOIN tbl_peserta AS tbl_peserta ON tbl_kunjungan.id_peserta = tbl_peserta.id
      WHERE
        tbl_peserta.id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const totalTipeKunjunganByIdAsuransiKelas = ({ id_asuransi_kelas }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT COUNT(tbl_kunjungan.id)::int
      FROM tbl_kunjungan AS tbl_kunjungan
      LEFT JOIN tbl_antrian AS tbl_antrian ON tbl_kunjungan.id_jaga = tbl_antrian.id_jaga AND tbl_kunjungan.id_pasien = tbl_kunjungan.id_pasien
      LEFT JOIN tbl_peserta AS tbl_peserta ON tbl_kunjungan.id_peserta = tbl_peserta.id
      WHERE
        tbl_peserta.id_asuransi_kelas = '${id_asuransi_kelas}'
      GROUP BY tbl_kunjungan.tipe`,
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
  totalKlaimFFS,
  totalKlaimPPS,
  totalPendapatanFFS,
  totalPendapatanPPS,
  klaimBerhasilA,
  klaimBerhasilB,
  countAllTableAS02,
  tableAS02,
  totalPendapatanByIdAsuransiAndAsuransiKelas,
  kunjunganSales,
  totalKunjunganByIdAsuransiKelas,
  totalTipeKunjunganByIdAsuransiKelas,
};
