const pool = require("../config/db");

const createJaga = (data) => {
  const {
    id,
    id_klinik,
    id_divisi,
    id_karyawan,
    hari,
    tanggal,
    waktu_mulai,
    waktu_selesai,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jaga (id, id_klinik, id_divisi, id_karyawan, hari, tanggal, waktu_mulai, waktu_selesai, is_active, created_at, updated_at) VALUES('${id}', '${id_klinik}', '${id_divisi}', '${id_karyawan}', '${hari}', '${tanggal}', '${waktu_mulai}', '${waktu_selesai}', '1', NOW(), NOW() )`,
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

const countJaga = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_jaga`);
};

const getJaga = ({
  searchName,
  searchStatus,
  searchDivisi,
  searchDivisiName,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jaga.id, jaga.id_klinik, jaga.id_divisi, jaga.id_karyawan, jaga.hari, jaga.tanggal, jaga.waktu_mulai, jaga.waktu_selesai, jaga.is_active, jaga.created_at, jaga.updated_at, divisi.tipe, kry.nama as nama_karyawan, klinik.nama_klinik
        FROM tbl_jaga AS jaga
        INNER JOIN tbl_klinik AS klinik ON jaga.id_klinik = klinik.id
        INNER JOIN tbl_divisi AS divisi ON jaga.id_divisi = divisi.id
        INNER JOIN tbl_karyawan AS kry ON jaga.id_karyawan = kry.id
        WHERE kry.nama ILIKE '%${searchName}%'
        AND jaga.id_divisi ILIKE '%${searchDivisi}%'
        AND jaga.is_active ILIKE '%${searchStatus}%'
        AND divisi.tipe ILIKE '%${searchDivisiName}%'
        ORDER BY jaga.${sortBy} ${sortOrder}
        LIMIT ${limit}
        OFFSET ${offset}`,
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

const getJagaById = ({ id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_jaga.id, tbl_jaga.id_klinik, tbl_jaga.id_divisi, tbl_jaga.id_shift, tbl_jaga.id_karyawan, tbl_jaga.is_active, tbl_klinik.nama_klinik, tbl_divisi.tipe, tbl_shift.hari, tbl_karyawan.nama as nama_karyawan FROM tbl_jaga as tbl_jaga INNER JOIN tbl_klinik AS tbl_klinik ON tbl_jaga.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi AS tbl_divisi ON tbl_jaga.id_divisi = tbl_divisi.id INNER JOIN tbl_shift AS tbl_shift ON tbl_jaga.id_shift = tbl_shift.id INNER JOIN tbl_karyawan AS tbl_karyawan ON tbl_jaga.id_karyawan = tbl_karyawan.id
        WHERE tbl_jaga.id_divisi = '${id}'`,
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

const getJagaByIdDivisi = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT jaga.id, jaga.id_klinik, jaga.id_divisi, jaga.id_karyawan, jaga.hari, jaga.tanggal, jaga.waktu_mulai, jaga.waktu_selesai, jaga.is_active, jaga.created_at, jaga.updated_at, divisi.tipe as nama_divisi, kry.nama as nama_karyawan, klinik.nama_klinik as nama_klinik
      FROM tbl_jaga AS jaga
      INNER JOIN tbl_klinik AS klinik ON jaga.id_klinik = klinik.id
      INNER JOIN tbl_divisi AS divisi ON jaga.id_divisi = divisi.id
      INNER JOIN tbl_karyawan AS kry ON jaga.id_karyawan = kry.id
      WHERE jaga.id_divisi = '${id}'
      AND jaga.is_active ILIKE '%${searchDivisi}%'`,
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

const updateJaga = (data) => {
  const { id, id_karyawan, hari, tanggal, waktu_mulai, waktu_selesai } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jaga
                  SET id_karyawan = '${id_karyawan}', hari = '${hari}', tanggal = '${tanggal}', waktu_mulai = '${waktu_mulai}', waktu_selesai = '${waktu_selesai}', updated_at = NOW()
                  WHERE id = '${id}'`,
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

const archiveJaga = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jaga SET is_active = 0 WHERE id = '${id}'`,
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

const activateJaga = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jaga SET is_active = 1 WHERE id = '${id}'`,
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

const deleteJaga = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_jaga
                  WHERE id = '${id}'`,
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

module.exports = {
  createJaga,
  countJaga,
  getJaga,
  getJagaById,
  getJagaByIdDivisi,
  updateJaga,
  archiveJaga,
  activateJaga,
  deleteJaga,
};
