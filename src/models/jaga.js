const pool = require("../config/db");

const createJaga = (data) => {
  const { id, id_klinik, id_divisi, id_shift, id_karyawan } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_jaga (id, id_klinik, id_divisi, id_shift, id_karyawan) VALUES('${id}', '${id_klinik}', '${id_divisi}', '${id_shift}', '${id_karyawan}' )`,
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
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_jaga.id, tbl_jaga.id_klinik, tbl_jaga.id_divisi, tbl_jaga.id_shift, tbl_jaga.id_karyawan, tbl_jaga.is_active, tbl_klinik.nama_klinik, tbl_divisi.tipe, tbl_shift.hari, tbl_karyawan.nama as nama_karyawan FROM tbl_jaga as tbl_jaga INNER JOIN tbl_klinik AS tbl_klinik ON tbl_jaga.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi AS tbl_divisi ON tbl_jaga.id_divisi = tbl_divisi.id INNER JOIN tbl_shift AS tbl_shift ON tbl_jaga.id_shift = tbl_shift.id INNER JOIN tbl_karyawan AS tbl_karyawan ON tbl_jaga.id_karyawan = tbl_karyawan.id
          WHERE tbl_karyawan.nama ILIKE '%${searchName}%' AND tbljaga._divisi ILIKE '%${searchDivisi}%' AND tbl_jaga.is_active ILIKE '%${searchStatus}%' ORDER BY tbl_jaga.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getJagaById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_jaga.id, tbl_jaga.id_klinik, tbl_jaga.id_divisi, tbl_jaga.id_shift, tbl_jaga.id_karyawan, tbl_jaga.is_active, tbl_klinik.nama_klinik, tbl_divisi.tipe, tbl_shift.hari, tbl_karyawan.nama as nama_karyawan FROM tbl_jaga as tbl_jaga INNER JOIN tbl_klinik AS tbl_klinik ON tbl_jaga.id_klinik = tbl_klinik.id INNER JOIN tbl_divisi AS tbl_divisi ON tbl_jaga.id_divisi = tbl_divisi.id INNER JOIN tbl_shift AS tbl_shift ON tbl_jaga.id_shift = tbl_shift.id INNER JOIN tbl_karyawan AS tbl_karyawan ON tbl_jaga.id_karyawan = tbl_karyawan.id
        WHERE tbl_jaga.id = '${id}'`,
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
  const { id, id_klinik, id_divisi, id_shift, id_karyawan } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_jaga
                  SET id_klinik = '${id_klinik}', id_divisi = '${id_divisi}', id_shift = '${id_shift}', id_karyawan = '${id_karyawan}'
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
  updateJaga,
  archiveJaga,
  activateJaga,
  deleteJaga,
};
