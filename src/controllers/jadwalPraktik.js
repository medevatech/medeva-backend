const { response } = require("../middleware/common");
const {
  createPracticeSchedule,
  getPracticeSchedule,
} = require("../models/jadwalPraktik");
const { v4: uuidv4 } = require("uuid");

const practiceScheduleController = {
  create: async (req, res, next) => {
    try {
      const data = {
        id: uuidv4(),
        id_clinic: req.body.id_clinic,
        id_division: req.body.id_division,
        id_doctor: req.body.id_doctor,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
      };
      await createPracticeSchedule(data);
      response(res, 200, true, data, "Create schedule success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create schedule failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getPracticeSchedule();
      response(res, 200, true, result.rows, "Get jadwal praktik success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get jadwal praktik failed");
    }
  },
};

exports.practiceScheduleController = practiceScheduleController;
