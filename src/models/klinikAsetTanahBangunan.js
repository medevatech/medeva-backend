const pool = require("../config/db");

const createBuildingLandAssetClinic = (data) => {
  const {
    id,
    id_clinic,
    name,
    purchase_date,
    purchase_price,
    type,
    expired,
    depreciation_method,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_klinik_aset_tanah_bangunan (id, id_klinik, nama, tanggal_beli, harga_beli, tipe, habis_masa_hidup, metode_depresiasi, is_active, created_at, updated_at)
            VALUES ('${id}', '${id_clinic}', '${name}', '${purchase_date}', '${purchase_price}', '${type}', '${expired}', '${depreciation_method}', 1, NOW(), NOW())`,
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

const countBuildingLandAssetClinic = ({
  search,
  searchClinic,
  searchStatus,
}) => {
  return pool.query(
    `SELECT COUNT(*) AS total
        FROM tbl_klinik_aset_tanah_bangunan
            INNER JOIN tbl_klinik ON tbl_klinik_aset_tanah_bangunan.id_klinik = tbl_klinik.id
            WHERE tbl_klinik_aset_tanah_bangunan.nama ILIKE '%${search}%'
            AND CAST(tbl_klinik_aset_tanah_bangunan.id_klinik AS TEXT) ILIKE '%${searchClinic}%'
            AND CAST(tbl_klinik_aset_tanah_bangunan.is_active AS TEXT) ILIKE '%${searchStatus}%'`
  );
};

const getBuildingLandAssetClinic = ({
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
      `SELECT katb.id, katb.id_klinik, kln.nama_klinik, katb.nama, katb.tanggal_beli, katb.harga_beli, katb.tipe, katb.habis_masa_hidup, katb.metode_depresiasi, katb.is_active, katb.created_at, katb.updated_at
      FROM tbl_klinik_aset_tanah_bangunan AS katb
      INNER JOIN tbl_klinik AS kln ON katb.id_klinik = kln.id
      WHERE katb.nama ILIKE '%${search}%'
      AND CAST(katb.id_klinik AS TEXT) ILIKE '%${searchClinic}%'
      AND CAST(katb.is_active AS TEXT) ILIKE '%${searchStatus}%'
      ORDER BY katb.${sortBy} ${sortOrder}
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

const getBuildingLandAssetClinicById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT katb.id, katb.id_klinik, kln.nama_klinik, katb.nama, katb.tanggal_beli, katb.harga_beli, katb.tipe, katb.habis_masa_hidup, katb.is_active, katb.created_at, katb.updated_at
      FROM tbl_klinik_aset_tanah_bangunan AS katb
      INNER JOIN tbl_klinik AS kln ON katb.id_klinik = kln.id
      WHERE katb.id = '${id}'`,
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

const updateBuildingLandAssetClinic = (id, data) => {
  const { id_clinic, name, purchase_date, purchase_price, type, expired } =
    data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_aset_tanah_bangunan
            SET id_klinik = '${id_clinic}',
            nama = '${name}',
            tanggal_beli = '${purchase_date}',
            harga_beli = '${purchase_price}',
            tipe = '${type}',
            habis_masa_hidup = '${expired}',
            updated_at = NOW(),
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

const archiveBuildingLandAssetClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_aset_tanah_bangunan
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

const activateBuildingLandAssetClinic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_klinik_aset_tanah_bangunan
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
  createBuildingLandAssetClinic,
  countBuildingLandAssetClinic,
  getBuildingLandAssetClinic,
  getBuildingLandAssetClinicById,
  updateBuildingLandAssetClinic,
  archiveBuildingLandAssetClinic,
  activateBuildingLandAssetClinic,
};
