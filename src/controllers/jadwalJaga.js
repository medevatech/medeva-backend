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
  getDistinctSchedule,
  countScheduleDistinct,
  getScheduleToday,
} = require("../models/jadwalJaga");
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
          var temp = {
            id: dataArray[i].id,
            id_clinic: dataArray[i].id_clinic,
            id_division: dataArray[i].id_division,
            id_doctor: dataArray[i].id_doctor,
            date: dataArray[i].date,
            start_time: dataArray[i].start_time,
            end_time: dataArray[i].end_time,
          };
          // console.log("temp", temp);
          await createDoctorSchedule(temp);
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
        console.log(data);
        await createDoctorSchedule(data);
        response(res, 200, true, data, "Tambah jadwal dokter berhasil");
      }
    } catch (err) {
      console.log(err);
      if (err.message === "Cannot read property 'id' of undefined") {
        response(res, 200, true, dataArray, "Tambah jadwal dokter berhasil");
      } else if (err.message !== "Cannot read property 'id' of undefined") {
        response(res, 400, false, err, "Tambah jadwal dokter gagal");
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
  getDistinct: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "id_divisi";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const searchClinic = req.query.searchKlinik || "";
      // const searchStatus = req.query.searchStatus || '';
      // const searchDivisi = req.query.searchDivisi || "";
      const offset = (page - 1) * limit;
      const result = await getDistinctSchedule({
        search,
        searchClinic,
        // searchStatus,
        // searchDivisi,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      const {
        rows: [count],
      } = await countScheduleDistinct({ search, searchClinic });
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
        "Get distinct schedule success",
        pagination
      );
    } catch (err) {
      console.log("err", err);
      response(res, 400, false, null, "Get distinct schedule error");
    }
  },
  getToday: async (req, res, next) => {
    try {
      const id = req.params.id;
      const today = new Date().toISOString().substr(0, 10);
      const day = req.query.day || today;
      console.log(day);
      // const tempDay = moment(day).format("yyyy-MM-DD");
      const result = await getScheduleToday({
        id: id,
        day: day,
      });
      response(
        res,
        200,
        true,
        result.rows,
        "Get jadwal jaga berdasarkan id divisi dan tanggal berhasil"
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        400,
        false,
        null,
        "Get jadwal jaga berdasarkan id divisi dan tanggal gagal"
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
