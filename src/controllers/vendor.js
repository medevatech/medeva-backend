const { response } = require(`../middleware/common`);
const {
  insertVendor,
  allVendor,
  countAllVendor,
  getVendorByIdVendor,
  findVendorByIdVendor,
  editVendor,
  editVendorActivate,
  editVendorArchive,
  deleteVendor,
} = require(`../models/Vendor.js`);
const { v4: uuidv4 } = require('uuid');

const vendorControllers = {
  add: async (req, res, next) => {
    try {
      let data = {
        id: uuidv4(),
        nama: req.body.nama,
        telepon: req.body.telepon,
        whatsapp: req.body.whatsapp,
        website: req.body.website,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        email: req.body.email,
        alamat: req.body.alamat,
        is_active: 1,
      };

      let isError = false;

      for (let [key, value] of Object.entries(data)) {
        if (key === 'nama' && value === '') {
          isError = true;
          response(res, 404, false, null, `Parameter ${key} wajib diisi`);
        }
      }

      if (isError === false) {
        await insertVendor(data);
        response(res, 200, true, data, 'insert vendor success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert vendor failed');
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

      const result = await allVendor({
        search,
        searchStatus,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllVendor(search, searchStatus);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get vendor success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get vendor failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await getVendorByIdVendor({
        id,
      });

      const {
        rows: [findVendor],
      } = await findVendorByIdVendor(id);

      if (findVendor) {
        response(res, 200, true, result.rows, 'get vendor success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get vendor failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVendor],
      } = await findVendorByIdVendor(id);

      if (findVendor) {
        let data = {
          id,
          nama: req.body.nama,
          telepon: req.body.telepon,
          whatsapp: req.body.whatsapp,
          website: req.body.website,
          instagram: req.body.instagram,
          facebook: req.body.facebook,
          email: req.body.email,
          alamat: req.body.alamat,
          is_active: 1,
        };

        await editVendor(data);
        response(res, 200, true, data, 'edit vendor success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit vendor failed');
    }
  },
  editActivate: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVendor],
      } = await findVendorByIdVendor(id);

      if (findVendor) {
        let data = {
          id,
          is_active: 1,
        };

        await editVendorActivate(data);
        response(res, 200, true, data, 'activate vendor success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'activate vendor failed');
    }
  },
  editArchive: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVendor],
      } = await findVendorByIdVendor(id);

      if (findVendor) {
        let data = {
          id,
          is_active: 0,
        };

        await editVendorArchive(data);
        response(res, 200, true, data, 'archive vendor success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'archive vendor failed');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [findVendor],
      } = await findVendorByIdVendor(id);

      if (findVendor) {
        let data = {
          id,
        };

        await deleteVendor(data);
        response(res, 200, true, data, 'delete vendor success');
      } else {
        return response(
          res,
          404,
          false,
          null,
          `id vendor (${id}) not found, check again`
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete vendor failed');
    }
  },
};

exports.vendorControllers = vendorControllers;
