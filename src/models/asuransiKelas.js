const Pool = require('../config/db');

const insertAsuransiKelas = (data) => {
  const { id, id_asuransi, nama_kelas, sistem } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_asuransi_kelas 
        (id,  id_asuransi, nama_kelas,  sistem,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_asuransi}', '${nama_kelas}', '${sistem}', 
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

const allAsuransiKelas = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi_kelas.id, 
        tbl_asuransi_kelas.id_asuransi, tbl_asuransi.nama AS nama_asuransi,
        tbl_asuransi_kelas.nama_kelas, tbl_asuransi_kelas.sistem, 
        tbl_asuransi_kelas.created_at, tbl_asuransi_kelas.updated_at
      FROM tbl_asuransi_kelas AS tbl_asuransi_kelas
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_asuransi_kelas.id_asuransi = tbl_asuransi.id
      WHERE
        tbl_asuransi_kelas.nama_kelas ILIKE '%${search}%' 
      ORDER BY tbl_asuransi_kelas.${sortBy} ${sortOrder} 
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

const countAllAsuransiKelas = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_asuransi_kelas`);
};

const getAsuransiKelasById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi_kelas.id, 
        tbl_asuransi_kelas.id_asuransi, tbl_asuransi.nama AS nama_asuransi,
        tbl_asuransi_kelas.nama_kelas, tbl_asuransi_kelas.sistem, 
        tbl_asuransi_kelas.created_at, tbl_asuransi_kelas.updated_at
      FROM tbl_asuransi_kelas AS tbl_asuransi_kelas
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_asuransi_kelas.id_asuransi = tbl_asuransi.id
      WHERE tbl_asuransi_kelas.id = '${id}'`,
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

const findAsuransiKelasById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_asuransi_kelas WHERE id = '${id}'
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

const editAsuransiKelas = (data) => {
  const { id, id_asuransi, nama_kelas, sistem } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_asuransi_kelas 
          SET
            id_asuransi='${id_asuransi}',  nama_kelas='${nama_kelas}',  sistem='${sistem}', 
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

const getAsuransiKelasByIdAsuransi = ({ id_asuransi }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_asuransi_kelas.id, 
        tbl_asuransi_kelas.id_asuransi, tbl_asuransi.nama AS nama_asuransi,
        tbl_asuransi_kelas.nama_kelas, tbl_asuransi_kelas.sistem, 
        tbl_asuransi_kelas.created_at, tbl_asuransi_kelas.updated_at
      FROM tbl_asuransi_kelas AS tbl_asuransi_kelas
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_asuransi_kelas.id_asuransi = tbl_asuransi.id
      WHERE tbl_asuransi_kelas.id_asuransi = '${id_asuransi}'`,
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

const findAsuransiKelasByIdAsuransi = (id_asuransi) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_asuransi_kelas WHERE id_asuransi = '${id_asuransi}'
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
  insertAsuransiKelas,
  allAsuransiKelas,
  countAllAsuransiKelas,
  getAsuransiKelasById,
  findAsuransiKelasById,
  editAsuransiKelas,
  getAsuransiKelasByIdAsuransi,
  findAsuransiKelasByIdAsuransi,
};
