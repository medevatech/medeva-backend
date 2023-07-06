const { response } = require("../middleware/common");
const {
  createDoctorSchedule,
  getDoctorSchedule,
  updateDoctorSchedule,
  archiveDoctorSchedule,
  activateDoctorSchedule,
  deleteDoctorSchedule,
  getDoctorScheduleById,
  getDoctorScheduleByIdDivision,
  getDoctorScheduleByIdDoctor,
} = require("../models/jadwalDokter");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const doctorScheduleController = {
  create: async (req, res, next) => {
    try {
      const date = req.body.date;
      const start_time = req.body.start_time;
      const end_time = req.body.end_time;
      // const tempSt = moment(start_time).format("HH:mm:ss");
      // const tempEt = moment(end_time).format("HH:mm:ss");
      const startTime = date + "T" + start_time + ":00.000";
      const endTime = date + "T" + end_time + ":00.000";
      // const startTime = new Date(`${date} ${start_time}`).toISOString();
      // const endTime = new Date(`${date} ${end_time}`).toISOString();
      // console.log(startTime);
      // console.log(endTime);
      const dateEnd = req.body.date_end;
      const interval = req.body.interval;
      if (dateEnd) {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(date);
        const secondDate = new Date(dateEnd);
        const diffDays = Math.round(
          Math.abs((firstDate - secondDate) / oneDay)
        );
        // console.log(interval);
        // console.log(diffDays);
        var dataArray = [];
        for (let i = 0; i <= diffDays; i += interval) {
          const nextDate = new Date(startTime);
          nextDate.setDate(nextDate.getDate() + i);
          const id = uuidv4();
          const tmpDate = nextDate.toISOString();
          const tmpStartTime =
            moment(tmpDate).format("yyyy-MM-DD") + "T" + start_time + ":00.000";
          const tmpEndTime =
            moment(tmpDate).format("yyyy-MM-DD") + "T" + end_time + ":00.000";
          const data = {
            id: id,
            id_clinic: req.body.id_clinic,
            id_division: req.body.id_division,
            id_doctor: req.body.id_doctor,
            date: tmpDate,
            start_time: tmpStartTime,
            end_time: tmpEndTime,
          };
          dataArray.push(data);
        }
        // console.log(dataArray.length);
        // console.log(dataArray);
        // console.log(dataArray[i]);
        for (let i = 0; i <= dataArray.length; i++) {
          var temp = [
            {
              id: dataArray[i].id,
              id_clinic: dataArray[i].id_clinic,
              id_division: dataArray[i].id_division,
              id_doctor: dataArray[i].id_doctor,
              date: dataArray[i].date,
              start_time: dataArray[i].start_time,
              end_time: dataArray[i].end_time,
            },
          ];
          // console.log("temp", temp);
          await createPracticeSchedule(temp);
          // response(res, 200, true, dataArray, "Create schedule success")
          // res.status(200).json({ message: "Successfully" });
        }
      } else {
        const data = {
          id: uuidv4(),
          id_clinic: req.body.id_clinic,
          id_division: req.body.id_division,
          id_doctor: req.body.id_doctor,
          date: date,
          start_time: startTime,
          end_time: endTime,
        };
        await createDoctorSchedule(data);
        response(res, 200, true, data, "Tambah jadwal dokter berhasil");
      }
    } catch (err) {
      // console.log(err);
      if ((err.message = "Cannot read property 'id' of undefined")) {
        response(res, 200, true, temp, "Tambah jadwal dokter berhasil");
      } else {
        response(res, 400, false, err, "Tambah jadwal dokter gagal");
      }
    }
  },
  get: async (req, res, next) => {
    try {
      const result = await getDoctorSchedule();
      response(res, 200, true, result.rows, "Get jadwal dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get jadwal dokter berhasil");
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getDoctorScheduleById(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal dokter berdasarkan id berhasil"
      );
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get jadwal dokter berdasarkan id gagal");
    }
  },
  getByIdDivision: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getDoctorScheduleByIdDivision(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal dokter berdasarkan id divisi berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get jadwal dokter berdasarkan id divisi gagal"
      );
    }
  },
  getByIdDoctor: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getDoctorScheduleByIdDoctor(id);
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal dokter berdasarkan id dokter berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get jadwal dokter berdasarkan id dokter gagal"
      );
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
      const startTime = date + "T" + start_time + ":00.000";
      const endTime = date + "T" + end_time + ":00.000";
      const id_subtitute = req.body.id_subtitute;
      const data = {
        id,
        id_clinic,
        id_division,
        id_doctor,
        date,
        start_time: startTime,
        end_time: endTime,
        id_subtitute,
      };
      await updateDoctorSchedule(data);
      response(res, 200, true, data, "Edit jadwal dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, "Edit jadwal dokter gagal");
    }
  },
  archive: async (req, res, next) => {
    try {
      const id = req.params.id;
      await archiveDoctorSchedule(id);
      response(res, 200, true, null, "Arsip jadwal dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Arsip jadwal dokter gagal");
    }
  },
  activate: async (req, res, next) => {
    try {
      const id = req.params.id;
      await activateDoctorSchedule(id);
      response(res, 200, true, null, "Aktivasi jadwal dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Aktivasi jadwal dokter gagal");
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoctorSchedule(id);
      response(res, 200, true, null, "Hapus jadwal dokter berhasil");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Hapus jadwal dokter gagal");
    }
  },
};

exports.doctorScheduleController = doctorScheduleController;
