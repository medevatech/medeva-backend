const Pool = require('../config/db');

const insertJadwalBukaRS = (data) => {
  const { id, id_rs, hari, jam_buka, jam_tutup } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_jadwal_buka_rs 
        (id, id_rs, hari, jam_buka, jam_tutup,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_rs}', '${hari}', '${jam_buka}', '${jam_tutup}',
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

const allJadwalBukaRS = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_jadwal_buka_rs.id, 
            tbl_jadwal_buka_rs.id_rs, 
        tbl_jadwal_buka_rs.hari, tbl_jadwal_buka_rs.jam_buka, tbl_jadwal_buka_rs.jam_tutup,
        tbl_jadwal_buka_rs.created_at, tbl_jadwal_buka_rs.updated_at
      FROM tbl_jadwal_buka_rs AS tbl_jadwal_buka_rs
      WHERE tbl_jadwal_buka_rs.hari
      ILIKE '%${search}%' ORDER BY tbl_jadwal_buka_rs.${sortBy} ${sortOrder} 
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

const countAllJadwalBukaRS = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_jadwal_buka_rs`);
};

const getJadwalBukaRSById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_jadwal_buka_rs.id, 
          tbl_jadwal_buka_rs.id_rs, 
      tbl_jadwal_buka_rs.hari, tbl_jadwal_buka_rs.jam_buka, tbl_jadwal_buka_rs.jam_tutup,
      tbl_jadwal_buka_rs.created_at, tbl_jadwal_buka_rs.updated_at
      FROM tbl_jadwal_buka_rs AS tbl_jadwal_buka_rs
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

const findJadwalBukaRSById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_jadwal_buka_rs WHERE id = '${id}'
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

module.exports = {
  insertJadwalBukaRS,
  allJadwalBukaRS,
  countAllJadwalBukaRS,
  findJadwalBukaRSById,
  getJadwalBukaRSById,
  editJadwalBukaRS,
};
