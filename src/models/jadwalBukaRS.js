const Pool = require('../config/db');

const insertJadwalBukaRS = (data) => {
  const { id, id_rs, hari, jam_buka, jam_tutup, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_jadwal_buka_rs 
        (id, id_rs, hari, jam_buka, jam_tutup, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_rs}', '${hari}', '${jam_buka}', '${jam_tutup}', ${is_active},
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

const allJadwalBukaRS = ({
  search,
  searchRS,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_jadwal_buka_rs.id, 
        tbl_jadwal_buka_rs.id_rs, tbl_rs.nama,
        tbl_jadwal_buka_rs.hari, tbl_jadwal_buka_rs.jam_buka, tbl_jadwal_buka_rs.jam_tutup, tbl_jadwal_buka_rs.is_active,
        tbl_jadwal_buka_rs.created_at, tbl_jadwal_buka_rs.updated_at
      FROM tbl_jadwal_buka_rs AS tbl_jadwal_buka_rs
      INNER JOIN tbl_rs AS tbl_rs ON tbl_jadwal_buka_rs.id_rs = tbl_rs.id
      WHERE
        tbl_jadwal_buka_rs.hari ILIKE '%${search}%' 
      AND
        tbl_rs.nama ILIKE '%${searchRS}%'
      AND
        CAST (tbl_jadwal_buka_rs.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_jadwal_buka_rs.${sortBy} ${sortOrder} 
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

const countAllJadwalBukaRS = (search, searchRS, searchStatus) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_jadwal_buka_rs AS tbl_jadwal_buka_rs
  INNER JOIN tbl_rs AS tbl_rs ON tbl_jadwal_buka_rs.id_rs = tbl_rs.id
  WHERE
    tbl_jadwal_buka_rs.hari ILIKE '%${search}%' 
  AND
    tbl_rs.nama ILIKE '%${searchRS}%'
  AND
    CAST (tbl_jadwal_buka_rs.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getJadwalBukaRSByIdJadwalBukaRS = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_jadwal_buka_rs.id, 
        tbl_jadwal_buka_rs.id_rs, tbl_rs.nama,
        tbl_jadwal_buka_rs.hari, tbl_jadwal_buka_rs.jam_buka, tbl_jadwal_buka_rs.jam_tutup, tbl_jadwal_buka_rs.is_active,
        tbl_jadwal_buka_rs.created_at, tbl_jadwal_buka_rs.updated_at
      FROM tbl_jadwal_buka_rs AS tbl_jadwal_buka_rs
      INNER JOIN tbl_rs AS tbl_rs ON tbl_jadwal_buka_rs.id_rs = tbl_rs.id
      WHERE tbl_jadwal_buka_rs.id = '${id}'`,
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

const findJadwalBukaRSByIdJadwalBukaRS = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_jadwal_buka_rs WHERE id = '${id}'`,
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

const editJadwalBukaRS = (data) => {
  const { id, id_rs, hari, jam_buka, jam_tutup } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_jadwal_buka_rs 
      SET
        id_rs='${id_rs}', hari='${hari}', jam_buka='${jam_buka}', jam_tutup='${jam_tutup}',
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

const editJadwalBukaRSActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_jadwal_buka_rs 
      SET
        is_active=${is_active}, 
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

const deleteJadwalBukaRS = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_jadwal_buka_rs WHERE id='${id}'`,
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
  insertJadwalBukaRS,
  allJadwalBukaRS,
  countAllJadwalBukaRS,
  getJadwalBukaRSByIdJadwalBukaRS,
  findJadwalBukaRSByIdJadwalBukaRS,
  editJadwalBukaRS,
  editJadwalBukaRSActiveArchive,
  deleteJadwalBukaRS,
};
