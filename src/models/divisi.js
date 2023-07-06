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

const countDivisi = ({ searchName, searchKlinik, searchStatus }) => {
  return pool.query(
    `SELECT COUNT(*) AS total
      FROM tbl_divisi
      INNER JOIN tbl_klinik ON tbl_divisi.id_klinik = tbl_klinik.id
      WHERE CAST(tbl_divisi.is_active AS TEXT) ILIKE '%${searchStatus}%'
      AND tbl_klinik.id ILIKE '%${searchKlinik}%'
      AND tbl_divisi.tipe ILIKE '%${searchName}%'`
  );
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
  searchDivisi,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT divisi.id, divisi.id_klinik, divisi.tipe, klinik.nama_klinik as nama_klinik, divisi.is_active
        FROM tbl_divisi as divisi 
        INNER JOIN tbl_klinik as klinik ON divisi.id_klinik = klinik.id
        WHERE divisi.tipe ILIKE ('%${searchName}%') AND divisi.is_active ILIKE '%${searchStatus}%' AND divisi.id_klinik ILIKE '%${searchKlinik}%' AND divisi.id ILIKE '%${searchDivisi}%' ORDER BY divisi.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getDistictDivision = ({
  searchName,
  searchStatus,
  searchKlinik,
  searchDivisi,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT DISTINCT ON(divisi.id, divisi.tipe) divisi.id, divisi.tipe, divisi.id_klinik, klinik.nama_klinik
      FROM tbl_divisi as divisi
      INNER JOIN tbl_klinik as klinik ON divisi.id_klinik = klinik.id
      WHERE divisi.tipe ILIKE ('%${searchName}%') AND divisi.is_active ILIKE '%${searchStatus}%' AND divisi.id_klinik ILIKE '%${searchKlinik}%' AND divisi.id ILIKE '%${searchDivisi}%' ORDER BY divisi.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
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

const getDivisiByIdClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT divisi.id, divisi.id_klinik, divisi.tipe, divisi.is_active, klinik.nama_klinik as nama_klinik
      FROM tbl_divisi as divisi 
      INNER JOIN tbl_klinik as klinik 
      ON divisi.id_klinik = klinik.id
      WHERE divisi.id_klinik = '${id}'`,
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
  getDistictDivision,
  getDivisiById,
  getDivisiByIdClinic,
  updateDivisi,
  archiveDivisi,
  activateDivisi,
  deleteDivisi,
};
