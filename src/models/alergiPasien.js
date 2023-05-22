const Pool = require('../config/db');

const insertAlergiPasien = (data) => {
  const {
    id,
    id_pasien,
    alergi,
    tanggal_kunjungan_dicatat,
    tanggal_kunjungan_dihapus,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_alergi_pasien 
        (id, id_pasien, alergi, tanggal_kunjungan_dicatat, tanggal_kunjungan_dihapus,
            created_at, updated_at) 
        VALUES
        ('${id}', '${id_pasien}', '${alergi}', '${tanggal_kunjungan_dicatat}', '${tanggal_kunjungan_dihapus}', 
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

const allAlergiPasien = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
          tbl_alergi_pasien.id_pasien, 
          tbl_alergi_pasien.alergi,
          tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus,
            tbl_alergi_pasien.created_at,
            tbl_alergi_pasien.updated_at
        FROM tbl_alergi_pasien AS tbl_alergi_pasien
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
        WHERE tbl_alergi_pasien.id
        ILIKE '%${search}%' ORDER BY tbl_alergi_pasien.${sortBy} ${sortOrder} 
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

const countAllAlergiPasien = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM tbl_alergi_pasien`);
};

const getAlergiPasienById = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
            tbl_alergi_pasien.id_pasien, 
                tbl_pasien.nama_lengkap AS nama_lengkap,
            tbl_alergi_pasien.alergi,
            tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus,
              tbl_alergi_pasien.created_at,
              tbl_alergi_pasien.updated_at
        FROM tbl_alergi_pasien AS tbl_alergi_pasien
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
        WHERE tbl_alergi_pasien.id = '${id}'`,
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

const findAlergiPasienById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_alergi_pasien 
        WHERE
            id = '${id}' 
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

const getAlergiPasienByIdPasien = ({ id_pasien }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_alergi_pasien.id, 
            tbl_alergi_pasien.id_pasien, 
                tbl_pasien.nama_lengkap AS nama_lengkap,
            tbl_alergi_pasien.alergi,
            tbl_alergi_pasien.tanggal_kunjungan_dicatat, tbl_alergi_pasien.tanggal_kunjungan_dihapus,
              tbl_alergi_pasien.created_at,
              tbl_alergi_pasien.updated_at
        FROM tbl_alergi_pasien AS tbl_alergi_pasien
        INNER JOIN tbl_pasien AS tbl_pasien ON tbl_alergi_pasien.id_pasien = tbl_pasien.id
        WHERE tbl_alergi_pasien.id_pasien = '${id_pasien}'`,
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

const findAlergiPasienByIdPasien = (id_pasien) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_alergi_pasien 
        WHERE
            id_pasien = '${id_pasien}' 
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

const editAlergiPasien = (data) => {
  const {
    id,
    id_pasien,
    alergi,
    tanggal_kunjungan_dicatat,
    tanggal_kunjungan_dihapus,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_alergi_pasien 
          SET
            id_pasien='${id_pasien}', alergi='${alergi}',  tanggal_kunjungan_dicatat='${tanggal_kunjungan_dicatat}',  tanggal_kunjungan_dihapus='${tanggal_kunjungan_dihapus}', 
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

const deleteAlergiPasien = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_alergi_pasien WHERE id='${id}'`,
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
  insertAlergiPasien,
  allAlergiPasien,
  countAllAlergiPasien,
  getAlergiPasienById,
  findAlergiPasienById,
  getAlergiPasienByIdPasien,
  findAlergiPasienByIdPasien,
  editAlergiPasien,
  deleteAlergiPasien,
};
