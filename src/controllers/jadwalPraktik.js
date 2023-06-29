const { response } = require("../middleware/common");
const {
  createPracticeSchedule,
  getPracticeSchedule,
  updatePracticeSchedule,
  archivePracticeSchedule,
  activatePracticeSchedule,
  deletePracticeSchedule,
  getPracticeScheduleById,
} = require("../models/jadwalPraktik");
const { v4: uuidv4 } = require("uuid");

const practiceScheduleController = {
  create: async (req, res, next) => {
    try {
      const date = req.body.date;
      const start_time = req.body.start_time;
      const end_time = req.body.end_time;
      // const tempSt = moment(start_time).format("HH:mm:ss");
      // const tempEt = moment(end_time).format("HH:mm:ss");
      const startTime = date + "T" + start_time + ":00.000";
      const endTime = date + "T" + end_time + ":00.000";
      const data = {
        id: uuidv4(),
        id_clinic: req.body.id_clinic,
        id_division: req.body.id_division,
        id_doctor: req.body.id_doctor,
        date: req.body.date,
        start_time: startTime,
        end_time: endTime,
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
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getPracticeScheduleById(id);
      response(res, 200, true, result.rows, "Get jadwal praktik by id success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get jadwal praktik by id failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const id_clinic = req.body.id_clinic;
      const id_division = req.body.id_division;
      const id_doctor = req.body.id_doctor;
      const date = req.body.date;
      const start_time = req.body.start_time;
      const end_time = req.body.end_time;
      const data = {
        id,
        id_clinic,
        id_division,
        id_doctor,
        date,
        start_time,
        end_time,
      };
      await updatePracticeSchedule(data);
      response(res, 200, true, data, "Update practice schedule success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, "Update practice schedule failed");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archivePracticeSchedule(id);
      response(res, 200, true, null, "Archive practice schedule success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Archive practice schedule failed");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activatePracticeSchedule(id);
      response(res, 200, true, null, "Activate practice schedule success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Activate practice schedule failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      await deletePracticeSchedule(id);
      response(res, 200, true, null, "Delete practice schedule success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Delete practice schedule failed");
    }
  },
};

exports.practiceScheduleController = practiceScheduleController;
