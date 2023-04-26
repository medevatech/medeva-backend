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

const createDivisi = (data) => {
  const { id, id_klinik, tipe } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_divisi (id, id_klinik, tipe) VALUES('${id}', '${id_klinik}', '${tipe}')`,
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

const getDivisi = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT tbl_divisi.id, tbl_divisi.id_klinik, tbl_divisi.tipe, tbl_klinik.nama_klinik as nama_klinik
        FROM tbl_divisi as tbl_divisi 
        INNER JOIN tbl_klinik as tbl_klinik 
        ON tbl_divisi.id_klinik = tbl_klinik.id
        WHERE tbl_divisi.tipe ILIKE ('%${search}%') ORDER BY tbl_divisi.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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
      `SELECT tbl_divisi.id, tbl_divisi.id_klinik, tbl_divisi.tipe, tbl_klinik.nama_klinik as nama_klinik
      FROM tbl_divisi as tbl_divisi 
      INNER JOIN tbl_klinik as tbl_klinik 
      ON tbl_divisi.id_klinik = tbl_klinik.id
      WHERE tbl_divisi.id = '${id}'`,
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
  getDivisi,
  getDivisiById,
  updateDivisi,
  deleteDivisi,
};
