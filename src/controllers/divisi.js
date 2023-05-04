const { response } = require('../middleware/common');
const {
  createDivisi,
  findDivisi,
  countDivisi,
  getDivisi,
  getDivisiById,
  updateDivisi,
  deleteDivisi,
} = require('../models/divisi');

const divisiController = {
  create: async (req, res, next) => {
    let {
      rows: [divisi],
    } = await findDivisi(req.body.tipe);
    if (divisi) {
      response(res, 400, false, null, 'Name of division is already used');
    }
    try {
      let digits = '0123456789';
      let id = 'DVS';
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        id_klinik: req.body.id_klinik,
        tipe: req.body.tipe,
      };
      await createDivisi(data);
      response(res, 200, true, data, 'Create division success');
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, 'Create division failed');
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'tipe';
      const sortOrder = req.query.sortOrder || 'desc';
      const searchName = req.query.searchName || '';

      const offset = (page - 1) * limit;
      const result = await getDivisi({
        searchName,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countDivisi();
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
        'Get division data success',
        pagination
      );
    } catch (err) {
      console.log('Get division data error', err);
      response(res, 400, false, null, 'Get division data failed');
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getDivisiById(req.params.id);
      response(res, 200, true, result.rows, 'Get division data by ID success');
    } catch (err) {
      console.log('Get division data by ID error', err);
      response(res, 400, false, err, 'Get division data by ID failed');
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.body.id;
      const id_klinik = req.body.id_klinik;
      const tipe = req.body.tipe;
      const data = {
        id,
        id_klinik,
        tipe,
      };
      await updateDivisi(data);
      response(res, 200, true, data, 'Update division data success');
    } catch (err) {
      console.log('Update division data error', err);
      response(res, 400, false, 'Update division data failed');
    }
  },

  delete: async (req, res, next) => {
    try {
      await deleteDivisi(req.params.id);
      response(res, 200, true, null, 'Delete division success');
    } catch (err) {
      console.log('Delete division error', err);
      response(res, 400, false, err, 'Delete division failed');
    }
  },
};

exports.divisiController = divisiController;
