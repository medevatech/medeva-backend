const Pool = require('../config/db');

const insertHargaTindakan = (data) => {
  const { id, id_klinik, id_daftar_tindakan, harga, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_harga_tindakan 
        (id, id_klinik, id_daftar_tindakan, harga, is_active,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_klinik}', '${id_daftar_tindakan}', ${harga}, '${is_active}',
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

const allHargaTindakan = ({
  search,
  searchKlinik,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_harga_tindakan.id, 
          tbl_harga_tindakan.id_klinik, tbl_klinik.nama_klinik,
          tbl_harga_tindakan.id_daftar_tindakan, tbl_daftar_tindakan.nama,
        tbl_harga_tindakan.harga, tbl_harga_tindakan.is_active, 
        tbl_harga_tindakan.created_at, tbl_harga_tindakan.updated_at
      FROM tbl_harga_tindakan AS tbl_harga_tindakan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_tindakan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_tindakan as tbl_daftar_tindakan ON tbl_harga_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE 
        tbl_harga_tindakan.id_klinik ILIKE '%${search}%' 
      AND
        tbl_harga_tindakan.id_klinik ILIKE '%${searchKlinik}%' 
      AND
        tbl_harga_tindakan.is_active ILIKE '%${searchStatus}%' 
      
      ORDER BY tbl_harga_tindakan.${sortBy} ${sortOrder} 
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

const countAllHargaTindakan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_harga_tindakan`);
};

const getHargaTindakanById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_harga_tindakan.id, 
          tbl_harga_tindakan.id_klinik, tbl_klinik.nama_klinik,
          tbl_harga_tindakan.id_daftar_tindakan, tbl_daftar_tindakan.nama,
        tbl_harga_tindakan.harga, tbl_harga_tindakan.is_active, 
        tbl_harga_tindakan.created_at, tbl_harga_tindakan.updated_at
      FROM tbl_harga_tindakan AS tbl_harga_tindakan
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_harga_tindakan.id_klinik = tbl_klinik.id
      INNER JOIN tbl_daftar_tindakan as tbl_daftar_tindakan ON tbl_harga_tindakan.id_daftar_tindakan = tbl_daftar_tindakan.id
      WHERE tbl_harga_tindakan.id = '${id}'`,
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

const findHargaTindakanById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_harga_tindakan WHERE id = '${id}'
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

const editHargaTindakan = (data) => {
  const { id, id_klinik, id_daftar_tindakan, harga, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_tindakan 
          SET
            id_klinik='${id_klinik}', id_daftar_tindakan='${id_daftar_tindakan}', harga=${harga}, is_active=1, 
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

const editHargaTindakanActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_tindakan 
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

const editHargaTindakanArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_harga_tindakan 
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

const deleteHargaTindakan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_harga_tindakan WHERE id='${id}'`,
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
  insertHargaTindakan,
  allHargaTindakan,
  countAllHargaTindakan,
  getHargaTindakanById,
  findHargaTindakanById,
  editHargaTindakan,
  editHargaTindakanActivate,
  editHargaTindakanArchive,
  deleteHargaTindakan,
};
