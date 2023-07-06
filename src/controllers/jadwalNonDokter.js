const { response } = require("../middleware/common");
const {
  createNonDoctorSchedule,
  getNonDoctorSchedule,
  getNonDoctorScheduleById,
  getNonDoctorScheduleByIdDivision,
  getNonDoctorScheduleByIdEmployee,
  updateNonDoctorSchedule,
  archiveNonDoctorSchedule,
  activateNonDoctorSchedule,
  deleteNonDoctorSchedule,
} = require("../models/jadwalNonDokter");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const nonDoctorController = {
  create: async (req, res, next) => {
    try {
      const id = uuidv4();
      const id_doctor_schedule = req.body.id_doctor_schedule;
      const id_employee = req.body.id_employee;
      // const diff_days = req.body.diff_days;
      // const interval = req.body.interval;
      // const id_subtitute = req.body.id_pengganti
      const data = {
        id: id,
        id_doctor_schedule: id_doctor_schedule,
        id_employee: id_employee,
      };
      await createNonDoctorSchedule(data);
      response(res, 200, true, data, "Tambah jadwal non dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Tambah jadwal non dokter gagal");
    }
  },
};

exports.nonDoctorController = nonDoctorController;
