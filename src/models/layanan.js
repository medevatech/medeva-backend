const pool = require("../config/db");

const findLayanan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM tbl_layanan WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const countLayanan = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_layanan`);
};

const createLayanan = (data) => {
  const { id, id_kunjungan, id_daftar_layanan } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_layanan (id, id_kunjungan, id_daftar_layanan, created_at, updated_at) VALUES('${id}', '${id_kunjungan}', '${id_daftar_layanan}', NOW(), NOW())`,
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

const getLayanan = ({ searchId, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT layanan.id, layanan.id_kunjungan, layanan.id_daftar_layanan, dl.nama_layanan, dl.harga_layanan
        FROM tbl_layanan as layanan 
        INNER JOIN tbl_kunjungan as kunjungan
        ON layanan.id_kunjungan = kunjungan.id INNER JOIN tbl_daftar_layanan as dl ON layanan.id_daftar_layanan = dl.id
        WHERE layanan.id ILIKE ('%${searchId}%') ORDER BY dl.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
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

const getLayananById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT layanan.id, layanan.id_kunjungan, layanan.id_daftar_layanan, dl.nama_layanan, dl.harga_layanan
      FROM tbl_layanan as layanan 
      INNER JOIN tbl_kunjungan as kunjungan
      ON layanan.id_kunjungan = kunjungan.id INNER JOIN tbl_daftar_layanan as dl ON layanan.id_daftar_kunjungan = dl.id
      WHERE layanan.id = '${id}'`,
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

// const updateLayanan = (data) => {
//   const { id, id_klinik, nama_layanan, harga_layanan } = data;
//   return new Promise((resolve, reject) => {
//     pool.query(
//       `UPDATE tbl_layanan
//                 SET id_klinik = '${id_klinik}', nama_layanan = '${nama_layanan}', harga_layanan = '${harga_layanan}'
//                 WHERE id = '${id}'`,
//       (err, res) => {
//         if (!err) {
//           resolve(res);
//         } else {
//           reject(err);
//         }
//       }
//     );
//   });
// };

const deleteLayanan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_layanan
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
  createLayanan,
  findLayanan,
  countLayanan,
  getLayanan,
  getLayananById,
  //   updateLayanan,
  deleteLayanan,
};
