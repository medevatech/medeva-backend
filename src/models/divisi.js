const pool = require("../config/db");

const findDivisi = (tipe) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_divisi WHERE tipe = '${tipe}'`,
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

const countDivisi = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_divisi`);
};

const createDivisi = (data) => {
  const { id, id_klinik, tipe } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_divisi (id, id_klinik, tipe, is_active, created_at, updated_at) VALUES('${id}', '${id_klinik}', '${tipe}', '1', NOW(), NOW())`,
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

const getDivisi = ({
  searchName,
  searchStatus,
  searchKlinik,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT divisi.id, divisi.id_klinik, divisi.id_jaga, jaga.id_karyawan, jaga.id_shift, divisi.tipe as nama_divisi, klinik.nama_klinik as nama_klinik, kry.nama as nama_karyawan, shift.waktu_mulai, shift.waktu_selesai, divisi.is_active
        FROM tbl_divisi as divisi 
        INNER JOIN tbl_klinik as klinik
        ON divisi.id_klinik = klinik.id
        INNER JOIN tbl_jaga as jaga ON divisi.id_jaga = jaga.id
        INNER JOIN tbl_karyawan as kry ON jaga.id_karyawan = kry.id
        INNER JOIN tbl_shift as shift ON jaga.id_shift = shift.id
        WHERE divisi.tipe ILIKE ('%${searchName}%') AND divisi.is_active ILIKE '%${searchStatus}%' AND divisi.id_klinik ILIKE '%${searchKlinik}%' ORDER BY divisi.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
      `,
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

const getDivisiById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT divisi.id, divisi.id_klinik, divisi.tipe, divisi.is_active, klinik.nama_klinik as nama_klinik
      FROM tbl_divisi as divisi 
      INNER JOIN tbl_klinik as klinik 
      ON divisi.id_klinik = klinik.id
      WHERE divisi.id = '${id}'`,
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

const updateDivisi = (data) => {
  const { id, id_klinik, tipe } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_divisi
                SET id_klinik = '${id_klinik}', tipe = '${tipe}'
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

const archiveDivisi = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_divisi SET is_active = 0 WHERE id = '${id}'`,
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

const activateDivisi = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_divisi SET is_active = 1 WHERE id = '${id}'`,
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

const deleteDivisi = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_divisi
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
  createDivisi,
  findDivisi,
  countDivisi,
  getDivisi,
  getDivisiById,
  updateDivisi,
  archiveDivisi,
  activateDivisi,
  deleteDivisi,
};
