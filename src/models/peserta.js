const Pool = require('../config/db');

const insertPeserta = (data) => {
  const { id, id_pasien, id_asuransi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_peserta 
        (id, id_pasien, id_asuransi, 
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_pasien}', '${id_asuransi}',
            NOW(), NOW())`,
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

const allPeserta = ({
  search,
  searchPasien,
  searchAsuransi,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_peserta.id, 
        tbl_peserta.id_pasien, tbl_pasien.nama_lengkap AS nama_pasien,
        tbl_peserta.id_asuransi, tbl_asuransi.nama  AS nama_asuransi,
        tbl_peserta.created_at, tbl_peserta.updated_at
      FROM tbl_peserta AS tbl_peserta
      INNER JOIN tbl_pasien as tbl_pasien ON tbl_peserta.id_pasien = tbl_pasien.id
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_peserta.id_asuransi = tbl_asuransi.id
      WHERE 
        tbl_peserta.id ILIKE '%${search}%' 
      AND
        tbl_pasien.nama_lengkap ILIKE '%${searchPasien}%' 
      AND
        tbl_asuransi.nama ILIKE '%${searchAsuransi}%' 
      ORDER BY tbl_peserta.${sortBy} ${sortOrder} 
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

const countAllPeserta = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_peserta`);
};

const getPesertaById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_peserta.id, 
        tbl_peserta.id_pasien, tbl_pasien.nama_lengkap AS nama_pasien,
        tbl_peserta.id_asuransi, tbl_asuransi.nama  AS nama_asuransi,
        tbl_peserta.created_at, tbl_peserta.updated_at
      FROM tbl_peserta AS tbl_peserta
      INNER JOIN tbl_pasien as tbl_pasien ON tbl_peserta.id_pasien = tbl_pasien.id
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_peserta.id_asuransi = tbl_asuransi.id
      WHERE tbl_peserta.id = '${id}'`,
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

const findPesertaById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_peserta WHERE id = '${id}'
        `,
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

const editPeserta = (data) => {
  const { id, id_pasien, id_asuransi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_peserta 
          SET
            id_pasien='${id_pasien}', id_asuransi='${id_asuransi}',
            updated_at=NOW()
          WHERE id='${id}'`,
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

const getPesertaByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_peserta.id, 
        tbl_peserta.id_pasien, tbl_pasien.nama_lengkap AS nama_pasien,
        tbl_peserta.id_asuransi, tbl_asuransi.nama  AS nama_asuransi,
        tbl_peserta.created_at, tbl_peserta.updated_at
      FROM tbl_peserta AS tbl_peserta
      INNER JOIN tbl_pasien as tbl_pasien ON tbl_peserta.id_pasien = tbl_pasien.id
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_peserta.id_asuransi = tbl_asuransi.id
      WHERE tbl_peserta.id_pasien = '${id_pasien}'`,
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

const findPesertaByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_peserta WHERE id_pasien = '${id_pasien}'
        `,
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
  insertPeserta,
  allPeserta,
  countAllPeserta,
  getPesertaById,
  findPesertaById,
  editPeserta,
  getPesertaByIdPasien,
  findPesertaByIdPasien,
};
