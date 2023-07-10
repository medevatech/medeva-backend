const pool = require("../config/db");

const countLayananLaboratorium = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_layanan_laboratorium`);
};

const countLayananLaboratoriumByIdLab = ({ id }) => {
  return pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_layanan_laboratorium
    INNER JOIN tbl_laboratorium ON tbl_layanan_laboratorium.id_lab = tbl_laboratorium.id
    INNER JOIN tbl_pemeriksaan ON tbl_layanan_laboratorium.id_pemeriksaan = tbl_pemeriksaan.id
    WHERE tbl_layanan_laboratorium.id_lab = '${id}'`
  );
};

const createLayananLaboratorium = (data) => {
  const { id, id_lab, id_pemeriksaan, kategori } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_layanan_laboratorium (id, id_lab, id_pemeriksaan, kategori, created_at, updated_at) VALUES('${id}', '${id_lab}', '${id_pemeriksaan}', '${kategori}', NOW(), NOW())`,
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
      `SELECT ll.id, ll.id_lab, ll.id_pemeriksaan, ll.kategori, lab.nama as nama_laboratorium, pemeriksaan.nama as nama_pemeriksaan, ll.created_at, ll.updated_at FROM tbl_layanan_laboratorium as ll
      INNER JOIN tbl_laboratorium as lab ON ll.id_lab = lab.id
      INNER JOIN tbl_pemeriksaan as pemeriksaan ON ll.id_pemeriksaan = pemeriksaan.id
      WHERE ll.kategori ILIKE ('%${searchKategori}%') AND ll.id_lab ILIKE ('%${searchLaboratorium}%') AND ll.id_pemeriksaan ILIKE ('%${searchPemeriksaan}%') ORDER BY ll.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getDistinctLayananLaboratorium = ({
  searchLaboratorium,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT DISTINCT ON(ll.id_lab, ll.kategori) ll.id, ll.id_lab, ll.id_pemeriksaan, ll.kategori, lab.nama as nama_laboratorium, pemeriksaan.nama as nama_pemeriksaan, ll.created_at, ll.updated_at FROM tbl_layanan_laboratorium as ll
      INNER JOIN tbl_laboratorium as lab ON ll.id_lab = lab.id
      INNER JOIN tbl_pemeriksaan as pemeriksaan ON ll.id_pemeriksaan = pemeriksaan.id
      WHERE ll.id_lab ILIKE '%${searchLaboratorium}%'
      ORDER BY ll.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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
      `SELECT ll.id, ll.id_lab, ll.id_pemeriksaan, ll.kategori, lab.nama as nama_laboratorium, pemeriksaan.nama as nama_pemeriksaan, ll.created_at, ll.updated_at FROM tbl_layanan_laboratorium as ll
      INNER JOIN tbl_laboratorium as lab ON ll.id_lab = lab.id
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

const getLayananLaboratoriumByIdLab = ({
  id,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT ll.id, ll.id_lab, ll.id_pemeriksaan, ll.kategori, lab.nama AS nama_laboratorium, pm.nama AS nama_pemeriksaan, ll.created_at, ll.updated_at
      FROM tbl_layanan_laboratorium AS ll
      INNER JOIN tbl_laboratorium AS lab ON ll.id_lab = lab.id
      INNER JOIN tbl_pemeriksaan AS pm ON ll.id_pemeriksaan = pm.id
      WHERE ll.id_lab = '${id}'
      ORDER BY ll.${sortBy} ${sortOrder}
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

const updateLayananLaboratorium = (data) => {
  const { id, id_lab, id_pemeriksaan, kategori } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_layanan_laboratorium
                SET id_lab = '${id_lab}', id_pemeriksaan = '${id_pemeriksaan}', kategori = '${kategori}'
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

const deleteLayananLaboratoriumByIdLab = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_layanan_laboratorium
      WHERE id_lab = '${id}'`,
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
  countLayananLaboratoriumByIdLab,
  getLayananLaboratorium,
  getDistinctLayananLaboratorium,
  getLayananLaboratoriumById,
  getLayananLaboratoriumByIdLab,
  updateLayananLaboratorium,
  deleteLayananLaboratorium,
  deleteLayananLaboratoriumByIdLab,
};
