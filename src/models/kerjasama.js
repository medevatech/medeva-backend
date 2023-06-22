const Pool = require('../config/db');

const insertKerjasama = (data) => {
  const { id, id_asuransi, id_asuransi_kelas, id_klinik, tipe, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_kerjasama 
        (id,  id_asuransi, id_asuransi_kelas, id_klinik, tipe, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${id_asuransi}', '${id_asuransi_kelas}', '${id_klinik}', '${tipe}', ${is_active}, 
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

const allKerjasama = ({
  search,
  searchAsuransi,
  searchAsuransiKelas,
  searchKlinik,
  searchTipe,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kerjasama.id, 
        tbl_kerjasama.id_asuransi, tbl_asuransi.nama AS nama,
        tbl_kerjasama.id_asuransi_kelas, tbl_asuransi_kelas.nama_kelas AS nama_kelas,
        tbl_kerjasama.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_kerjasama.tipe, tbl_kerjasama.is_active, 
        tbl_kerjasama.created_at, tbl_kerjasama.updated_at
      FROM tbl_kerjasama AS tbl_kerjasama
      INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
      INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
      INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
      WHERE
        tbl_kerjasama.tipe ILIKE '%${search}%' 
      AND
        tbl_asuransi.nama ILIKE '%${searchAsuransi}%' 
      AND
        tbl_asuransi_kelas.nama_kelas ILIKE '%${searchAsuransiKelas}%' 
      AND
        tbl_klinik.nama_klinik ILIKE '%${searchKlinik}%' 
      AND
        tbl_kerjasama.tipe ILIKE '%${searchTipe}%' 
      AND
        CAST(tbl_kerjasama.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_kerjasama.${sortBy} ${sortOrder} 
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

const countAllKerjasama = (
  search,
  searchAsuransi,
  searchAsuransiKelas,
  searchKlinik,
  searchTipe,
  searchStatus
) => {
  return Pool.query(`
  SELECT COUNT(*) AS total
  FROM tbl_kerjasama AS tbl_kerjasama
    INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
    INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
    INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
    WHERE
    tbl_kerjasama.tipe ILIKE '%${search}%' 
    AND
    tbl_asuransi.nama ILIKE '%${searchAsuransi}%' 
    AND
    tbl_asuransi_kelas.nama_kelas ILIKE '%${searchAsuransiKelas}%' 
    AND
    tbl_klinik.nama_klinik ILIKE '%${searchKlinik}%' 
    AND
    tbl_kerjasama.tipe ILIKE '%${searchTipe}%' 
    AND
    CAST(tbl_kerjasama.is_active AS TEXT) ILIKE '%${searchStatus}%'`);
};

const getKerjasamaByIdKerjasama = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kerjasama.id, 
        tbl_kerjasama.id_asuransi, tbl_asuransi.nama AS nama,
        tbl_kerjasama.id_asuransi_kelas, tbl_asuransi_kelas.nama_kelas AS nama_kelas,
        tbl_kerjasama.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
        tbl_kerjasama.tipe, tbl_kerjasama.is_active, 
        tbl_kerjasama.created_at, tbl_kerjasama.updated_at
        FROM tbl_kerjasama AS tbl_kerjasama
        INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
        INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
        INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
      WHERE tbl_kerjasama.id = '${id}'`,
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

const findKerjasamaByIdKerjasama = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kerjasama WHERE id = '${id}'`,
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

const getKerjasamaByIdAsuransi = ({ id_asuransi }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kerjasama.id, 
          tbl_kerjasama.id_asuransi, tbl_asuransi.nama AS nama,
          tbl_kerjasama.id_asuransi_kelas, tbl_asuransi_kelas.nama_kelas AS nama_kelas,
          tbl_kerjasama.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
          tbl_kerjasama.tipe, tbl_kerjasama.is_active, 
          tbl_kerjasama.created_at, tbl_kerjasama.updated_at
          FROM tbl_kerjasama AS tbl_kerjasama
          INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
          INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
          INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
        WHERE tbl_kerjasama.id_asuransi = '${id_asuransi}'`,
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

const findKerjasamaByIdAsuransi = (id_asuransi) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kerjasama WHERE id_asuransi = '${id_asuransi}'`,
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

const getKerjasamaByIdAsuransiKelas = ({ id_asuransi_kelas }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kerjasama.id, 
          tbl_kerjasama.id_asuransi, tbl_asuransi.nama AS nama,
          tbl_kerjasama.id_asuransi_kelas, tbl_asuransi_kelas.nama_kelas AS nama_kelas,
          tbl_kerjasama.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
          tbl_kerjasama.tipe, tbl_kerjasama.is_active, 
          tbl_kerjasama.created_at, tbl_kerjasama.updated_at
          FROM tbl_kerjasama AS tbl_kerjasama
          INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
          INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
          INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
        WHERE tbl_kerjasama.id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const findKerjasamaByIdAsuransiKelas = (id_asuransi_kelas) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kerjasama WHERE id_asuransi_kelas = '${id_asuransi_kelas}'`,
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

const getKerjasamaByIdKlinik = ({ id_klinik }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_kerjasama.id, 
          tbl_kerjasama.id_asuransi, tbl_asuransi.nama AS nama,
          tbl_kerjasama.id_asuransi_kelas, tbl_asuransi_kelas.nama_kelas AS nama_kelas,
          tbl_kerjasama.id_klinik, tbl_klinik.nama_klinik AS nama_klinik,
          tbl_kerjasama.tipe, tbl_kerjasama.is_active, 
          tbl_kerjasama.created_at, tbl_kerjasama.updated_at
          FROM tbl_kerjasama AS tbl_kerjasama
          INNER JOIN tbl_asuransi as tbl_asuransi ON tbl_kerjasama.id_asuransi = tbl_asuransi.id
          INNER JOIN tbl_asuransi_kelas as tbl_asuransi_kelas ON tbl_kerjasama.id_asuransi_kelas = tbl_asuransi_kelas.id
          INNER JOIN tbl_klinik as tbl_klinik ON tbl_kerjasama.id_klinik = tbl_klinik.id
        WHERE tbl_kerjasama.id_klinik = '${id_klinik}'`,
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

const findKerjasamaByIdKlinik = (id_klinik) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_kerjasama WHERE id_klinik = '${id_klinik}'`,
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

const editKerjasama = (data) => {
  const { id, id_asuransi, id_asuransi_kelas, id_klinik, tipe, is_active } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kerjasama 
      SET
        id_asuransi='${id_asuransi}', id_asuransi_kelas='${id_asuransi_kelas}', id_klinik='${id_klinik}', tipe='${tipe}', is_active=${is_active}, 
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

const editKerjasamaActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kerjasama 
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

const editKerjasamaArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kerjasama 
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

const editKlinikActivate = (data) => {
  const { id_klinik, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kerjasama 
            SET
              is_active=${is_active}, 
              updated_at=NOW()
            WHERE id_klinik='${id_klinik}'`,
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

const editKlinikArchive = (data) => {
  const { id_klinik, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_kerjasama 
            SET
              is_active=${is_active}, 
              updated_at=NOW()
            WHERE id_klinik='${id_klinik}'`,
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

const deleteKerjasama = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_kerjasama WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteKerjasamaByIdKlinik = (data) => {
  const { id_klinik } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM tbl_kerjasama WHERE id_klinik='${id_klinik}'`,
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
  insertKerjasama,
  allKerjasama,
  countAllKerjasama,
  getKerjasamaByIdKerjasama,
  findKerjasamaByIdKerjasama,
  getKerjasamaByIdAsuransi,
  findKerjasamaByIdAsuransi,
  getKerjasamaByIdAsuransiKelas,
  findKerjasamaByIdAsuransiKelas,
  getKerjasamaByIdKlinik,
  findKerjasamaByIdKlinik,
  editKerjasama,
  editKerjasamaActivate,
  editKerjasamaArchive,
  editKlinikActivate,
  editKlinikArchive,
  deleteKerjasama,
  deleteKerjasamaByIdKlinik,
};
