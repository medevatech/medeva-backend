const Pool = require('../config/db');

const insertRujukan = (data) => {
  const {
    id,
    id_kunjungan,
    id_rs,
    id_poli,
    anamnesis,
    terapi,
    catatan,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rujukan 
        (id, id_kunjungan, id_rs, id_poli, anamnesis, terapi, catatan, is_active,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_rs}', '${id_poli}', '${anamnesis}', '${terapi}', '${catatan}', ${is_active},
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

const allRujukan = ({
  search,
  searchRS,
  searchPoli,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rujukan.id, tbl_rujukan.id_kunjungan, 
        tbl_rujukan.id_rs, tbl_rs.nama,
        tbl_rujukan.id_poli, tbl_poli.nama,
        tbl_rujukan.anamnesis, tbl_rujukan.terapi, tbl_rujukan.catatan,
        tbl_rujukan.created_at, tbl_rujukan.updated_at
      FROM tbl_rujukan AS tbl_rujukan
      INNER JOIN tbl_rs AS tbl_rs ON tbl_rujukan.id_rs = tbl_rs.id
      INNER JOIN tbl_poli AS tbl_poli ON tbl_rujukan.id_poli = tbl_poli.id
      WHERE 
        tbl_rujukan.anamnesis ILIKE '%${search}%' 
      AND
        tbl_rs.nama ILIKE '%${searchRS}%'
      AND
      tbl_poli.nama ILIKE '%${searchPoli}%'
      AND
        CAST(tbl_rujukan.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_rujukan.${sortBy} ${sortOrder} 
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

const countAllRujukan = (search, searchRS, searchPoli, searchStatus) => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_rujukan`);
};

const getRujukanByIdRujukan = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rujukan.id, tbl_rujukan.id_kunjungan, 
        tbl_rujukan.id_rs, tbl_rujukan.id_poli,
        tbl_rujukan.anamnesis, tbl_rujukan.terapi, tbl_rujukan.catatan,
        tbl_rujukan.created_at, tbl_rujukan.updated_at
      FROM tbl_rujukan AS tbl_rujukan
      WHERE tbl_rujukan.id = '${id}'`,
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

const findRujukanByIdRujukan = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rujukan WHERE id = '${id}'
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

const editRujukan = (data) => {
  const { id, id_kunjungan, id_rs, id_poli, anamnesis, terapi, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rujukan 
          SET
            id_kunjungan='${id_kunjungan}', id_rs='${id_rs}', id_poli='${id_poli}', 
            anamnesis='${anamnesis}', terapi='${terapi}', catatan='${catatan}',
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

const getRujukanByIdKunjungan = ({ id_kunjungan }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rujukan.id, tbl_rujukan.id_kunjungan, 
        tbl_rujukan.id_rs, tbl_rujukan.id_poli,
        tbl_rujukan.anamnesis, tbl_rujukan.terapi, tbl_rujukan.catatan,
        tbl_rujukan.created_at, tbl_rujukan.updated_at
      FROM tbl_rujukan AS tbl_rujukan
      WHERE tbl_rujukan.id_kunjungan = '${id_kunjungan}'`,
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

const findRujukanByIdKunjungan = (id_kunjungan) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_rujukan WHERE id_kunjungan = '${id_kunjungan}'
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

const editRujukanActiveArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_rujukan 
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

const deleteRujukan = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_rujukan WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertRujukan,
  allRujukan,
  countAllRujukan,
  getRujukanByIdRujukan,
  findRujukanByIdRujukan,
  editRujukan,
  getRujukanByIdKunjungan,
  findRujukanByIdKunjungan,
  editRujukanActiveArchive,
  deleteRujukan,
};
