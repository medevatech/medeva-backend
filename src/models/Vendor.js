const Pool = require('../config/db');

const insertVendor = (data) => {
  const {
    id,
    nama,
    telepon,
    whatsapp,
    website,
    instagram,
    facebook,
    email,
    alamat,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_vendor 
        (id, nama, telepon, whatsapp,
        website, instagram, facebook, 
        email, alamat, is_active,
        created_at, updated_at) 
      VALUES
        ('${id}', '${nama}', '${telepon}', '${whatsapp}', 
        '${website}', '${instagram}', '${facebook}', '${email}', 
        '${alamat}', ${is_active}, 
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

const allVendor = ({
  search,
  searchStatus,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vendor.id, 
        tbl_vendor.nama, tbl_vendor.telepon, tbl_vendor.whatsapp, 
        tbl_vendor.website, tbl_vendor.instagram, tbl_vendor.facebook, 
        tbl_vendor.email, tbl_vendor.alamat, 
        tbl_vendor.created_at, tbl_vendor.updated_at
      FROM tbl_vendor AS tbl_vendor
      WHERE
        tbl_vendor.nama ILIKE '%${search}%' 
      AND
        CAST(tbl_vendor.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY tbl_vendor.${sortBy} ${sortOrder} 
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

const countAllVendor = (search, searchStatus) => {
  return Pool.query(
    `SELECT COUNT(*) AS total
    FROM tbl_vendor AS tbl_vendor
    WHERE
        tbl_vendor.nama ILIKE '%${search}%' 
    AND
        CAST(tbl_vendor.is_active AS TEXT) ILIKE '%${searchStatus}%'
    `
  );
};

const getVendorByIdVendor = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_vendor.id, 
        tbl_vendor.nama, tbl_vendor.telepon, tbl_vendor.whatsapp, 
        tbl_vendor.website, tbl_vendor.instagram, tbl_vendor.facebook, 
        tbl_vendor.email, tbl_vendor.alamat, 
        tbl_vendor.created_at, tbl_vendor.updated_at
      FROM tbl_vendor AS tbl_vendor
      WHERE tbl_vendor.id = '${id}'`,
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

const findVendorByIdVendor = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_vendor WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const editVendor = (data) => {
  const {
    id,
    nama,
    telepon,
    whatsapp,
    website,
    instagram,
    facebook,
    email,
    alamat,
    is_active,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vendor 
      SET
        nama='${nama}', telepon='${telepon}', whatsapp='${whatsapp}', 
        website='${website}', instagram='${instagram}', facebook='${facebook}',
        email='${email}', alamat='${alamat}', is_active=${is_active}, 
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

const editVendorActivate = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vendor 
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

const editVendorArchive = (data) => {
  const { id, is_active } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_vendor 
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

const deleteVendor = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_vendor WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertVendor,
  allVendor,
  countAllVendor,
  getVendorByIdVendor,
  findVendorByIdVendor,
  editVendor,
  editVendorActivate,
  editVendorArchive,
  deleteVendor,
};
