const { response } = require('../middleware/common.js');
const {
  totalKlaimFFS,
  totalKlaimPPS,
  totalPendapatanFFS,
  totalPendapatanPPS,
  klaimBerhasilA,
  klaimBerhasilB,
  countAllTableAS02,
  tableAS02,
  totalPendapatanByIdAsuransiAndAsuransiKelas,
  kunjunganSales,
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const {
        rows: [count],
      } = await countAllTableAS02();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      let table = await tableAS02({ limit, offset });

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
        tabel: {
          result: [
            {
              id: 'd064e1d3-248e-4c93-8fcb-42afb4de6208',
              id_asuransi: '89451d04-bddf-4fc4-9117-1e380bd76533',
              produk: 'VVIP 1',
              id_asuransi_kelas: 'e43e8168-8ee2-492e-bf90-73c5e51b6586',
              asuransi: 'BPJS',
              tipe: 'PPST',
              klaim: 15000,
              pendapatan: 3000,
            },
            {
              id: '102fc009-44b2-4503-8d82-6b81b485173e',
              id_asuransi: '9f71051a-b83d-402a-8700-dafa8afefdcc',
              produk: 'VIP 2',
              id_asuransi_kelas: 'ce96afc1-c736-4fba-ac0a-88977bd4da8d',
              asuransi: 'Mandiri',
              tipe: 'PPST',
              klaim: 5000,
              pendapatan: 6000,
            },
            {
              id: '71f034f4-ec3a-438e-b6da-279d5d631a33',
              id_asuransi: '9fa808c4-fbf8-4fe2-a20b-ba6c36e86184',
              produk: 'Silver',
              id_asuransi_kelas: '51e96e41-917a-47c7-a684-84287bd6fb24',
              asuransi: 'Axa',
              tipe: 'PPST',
              klaim: 78000,
              pendapatan: 30000,
            },
            {
              id: 'a0129604-188e-4ae8-b905-f9f22ec1f1a3',
              id_asuransi: '9fa808c4-fbf8-4fe2-a20b-ba6c36e86184',
              produk: 'VIP 2',
              id_asuransi_kelas: '98e60eae-2bfc-4b88-9793-4daaad1752fb',
              asuransi: 'Axa',
              tipe: 'FFSP',
              klaim: 10000,
              pendapatan: 63000,
            },
            {
              id: '35e6a1f4-bb3a-4f89-9b4a-832b220a2bb6',
              id_asuransi: '9fa808c4-fbf8-4fe2-a20b-ba6c36e86184',
              produk: 'Gold',
              id_asuransi_kelas: 'a91079c0-00d1-4cc5-82ce-4891b301859b',
              asuransi: 'Axa',
              tipe: 'FFSP',
              klaim: 11000,
              pendapatan: 93000,
            },
            {
              id: '1cec3024-d62b-4815-a51a-f3580672d7c0',
              id_asuransi: 'cac11322-7347-40b2-8137-5408eac83857',
              produk: 'Platinum',
              id_asuransi_kelas: 'f3c0e88f-4ca8-46cc-aaa0-618bd83ebc07',
              asuransi: 'Nyoba lagi dungs',
              tipe: 'FFSP',
              klaim: 15000,
              pendapatan: 3000,
            },
          ],
          pagination: pagination,
        },
      };

      response(res, 200, true, result, 'get dashboard a-02 success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get dashboard a-02 failed');
    }
  },
  getAS03: async (req, res) => {
    try {
      const id_asuransi = req.query.id_asuransi || '';
      const id_asuransi_kelas = req.query.id_asuransi_kelas || '';

      let data = {
        id_asuransi: id_asuransi,
        id_asuransi_kelas: id_asuransi_kelas,
      };

      //pendapatan
      let total_pendapatan = await totalPendapatanByIdAsuransiAndAsuransiKelas({
        id_asuransi,
        id_asuransi_kelas,
      });

      total_pendapatan = total_pendapatan.rows[0].sum;

      //kunjungan_sales
      let kunjungan_sales = await kunjunganSales();

      kunjungan_sales = kunjungan_sales.rows;

      // //kunjungan
      // let total_kunjungan = await totalKunjunganByIdAsuransiKelas({
      //   id_asuransi_kelas,
      // });

      // total_kunjungan = total_kunjungan.rows[0].sum;

      // //tipe_kunjungan
      // let tipe_kunjungan = await totalTipeKunjunganByIdAsuransiKelas({
      //   id_asuransi_kelas,
      // });

      // tipe_kunjungan = tipe_kunjungan.rows[0].sum;

      //   GENERATE RESULT   //
      const result = {
        peserta: {
          result: 950,
        },
        pendapatan: {
          result: total_pendapatan,
        },
        kunjungan: {
          result: [
            { januari: 50 },
            { februari: 50 },
            { maret: 100 },
            { april: 10 },
            { mei: 10 },
            { juni: 15 },
            { juli: 100 },
            { agustus: 100 },
            { september: 90 },
            { oktober: 11 },
            { november: 150 },
            { desember: 200 },
          ],
        },
        tipe_kunjungan: {
          result: [
            {
              januari: [{ jalan: 5, inap: 10, promotif: 10, prefentif: 10 }],
            },
            {
              februari: [{ jalan: 15, inap: 20, promotif: 30, prefentif: 40 }],
            },
            {
              maret: [{ jalan: 25, inap: 30, promotif: 40, prefentif: 50 }],
            },
            {
              april: [{ jalan: 35, inap: 40, promotif: 50, prefentif: 60 }],
            },
            {
              mei: [{ jalan: 11, inap: 13, promotif: 14, prefentif: 11 }],
            },
            {
              juni: [{ jalan: 55, inap: 100, promotif: 110, prefentif: 110 }],
            },
            {
              juli: [{ jalan: 15, inap: 11, promotif: 12, prefentif: 12 }],
            },
            {
              agustus: [{ jalan: 65, inap: 160, promotif: 190, prefentif: 70 }],
            },
            {
              september: [{ jalan: 6, inap: 39, promotif: 45, prefentif: 67 }],
            },
            {
              oktober: [{ jalan: 54, inap: 24, promotif: 45, prefentif: 12 }],
            },
            {
              november: [{ jalan: 67, inap: 189, promotif: 11, prefentif: 15 }],
            },
            {
              desember: [{ jalan: 34, inap: 122, promotif: 12, prefentif: 19 }],
            },
          ],
        },
        total_rujukan: {
          result: [
            { januari: 10 },
            { februari: 22 },
            { maret: 30 },
            { april: 80 },
            { mei: 28 },
            { juni: 15 },
            { juli: 100 },
            { agustus: 78 },
            { september: 90 },
            { oktober: 14 },
            { november: 80 },
            { desember: 100 },
          ],
        },
        tipe_rujukan: {
          result: [
            {
              januari: [{ spesifik: 5, non_spesifik: 10 }],
            },
            {
              februari: [{ spesifik: 15, non_spesifik: 20 }],
            },
            {
              maret: [{ spesifik: 25, non_spesifik: 30 }],
            },
            {
              april: [{ spesifik: 35, non_spesifik: 40 }],
            },
            {
              mei: [{ spesifik: 11, non_spesifik: 13 }],
            },
            {
              juni: [
                {
                  spesifik: 55,
                  non_spesifik: 100,
                },
              ],
            },
            {
              juli: [{ spesifik: 105, non_spesifik: 110 }],
            },
            {
              agustus: [
                {
                  spesifik: 65,
                  non_spesifik: 160,
                },
              ],
            },
            {
              september: [{ spesifik: 6, non_spesifik: 39 }],
            },
            {
              oktober: [{ spesifik: 54, non_spesifik: 24 }],
            },
            {
              november: [
                {
                  spesifik: 67,
                  non_spesifik: 189,
                },
              ],
            },
            {
              desember: [
                {
                  spesifik: 34,
                  non_spesifik: 122,
                },
              ],
            },
          ],
        },
        analisa_rujukan: {
          result: [
            { dokter: 'Lorem Ipsum 1', jumlah_rrns: 10 },
            { dokter: 'Lorem Ipsum 2', jumlah_rrns: 11 },
            { dokter: 'Lorem Ipsum 3', jumlah_rrns: 90 },
            { dokter: 'Lorem Ipsum 4', jumlah_rrns: 45 },
            { dokter: 'Lorem Ipsum 5', jumlah_rrns: 96 },
            { dokter: 'Lorem Ipsum 6', jumlah_rrns: 13 },
          ],
        },
        biaya_layanan: {
          result: [{ high: 35, medium: 35, low: 30 }],
        },
        komponen_layanan: {
          result: [{ bhp: 77, nmhp: 100, medis: 542 }],
        },
        analisa_biaya_penyakit: {
          result: [
            {
              penyakit: 'Flu',
              jumlah_kasus: 100,
              rata_rata_biaya: 100,
              biaya: 10,
            },
            {
              penyakit: 'Batuk',
              jumlah_kasus: 10,
              rata_rata_biaya: 1000,
              biaya: 6,
            },
            {
              penyakit: 'Demam',
              jumlah_kasus: 20,
              rata_rata_biaya: 900,
              biaya: 20,
            },
            {
              penyakit: 'Pusing',
              jumlah_kasus: 98,
              rata_rata_biaya: 11,
              biaya: 9,
            },
            {
              penyakit: 'Mual',
              jumlah_kasus: 92,
              rata_rata_biaya: 46,
              biaya: 16,
            },
            {
              penyakit: 'AA',
              jumlah_kasus: 91,
              rata_rata_biaya: 11,
              biaya: 11,
            },
          ],
        },
        // kunjungan: {
        //   result: total_kunjungan,
        // },
        // tipe_kunjungan: {
        //   result: tipe_kunjungan,
        // },
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
