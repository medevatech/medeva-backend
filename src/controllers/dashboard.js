const { response } = require('../middleware/common');
const { getFFS, getPPS } = require('../models/dashboard.js');
const { v4: uuidv4 } = require('uuid');

const dashboardController = {
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const queryFFS = await getFFS();

      const queryPPS = await getPPS();

      const result = queryFFS + queryPPS;

      console.log(queryFFS);

      const resultt = {
        total_klaim: { ffs: queryFFS.rows[0], pps: queryFFS.rows[0] },
      };

      response(res, 200, true, resultt, 'get daftar tindakan success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get daftar tindakan failed');
    }
  },
};

exports.dashboardController = dashboardController;
