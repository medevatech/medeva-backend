const Pool = require('../config/db');

const getFFS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(besar_klaim)
      FROM tbl_klaim`,
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

const getPPS = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT SUM(besar_klaim)
    FROM tbl_klaim`,
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
  getFFS,
  getPPS,
};
