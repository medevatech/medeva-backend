const { response } = require('../middleware/common');
const {
  getPemeriksaanPenunjang,
  getResep,
  getLayanan,
  getRujukan,
  findTataLaksanaByIdPasien,
  updateStatusPemeriksaanPenunjangByIdPasien,
  updateStatusResepByIdPasien,
  updateStatusLayananByIdPasien,
  updateStatusRujukanByIdPasien,
} = require('../models/tataLaksana.js');

const tataLaksanaController = {
  getByIdPasien: async (req, res) => {
    try {
      const id_pasien = req.params.id_pasien;

      let queryPemeriksaanPenunjang = await getPemeriksaanPenunjang({
        id_pasien,
      });
      let queryResep = await getResep({ id_pasien });
      let queryLayanan = await getLayanan({ id_pasien });
      let queryRujukan = await getRujukan({ id_pasien });

      queryPemeriksaanPenunjang = queryPemeriksaanPenunjang.rows;
      queryResep = queryResep.rows;
      queryLayanan = queryLayanan.rows;
      queryRujukan = queryRujukan.rows;

      const result = {
        pemeriksaan_penunjang: { result: queryPemeriksaanPenunjang },
        resep: { result: queryResep },
        layanan: { result: queryLayanan },
        rujukan: {
          result: queryRujukan,
        },
      };

      const {
        rows: [findTataLaksana],
      } = await findTataLaksanaByIdPasien({ id_pasien });

      console.log(queryPemeriksaanPenunjang);
      if (findTataLaksana) {
        response(res, 200, true, result, 'get tata laksana success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar tindakan failed');
    }
  },
  editStatusByIdPasien: async (req, res, next) => {
    try {
      const id_pasien = req.params.id_pasien;

      const {
        rows: [findTataLaksana],
      } = await findTataLaksanaByIdPasien({ id_pasien });

      if (findTataLaksana) {
        let data = {
          id_pasien,
          status: req.body.status,
        };

        await updateStatusPemeriksaanPenunjangByIdPasien(data);
        await updateStatusResepByIdPasien(data);
        await updateStatusLayananByIdPasien(data);
        await updateStatusRujukanByIdPasien(data);
        response(res, 200, true, data, 'edit tata laksana success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id_pasien not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit tata laksana failed');
    }
  },
};

exports.tataLaksanaController = tataLaksanaController;
