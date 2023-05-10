const pool = require("../config/db");

const countLayananLaboratorium = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_layanan_laboratorium`);
};

const createLayananLaboratorium = (data) => {
  const { id, id_laboratorium, id_pemeriksaan, kategori } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_layanan_laboratorium (id, id_laboratorium, id_pemeriksaan, kategori, created_at, updated_at) VALUES('${id}', '${id_laboratorium}', '${id_pemeriksaan}', '${kategori}', NOW(), NOW())`,
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

const getLayananLaboratorium = ({
  searchLaboratorium,
  searchPemeriksaan,
  searchKategori,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ll.id, ll.id_laboratorium, ll.id_pemeriksaan, ll.kategori, pemeriksaan.nama, ll.created_at, ll.updated_at FROM tbl_layanan_laboratorium as ll
      INNER JOIN tbl_laboratorium as lab ON ll.id_laboratorium = lab.id
      INNER JOIN tbl_pemeriksaan as pemeriksaan ON ll.id_pemeriksaan = pemeriksaan.id
      WHERE ll.kategori ILIKE ('%${searchKategori}%') AND ll.id_laboratorium ILIKE ('%${searchLaboratorium}%') AND ll.id_pemeriksaan ILIKE ('%${searchPemeriksaan}%') ORDER BY ll.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getLayananLaboratoriumById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ll.id, ll.id_laboratorium, ll.id_pemeriksaan, ll.kategori, ll.created_at, ll.updated_at FROM tbl_layanan_laboratorium as ll
      INNER JOIN tbl_laboratorium as lab ON ll.id_laboratorium = lab.id
      INNER JOIN tbl_pemeriksaan as pemeriksaan ON ll.id_pemeriksaan = pemeriksaan.id
      WHERE ll.id = '${id}'`,
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

const updateLayananLaboratorium = (data) => {
  const { id, id_laboratorium, id_pemeriksaan, kategori } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_layanan_laboratorium
                SET id_laboratorium = '${id_laboratorium}', id_pemeriksaan = '${id_pemeriksaan}', kategori = '${kategori}'
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

const deleteLayananLaboratorium = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_layanan_laboratorium
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
  createLayananLaboratorium,
  countLayananLaboratorium,
  getLayananLaboratorium,
  getLayananLaboratoriumById,
  updateLayananLaboratorium,
  deleteLayananLaboratorium,
};
