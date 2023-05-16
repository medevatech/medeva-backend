const { response } = require(`../middleware/common`);
const {
  insertHargaTindakan,
  allHargaTindakan,
  countAllHargaTindakan,
  getHargaTindakanById,
  findHargaTindakanById,
  editHargaTindakan,
  getHargaTindakanByIdKlinik,
  findHargaTindakanByIdKlinik,
} = require(`../models/hargaTindakan`);
const { v4: uuidv4 } = require('uuid');

const hargaTindakanControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        id_klinik: req.body.id_klinik,
        id_daftar_tindakan: req.body.id_daftar_tindakan,
        harga: req.body.harga,
      };

      await insertHargaTindakan(data);
      response(res, 200, true, data, 'insert harga tindakan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert harga tindakan failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allHargaTindakan({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllHargaTindakan();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        result.rows,
        'get harga tindakan success',
        pagination
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get harga tindakan failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getHargaTindakanById({
        id,
      });

      const {
        rows: [findHargaTindakan],
      } = await findHargaTindakanById(id);

      if (findHargaTindakan) {
        response(res, 200, true, result.rows, 'get harga tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get harga tindakan failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findHargaTindakan],
      } = await findHargaTindakanById(id);

      if (findHargaTindakan) {
        let data = {
          id,
          id_klinik: req.body.id_klinik,
          id_daftar_tindakan: req.body.id_daftar_tindakan,
          harga: req.body.harga,
        };

        await editHargaTindakan(data);
        response(res, 200, true, data, 'edit harga tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id harga tindakan not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit harga tindakan failed');
    }
  },
  getByIdKlinik: async (req, res) => {
    try {
      const id_klinik = req.params.id_klinik;

      const result = await getHargaTindakanByIdKlinik({
        id_klinik,
      });

      const {
        rows: [findHargaTindakanKlinik],
      } = await findHargaTindakanByIdKlinik(id_klinik);

      if (findHargaTindakanKlinik) {
        response(res, 200, true, result.rows, 'get harga tindakan success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id klinik not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get harga tindakan failed');
    }
  },
};

exports.hargaTindakanControllers = hargaTindakanControllers;