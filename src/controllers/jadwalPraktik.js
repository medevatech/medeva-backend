const { response } = require("../middleware/common");
const { createPracticeSchedule } = require("../models/jadwalPraktik");
const { v4: uuidv4 } = require("uuid");

const practiceScheduleController = {
  create: async (req, res, next) => {
    try {
      const data = {
        id: uuidv4(),
        id_clinic: req.body.id_clinic,
        id_division: req.body.id_division,
        id_employee: req.body.id_employee,
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
};

exports.practiceScheduleController = practiceScheduleController;
