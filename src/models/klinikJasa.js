const pool = require("../config/db");

const createServiceClinic = (data) => {
  const { id, id_clinic, name, price } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_klinik_jasa (id, id_klinik, nama, harga, is_active, created_at, updated_at)
            VALUES ('${id}', '${id_clinic}', '${name}', '${price}', 1, NOW(), NOW())`,
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

const countServiceClinic = ({ search, searchClinic, searchStatus }) => {
  return pool.query(
    `SELECT COUNT(*) AS total
        FROM tbl_klinik_jasa
            INNER JOIN tbl_klinik ON tbl_klinik_jasa.id_klinik = tbl_klinik.id
            WHERE tbl_klinik_jasa.nama ILIKE '%${search}%'
            AND CAST(tbl_klinik_jasa.id_klinik AS TEXT) ILIKE '%${searchClinic}%'
            AND CAST(tbl_klinik_jasa.is_active AS TEXT) ILIKE '%${searchStatus}%'`
  );
};

const getServiceClinic = ({
  search,
  searchClinic,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kj.id, kj.id_klinik, kj.nama, kj.harga, kln.nama_klinik, kj.is_active, kj.created_at, kj.updated_at
            FROM tbl_klinik_jasa AS kj
            INNER JOIN tbl_klinik AS kln ON kj.id_klinik = kln.id
            WHERE kj.nama ILIKE '%${search}%'
            AND CAST(kj.id_klinik AS TEXT) ILIKE '%${searchClinic}%'
            AND CAST(kj.is_active AS TEXT) ILIKE '%${searchStatus}%'
            ORDER BY kj.${sortBy} ${sortOrder}
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

const getServiceClinicById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kj.id, kj.id_klinik, kj.nama, kj.harga, kln.nama_klinik, kj.is_active, kj.created_at, kj.updated_at
            FROM tbl_klinik_jasa AS kj
            INNER JOIN tbl_klinik AS kln ON kj.id_klinik = kln.id
            WHERE kj.id = '${id}'`,
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

const updateServiceClinic = (id, data) => {
  const { id_clinic, name, price } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET id_klinik = '${id_clinic}',
            nama = '${name}',
            harga = '${price}',
            updated_at = 'NOW()',
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

const archiveServiceClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET is_active = 0
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

const activateServiceClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_jasa
            SET is_active = 1
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
  createServiceClinic,
  countServiceClinic,
  getServiceClinic,
  getServiceClinicById,
  updateServiceClinic,
  archiveServiceClinic,
  activateServiceClinic,
};
