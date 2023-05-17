const Pool = require('../config/db');

const insertDaftarTindakan = (data) => {
  const { id, id_tindakan, nama, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_daftar_tindakan 
        (id, id_tindakan, nama, is_active,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_tindakan}', '${nama}', '${is_active}', 
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

const allDaftarTindakan = ({
  search,
  searchKlinik,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.id_tindakan, tbl_daftar_tindakan.nama, 
          tbl_harga_tindakan.id_klinik,
        tbl_daftar_tindakan.is_active, 
        tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
      FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      INNER JOIN tbl_harga_tindakan as tbl_harga_tindakan ON tbl_daftar_tindakan.id = tbl_harga_tindakan.id_daftar_tindakan
      WHERE
        tbl_daftar_tindakan.nama ILIKE '%${search}%' 
      AND
        tbl_harga_tindakan.id_klinik ILIKE '%${searchKlinik}%'
      ORDER BY tbl_daftar_tindakan.${sortBy} ${sortOrder} 
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

const countAllDaftarTindakan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_daftar_tindakan`);
};

const getDaftarTindakanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_daftar_tindakan.id, tbl_daftar_tindakan.id_tindakan, tbl_daftar_tindakan.nama, 
          tbl_harga_tindakan.id_klinik,
        tbl_daftar_tindakan.is_active, 
        tbl_daftar_tindakan.created_at, tbl_daftar_tindakan.updated_at
      FROM tbl_daftar_tindakan AS tbl_daftar_tindakan
      INNER JOIN tbl_harga_tindakan as tbl_harga_tindakan ON tbl_daftar_tindakan.id = tbl_harga_tindakan.id_daftar_tindakan
      WHERE tbl_daftar_tindakan.id = '${id}'`,
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

const findDaftarTindakanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_daftar_tindakan WHERE id = '${id}'
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

const editDaftarTindakan = (data) => {
  const { id, id_tindakan, nama } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
          SET
            id_tindakan='${id_tindakan}', nama='${nama}', 
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

const editDaftarTindakanActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
          SET
            is_active='${is_active}', 
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

const editDaftarTindakanArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_daftar_tindakan 
          SET
            is_active='${is_active}', 
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

module.exports = {
  insertDaftarTindakan,
  allDaftarTindakan,
  countAllDaftarTindakan,
  findDaftarTindakanById,
  getDaftarTindakanById,
  editDaftarTindakan,
  editDaftarTindakanActivate,
  editDaftarTindakanArchive,
};
