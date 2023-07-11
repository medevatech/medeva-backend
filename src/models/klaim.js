const Pool = require('../config/db');

const insertKlaim = (data) => {
  const {
    id,
    id_sales,
    id_asuransi,
    id_asuransi_kelas,
    besar_klaim,
    status_klaim,
    kategori_penolakan,
    alasan_penolakan,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_klaim 
        (id, id_sales, id_asuransi, id_asuransi_kelas, besar_klaim, 
        status_klaim, kategori_penolakan, alasan_penolakan, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_sales}', '${id_asuransi}', '${id_asuransi_kelas}', ${besar_klaim}, 
        '${status_klaim}', '${kategori_penolakan}', '${alasan_penolakan}', ${is_active}, 
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

const allKlaim = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klaim.id, 
        tbl_klaim.id_sales, 
        tbl_klaim.id_asuransi, 
        tbl_klaim.id_asuransi_kelas, 
        tbl_klaim.besar_klaim, tbl_klaim.status_klaim, 
        tbl_klaim.kategori_penolakan, tbl_klaim.alasan_penolakan, tbl_klaim.is_active, 
        tbl_klaim.created_at, tbl_klaim.updated_at
      FROM tbl_klaim AS tbl_klaim
      INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
      INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
      WHERE
        (tbl_klaim.status_klaim ILIKE '%${search}%' 
      OR
        tbl_klaim.kategori_penolakan ILIKE '%${search}%')
      AND
        CAST(tbl_klaim.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_klaim.${sortBy} ${sortOrder} 
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

const countAllKlaim = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_klaim AS tbl_klaim
    INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
    INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
    INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
    WHERE
        (tbl_klaim.status_klaim ILIKE '%${search}%' 
    OR
        tbl_klaim.kategori_penolakan ILIKE '%${search}%')
    AND
        CAST(tbl_klaim.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getKlaimByIdKlaim = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klaim.id, 
        tbl_klaim.id_sales, 
        tbl_klaim.id_asuransi, 
        tbl_klaim.id_asuransi_kelas, 
        tbl_klaim.besar_klaim, tbl_klaim.status_klaim, 
        tbl_klaim.kategori_penolakan, tbl_klaim.alasan_penolakan, tbl_klaim.is_active, 
        tbl_klaim.created_at, tbl_klaim.updated_at
      FROM tbl_klaim AS tbl_klaim
      INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
      INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
      WHERE tbl_klaim.id = '${id}'`,
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

const findKlaimByIdKlaim = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_klaim WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getKlaimByIdSales = ({ id_sales }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klaim.id, 
        tbl_klaim.id_sales, 
        tbl_klaim.id_asuransi, 
        tbl_klaim.id_asuransi_kelas, 
        tbl_klaim.besar_klaim, tbl_klaim.status_klaim, 
        tbl_klaim.kategori_penolakan, tbl_klaim.alasan_penolakan, tbl_klaim.is_active, 
        tbl_klaim.created_at, tbl_klaim.updated_at
      FROM tbl_klaim AS tbl_klaim
      INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
      INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
      WHERE tbl_klaim.id_sales = '${id_sales}'`,
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

const findKlaimByIdSales = (id_sales) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klaim WHERE id_sales = '${id_sales}'`,
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

const getKlaimByIdAsuransi = ({ id_asuransi }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klaim.id, 
        tbl_klaim.id_sales, 
        tbl_klaim.id_asuransi, 
        tbl_klaim.id_asuransi_kelas, 
        tbl_klaim.besar_klaim, tbl_klaim.status_klaim, 
        tbl_klaim.kategori_penolakan, tbl_klaim.alasan_penolakan, tbl_klaim.is_active, 
        tbl_klaim.created_at, tbl_klaim.updated_at
      FROM tbl_klaim AS tbl_klaim
      INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
      INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
      WHERE tbl_klaim.id_asuransi = '${id_asuransi}'`,
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

const findKlaimByIdAsuransi = (id_asuransi) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klaim WHERE id_asuransi = '${id_asuransi}'`,
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

const getKlaimByIdAsuransiKelas = ({ id_asuransi_kelas }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_klaim.id, 
        tbl_klaim.id_sales, 
        tbl_klaim.id_asuransi, 
        tbl_klaim.id_asuransi_kelas, 
        tbl_klaim.besar_klaim, tbl_klaim.status_klaim, 
        tbl_klaim.kategori_penolakan, tbl_klaim.alasan_penolakan, tbl_klaim.is_active, 
        tbl_klaim.created_at, tbl_klaim.updated_at
      FROM tbl_klaim AS tbl_klaim
      INNER JOIN tbl_sales AS tbl_sales ON tbl_klaim.id_sales = tbl_sales.id
      INNER JOIN tbl_asuransi AS tbl_asuransi ON tbl_klaim.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas AS tbl_asuransi_kelas ON tbl_klaim.id_asuransi_kelas = tbl_asuransi_kelas.id
      WHERE tbl_klaim.id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const findKlaimByIdAsuransiKelas = (id_asuransi_kelas) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_klaim WHERE id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const editKlaim = (data) => {
  const {
    id,
    id_sales,
    id_asuransi,
    id_asuransi_kelas,
    besar_klaim,
    status_klaim,
    kategori_penolakan,
    alasan_penolakan,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klaim 
      SET
        id_sales='${id_sales}', id_asuransi='${id_asuransi}', id_asuransi_kelas='${id_asuransi_kelas}', besar_klaim=${besar_klaim}, 
        status_klaim='${status_klaim}', kategori_penolakan='${kategori_penolakan}', alasan_penolakan='${alasan_penolakan}',  is_active=${is_active}, 
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

const editKlaimActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klaim 
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

const editKlaimArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_klaim 
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

const deleteKlaim = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_klaim WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertKlaim,
  allKlaim,
  countAllKlaim,
  getKlaimByIdKlaim,
  findKlaimByIdKlaim,
  getKlaimByIdSales,
  findKlaimByIdSales,
  getKlaimByIdAsuransi,
  findKlaimByIdAsuransi,
  getKlaimByIdAsuransiKelas,
  findKlaimByIdAsuransiKelas,
  editKlaim,
  editKlaimActivate,
  editKlaimArchive,
  deleteKlaim,
};
