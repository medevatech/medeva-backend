const Pool = require('../config/db');

const insertRujukan = (data) => {
  const { id, id_kunjungan, id_rs, id_poli, anamnesis, terapi, catatan } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_rujukan 
        (id, id_kunjungan, id_rs, id_poli, anamnesis, terapi, catatan,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_kunjungan}', '${id_rs}', '${id_poli}', '${anamnesis}', '${terapi}', '${catatan}',
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

const allRujukan = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_rujukan.id, tbl_rujukan.id_kunjungan, 
        tbl_rujukan.id_rs, tbl_rujukan.id_poli,
        tbl_rujukan.anamnesis, tbl_rujukan.terapi, tbl_rujukan.catatan,
        tbl_rujukan.created_at, tbl_rujukan.updated_at
      FROM tbl_rujukan AS tbl_rujukan
      WHERE tbl_rujukan.id_rs
      ILIKE '%${search}%' ORDER BY tbl_rujukan.${sortBy} ${sortOrder} 
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

const countAllRujukan = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_rujukan`);
};

const getRujukanById = ({ id }) => {
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

const findRujukanById = (id) => {
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

module.exports = {
  insertRujukan,
  allRujukan,
  countAllRujukan,
  findRujukanById,
  getRujukanById,
  editRujukan,
};
