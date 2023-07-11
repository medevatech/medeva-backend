const pool = require("../config/db");

const createMedicineComposition = (data) => {
  const {
    id,
    id_ingredients,
    id_medicine,
    per_ammount,
    per_piece,
    ammount,
    piece,
  } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_komposisi_obat (id, id_bahan_obat, id_obat, per_jumlah, per_satuan, jumlah, satuan, is_active, created_at, updated_at)
            VALUES ('${id}', '${id_ingredients}', '${id_medicine}', '${per_ammount}', '${per_piece}', '${ammount}', '${piece}', 1, NOW(), NOW())`,
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

const getMedicineComposition = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mc.id, mc.id_bahan_obat, mc.id_obat, mc.per_jumlah, mc.per_satuan, mc.jumlah, mc.satuan, is_active, created_at, updated_at
            INNER JOIN tbl_bahan_obat AS bo ON mc.id_bahan_obat = bo.id
            INNER JOIN tbl_obat AS obat ON mc.id_obat = obat.id`,
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

const getMedicineCompositionById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mc.id, mc.id_bahan_obat, mc.id_obat, mc.per_jumlah, mc.per_satuan, mc.jumlah, mc.satuan, is_active, created_at, updated, at
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

const updateMedicineComposition = (id, data) => {
  const {
    id_medicine_ingredients,
    id_medicine,
    per_ammount,
    per_piece,
    ammount,
    piece,
  } = data;
  return new Promise((resolve, reject) => {
    `UPDATE tbl_komposisi_obat
        SET id_bahan_obat = '${id_medicine_ingredients}'
        id_obat = '${id_medicine}'
        per_jumlah = '${per_ammount}'
        per_satuan = '${per_piece}'
        jumlah = '${ammount}'
        satuan = '${piece}'
        WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      };
  });
};

const archiveMedicineComposition = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_komposisi_obat
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

const activateMedicineComposition = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_komposisi_obat
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

const deleteMedicineComposition = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM tbl_komposisi_obat
            WHERE id = '${id}'`
    );
  });
};

module.exports = {
  createMedicineComposition,
  getMedicineComposition,
  getMedicineCompositionById,
  updateMedicineComposition,
  archiveMedicineComposition,
  activateMedicineComposition,
  deleteMedicineComposition,
};
