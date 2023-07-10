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
  getNonDoctorScheduleByIdDoctorSchedule,
} = require("../models/shift");
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
  get: async (req, res, next) => {
    try {
      const result = await getNonDoctorSchedule();
      response(res, 200, true, result.rows, "Get jadwal non dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Get jadwal non dokter gagal");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getNonDoctorScheduleById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal non dokter berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        err,
        "Get jadwal non dokter berdasarkan id gagal"
      );
    }
  },
  getByIdDivision: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getNonDoctorScheduleByIdDivision(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal non dokter berdasarkan id divisi berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        err,
        "Get jadwal non dokter berdasarkan id divisi gagal"
      );
    }
  },
  getByIdEmployee: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getNonDoctorScheduleByIdEmployee(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal non dokter berdasarkan id karyawan berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        err,
        "Get jadwal non dokter berdasarkan id karyawan gagal"
      );
    }
  },
  getByIdDoctorSchedule: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getNonDoctorScheduleByIdDoctorSchedule(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal non dokter berdasarkan id jadwal jaga berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        err,
        "Get jadwal non dokter berdasarkan id jadwal jaga gagal"
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { id_doctor_schedule, id_employee } = req.body;
      const data = {
        id: id,
        id_doctor_schedule: id_doctor_schedule,
        id_employee: id_employee,
      };
      await updateNonDoctorSchedule(data);
      response(res, 200, true, data, "Edit jadwal non dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Edit jadwal non dokter gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveNonDoctorSchedule(id);
      response(res, 200, true, [], "Arsip jadwal non dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Arsip jadwal non dokter gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateNonDoctorSchedule(id);
      response(res, 200, true, [], "Aktivasi jadwal non dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Aktivasi jadwal non dokter gagal");
    }
  },
};

exports.nonDoctorController = nonDoctorController;
