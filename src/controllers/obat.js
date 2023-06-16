const { response } = require(`../middleware/common`);
const {
  insertObat,
  allObat,
  countAllObat,
  getObatByIdObat,
  findObatByIdObat,
  editObat,
  editObatActiveArchive,
  deleteObat,
} = require(`../models/obat`);
const { v4: uuidv4 } = require('uuid');

const obatControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        golongan: req.body.golongan,
        kategori: req.body.kategori,
        dosis: req.body.dosis,
        satuan_dosis: req.body.satuan_dosis,
        satuan: req.body.satuan,
        jual_per: req.body.jual_per,
        produsen: req.body.produsen,
        deskripsi: req.body.deskripsi,
        indikasi: req.body.indikasi,
        is_active: 1,
      };

      await insertObat(data);
      response(res, 200, true, data, 'insert obat success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert obat failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const searchStatus = req.query.searchStatus || '';
      const offset = (page - 1) * limit;

      const result = await allObat({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllObat(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get obat success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get obat failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getObatByIdObat({
        id,
      });

      const {
        rows: [findObat],
      } = await findObatByIdObat(id);

      if (findObat) {
        response(res, 200, true, result.rows, 'get obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get obat failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findObat],
      } = await findObatByIdObat(id);

      if (findObat) {
        let data = {
          id,
          nama: req.body.nama,
          golongan: req.body.golongan,
          kategori: req.body.kategori,
          dosis: req.body.dosis,
          satuan_dosis: req.body.satuan_dosis,
          satuan: req.body.satuan,
          jual_per: req.body.jual_per,
          produsen: req.body.produsen,
          deskripsi: req.body.deskripsi,
          indikasi: req.body.indikasi,
          is_active: 1,
        };

        await editObat(data);
        response(res, 200, true, data, 'edit obat success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id obat not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit obat failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findObat],
      } = await findObatByIdObat(id);

      if (findObat) {
        let data = {
          id,
          is_active: 1,
        };

        await editObatActiveArchive(data);
        response(res, 200, true, data, 'activate obat success');
      } else {
        return response(res, 200, [], null, `id obat not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'active obat failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findObat],
      } = await findObatByIdObat(id);

      if (findObat) {
        let data = {
          id,
          is_active: 0,
        };

        await editObatActiveArchive(data);
        response(res, 200, true, data, 'archive obat success');
      } else {
        return response(res, 200, [], null, `id obat not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive obat failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      let id = req.params.id;

      const {
        rows: [findObat],
      } = await findObatByIdObat(id);

      if (findObat) {
        let data = {
          id,
        };

        await deleteObat(data);
        response(res, 200, true, data, 'delete obat success');
      } else {
        return response(res, 200, [], null, `id obat not found, check again`);
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete obat failed');
    }
  },
};

exports.obatControllers = obatControllers;
