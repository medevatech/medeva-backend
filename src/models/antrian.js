const pool = require("../config/db");

const countAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) AS total FROM tbl_antrian WHERE tanggal = '${date}'`,
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

const createAntrian = (data) => {
  const { id, no_antrian, tanggal } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_antrian (id, tanggal, no_antrian, status, created_at, updated_at) VALUES('${id}', '${tanggal}', '${no_antrian}', 1, NOW(), NOW())`,
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

const getAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id, no_antrian FROM tbl_antrian WHERE tanggal = '${date}' AND status = 1`,
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

const getTotalAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) as total FROM tbl_antrian WHERE tanggal = '${date}' AND status = 1`,
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

const getRestAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) as total FROM tbl_antrian WHERE tanggal = '${date}' AND status = 0`,
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

const getNowAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT no_antrian FROM tbl_antrian WHERE tanggal = '${date}' AND status = 0 ORDER BY updated_at DESC LIMIT 1`,
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

const getNextAntrian = () => {
  var date = new Date().toISOString().slice(0, 10);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT no_antrian FROM tbl_antrian WHERE tanggal = '${date}' AND status = 1 ORDER BY no_antrian ASC LIMIT 1`,
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

const updateAntrian = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_antrian SET status = 0, updated_at = NOW() WHERE id = '${id}'`,
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
  countAntrian,
  createAntrian,
  getAntrian,
  getTotalAntrian,
  getRestAntrian,
  getNowAntrian,
  getNextAntrian,
  updateAntrian,
};
