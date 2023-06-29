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
        total_klaim: totalKlaim,
        total_pendapatan: totalPendapatan,
        klaim_berhasil: totalKlaimBerhasil,
        tabel: [
          {
            id: 'd064e1d3-248e-4c93-8fcb-42afb4de6208',
            id_asuransi: '89451d04-bddf-4fc4-9117-1e380bd76533',
            produk: 'VVIP 1',
            id_asuransi_kelas: 'e43e8168-8ee2-492e-bf90-73c5e51b6586',
            asuransi: 'BPJS',
            tipe: 'PPST',
            klaim: 15000,
            pendapatan: 3000,
            kunjungan: 11,
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
            kunjungan: 120,
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
            kunjungan: 30,
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
            kunjungan: 400,
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
            kunjungan: 44,
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
            kunjungan: 34,
          },
        ],
        pagination: pagination,
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
        peserta: 950,
        pendapatan: 257039382,
        total_biaya_layanan: 123131,
        kunjungan: {
          januari: 50,
          februari: 50,
          maret: 100,
          april: 10,
          mei: 10,
          juni: 15,
          juli: 100,
          agustus: 100,
          september: 90,
          oktober: 11,
          november: 150,
          desember: 200,
        },
        tipe_kunjungan: {
          januari: { jalan: 5, inap: 10, promotif: 10, preventif: 10 },
          februari: { jalan: 15, inap: 20, promotif: 30, preventif: 40 },
          maret: { jalan: 25, inap: 30, promotif: 40, preventif: 50 },
          april: { jalan: 35, inap: 40, promotif: 50, preventif: 60 },
          mei: { jalan: 11, inap: 13, promotif: 14, preventif: 11 },
          juni: { jalan: 55, inap: 100, promotif: 110, preventif: 110 },
          juli: { jalan: 15, inap: 11, promotif: 12, preventif: 12 },
          agustus: { jalan: 65, inap: 160, promotif: 190, preventif: 70 },
          september: { jalan: 6, inap: 39, promotif: 45, preventif: 67 },
          oktober: { jalan: 54, inap: 24, promotif: 45, preventif: 12 },
          november: { jalan: 67, inap: 189, promotif: 11, preventif: 15 },
          desember: { jalan: 34, inap: 122, promotif: 12, preventif: 19 },
        },
        total_rujukan: {
          januari: 10,
          februari: 22,
          maret: 30,
          april: 80,
          mei: 28,
          juni: 15,
          juli: 100,
          agustus: 78,
          september: 90,
          oktober: 14,
          november: 80,
          desember: 100,
        },
        tipe_rujukan: {
          januari: { spesialistik: 5, non_spesialistik: 10 },
          februari: { spesialistik: 15, non_spesialistik: 20 },
          maret: { spesialistik: 25, non_spesialistik: 30 },
          april: { spesialistik: 35, non_spesialistik: 40 },
          mei: { spesialistik: 11, non_spesialistik: 13 },
          juni: {
            spesialistik: 55,
            non_spesialistik: 100,
          },
          juli: { spesialistik: 105, non_spesialistik: 110 },
          agustus: {
            spesialistik: 65,
            non_spesialistik: 160,
          },
          september: { spesialistik: 6, non_spesialistik: 39 },
          oktober: { spesialistik: 54, non_spesialistik: 24 },
          november: {
            spesialistik: 67,
            non_spesialistik: 189,
          },
          desember: {
            spesialistik: 34,
            non_spesialistik: 122,
          },
        },
        analisa_rujukan: [
          { id: '123', dokter: 'Lorem Ipsum 1', jumlah_rrns: 10 },
          { id: '234', dokter: 'Lorem Ipsum 2', jumlah_rrns: 11 },
          { id: '567', dokter: 'Lorem Ipsum 3', jumlah_rrns: 90 },
          { id: '891', dokter: 'Lorem Ipsum 4', jumlah_rrns: 45 },
          { id: '456', dokter: 'Lorem Ipsum 5', jumlah_rrns: 96 },
          { id: '876', dokter: 'Lorem Ipsum 6', jumlah_rrns: 13 },
        ],
        pagination_ar: {
          currentPage: 1,
          limit: 10,
          totalData: 6,
          totalPage: 1,
        },
        biaya_layanan: { high: 35, medium: 35, low: 30 },

        komponen_layanan: { bhp: 44, bnmhp: 41, jasa_medis: 125 },
        analisa_biaya_penyakit: [
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
        pagination_ab: {
          currentPage: 1,
          limit: 10,
          totalData: 6,
          totalPage: 1,
        },
      };
      // kunjungan: {
      //   result: total_kunjungan,
      // },
      // tipe_kunjungan: {
      //   result: tipe_kunjungan,
      // },

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
  getAS03AnalisaRujukan: async (req, res) => {
    try {
      // const id_asuransi = req.query.id_asuransi || '';

      //   GENERATE RESULT   //
      const result = [
        {
          id: '111',
          tanggal: '2023-06-28',
          diagnosis: 'Sakit kepala',
          alasan: 'Kurang tidur',
        },
        {
          id: '112',
          tanggal: '2023-12-01',
          diagnosis: 'Sakit gigi',
          alasan: 'Kebanyakan makan manis',
        },
        {
          id: '113',
          tanggal: '2023-07-08',
          diagnosis: 'Sakit demam',
          alasan: 'Cuaca tidak menentu',
        },
        {
          id: '114',
          tanggal: '2023-04-29',
          diagnosis: 'Batuk',
          alasan: 'Minum es',
        },
        {
          id: '115',
          tanggal: '2023-04-11',
          diagnosis: 'Flu',
          alasan: 'Minum es',
        },
        {
          id: '116',
          tanggal: '2023-03-18',
          diagnosis: 'Sakit gigi',
          alasan: 'Kebanyakan makan manis',
        },
      ];

      const pagination = {
        currentPage: 1,
        limit: 10,
        totalData: 6,
        totalPage: 1,
      };

      response(
        res,
        200,
        true,
        result,
        'get dashboard a-03 success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get dashboard a-03 failed');
    }
  },
  getAS04: async (req, res) => {
    try {
      //   GENERATE RESULT   //
      const result = {
        total_pendapatan: 950,
        total_kunjunagan: {
          januari: 30,
          februari: 20,
          maret: 11,
          april: 18,
          mei: 21,
          juni: 51,
          juli: 40,
          agustus: 149,
          september: 30,
          oktober: 130,
          november: 250,
          desember: 210,
        },

        total_klaim: 9401245673,
        total_klaim_ditolak: 23428934,
        junlah_anggota: 12453,
        status_klaim: {
          ditolak: 25,
          diterima: 25,
          dipertimbangkan: 50,
        },
        alasan_penolakan: {
          berkas_tidak_lengkap: 10,
          penanganan_tidak_tepat: 22,
          diagnosa_tidak_tepat: 30,
          tidak_ditanggung: 22,
          lainnya: 10,
        },
        layanan_terklaim: {
          tambal_gigi: 101213213,
          penanganan_luka: 1000,
          suntik_vitamin: 22122455,
        },
        biaya_layanan: {
          low: 23,
          medium: 17,
          high: 60,
        },
        komponen_layanan: { bhp: 12, bnmhp: 45, jasa_medis: 134 },
        analisa_unit_cost: [
          {
            id: '123',
            layanan: 'Layanan ZYX',
            harga_jual: 124232335,
            unit_cost: 3241310,
            persen_unit_cost: 35,
          },
          {
            id: '345',
            layanan: 'Layanan ABC',
            harga_jual: 341314,
            unit_cost: 458223,
            persen_unit_cost: 12,
          },
          {
            id: '456',
            layanan: 'Layanan UUU',
            harga_jual: 121312313,
            unit_cost: 123414112,
            persen_unit_cost: 34,
          },
          {
            id: '994',
            layanan: 'Layanan QWERTY',
            harga_jual: 34141123,
            unit_cost: 111111,
            persen_unit_cost: 11,
          },
        ],
        pagination: {
          currentPage: 1,
          limit: 10,
          totalData: 4,
          totalPage: 1,
        },
      };

      response(res, 200, true, result, 'get dashboard a-03 success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get dashboard a-03 failed');
    }
  },
};

exports.dashboardController = dashboardController;
