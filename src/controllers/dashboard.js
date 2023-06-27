const { response } = require('../middleware/common.js');
const {
  totalKlaimFFS,
  totalKlaimPPS,
  totalPendapatanFFS,
  totalPendapatanPPS,
  klaimBerhasilA,
  klaimBerhasilB,
  tableAS02,
  totalPendapatanByIdAsuransiAndAsuransiKelas,
  totalKunjunganByIdAsuransiKelas,
  totalTipeKunjunganByIdAsuransiKelas,
} = require('../models/dashboard.js');
const { v4: uuidv4 } = require('uuid');

const dashboardController = {
  getAS02: async (req, res) => {
    try {
      //total_klaim
      let total_klaim_ffs = await totalKlaimFFS();
      let total_klaim_pps = await totalKlaimPPS();

      total_klaim_ffs = total_klaim_ffs.rows[0];
      total_klaim_pps = total_klaim_pps.rows[0];

      const totalKlaim = total_klaim_ffs.sum + total_klaim_pps.sum;

      //total_pendapatan
      let total_pendapatan_ffs = await totalPendapatanFFS();
      let total_pendapatan_pps = await totalPendapatanPPS();

      total_pendapatan_ffs = total_pendapatan_ffs.rows[0];
      total_pendapatan_pps = total_pendapatan_pps.rows[0];

      const totalPendapatan =
        total_pendapatan_ffs.sum + total_pendapatan_pps.sum;

      //klaim_berhasil
      let klaim_berhasil_a = await klaimBerhasilA();
      let klaim_berhasil_b = await klaimBerhasilB();

      klaim_berhasil_a = klaim_berhasil_a.rows[0];
      klaim_berhasil_b = klaim_berhasil_b.rows[0];

      const totalKlaimBerhasil =
        (klaim_berhasil_a.count / klaim_berhasil_b.count) * 100;

      //table
      let table = await tableAS02();

      table = table.rows;

      //   GENERATE RESULT   //
      const result = {
        total_klaim: {
          ffs: total_klaim_ffs,
          pps: total_klaim_pps,
          result: totalKlaim,
        },
        total_pendapatan: {
          ffs: total_pendapatan_ffs,
          pps: total_pendapatan_pps,
          result: totalPendapatan,
        },
        klaim_berhasil: {
          a: klaim_berhasil_a,
          b: klaim_berhasil_b,
          result: totalKlaimBerhasil,
        },
        tabel: { result: table },
      };

      response(res, 200, true, result, 'get dashboard a-02 success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get dashboard a-02 failed');
    }
  },
  getAS03: async (req, res) => {
    try {
      //pendapatan
      const id_asuransi = req.query.id_asuransi || '';
      const id_asuransi_kelas = req.query.id_asuransi_kelas || '';

      let data = {
        id_asuransi: id_asuransi,
        id_asuransi_kelas: id_asuransi_kelas,
      };

      let total_pendapatan = await totalPendapatanByIdAsuransiAndAsuransiKelas({
        id_asuransi,
        id_asuransi_kelas,
      });

      total_pendapatan = total_pendapatan.rows[0].sum;

      //kunjungan
      let total_kunjungan = await totalKunjunganByIdAsuransiKelas({
        id_asuransi_kelas,
      });

      total_kunjungan = total_kunjungan.rows[0].sum;

      //tipe_kunjungan
      let tipe_kunjungan = await totalTipeKunjunganByIdAsuransiKelas({
        id_asuransi_kelas,
      });

      tipe_kunjungan = tipe_kunjungan.rows[0].sum;

      //   GENERATE RESULT   //
      const result = {
        pendapatan: {
          result: total_pendapatan,
        },
        kunjungan: {
          result: total_kunjungan,
        },
        tipe_kunjungan: {
          result: tipe_kunjungan,
        },
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (
          (key === 'id_asuransi' && value === '') ||
          (key === 'id_asuransi_kelas' && value === '')
        ) {
          isError = true;
          return response(
            res,
            404,
            false,
            null,
            `Parameter ${key} wajib diisi`
          );
        }
      }

      if (isError === false) {
        response(res, 200, true, result, 'get dashboard a-03 success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get dashboard a-03 failed');
    }
  },
};

exports.dashboardController = dashboardController;
