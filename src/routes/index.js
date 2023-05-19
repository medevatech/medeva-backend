const express = require('express');
const router = express.Router();
const pasienControllers = require('./pasien');
const asuransiControllers = require('./asuransi');
const skriningControllers = require('./skrining');
const alergiControllers = require('./alergi');
const alergiPasienControllers = require('./alergiPasien');
const vitalSignsControllers = require('./vitalSigns');
const kunjunganControllers = require('./kunjungan');
const penyakitControllers = require('./penyakit');
const diagnosisControllers = require('./diagnosis');
const tempKunjunganControllers = require('./tempKunjungan');
const pemeriksaanControllers = require('./pemeriksaan');
const pemeriksaanPenunjangControllers = require('./pemeriksaanPenunjang');
const poliControllers = require('./poli');
const rekamMedisControllers = require('./rekamMedis');
const obatControllers = require('./obat');
const daftarTindakanControllers = require('./daftarTindakan');
const tindakanControllers = require('./tindakan');
const resepControllers = require('./resep');
const rujukanControllers = require('./rujukan');
const rsControllers = require('./rs');
const jadwalBukaRSControllers = require('./jadwalBukaRS');
const rsPoliControllers = require('./rsPoli');
const diagnosisRujukanControllers = require('./diagnosisRujukan');
const hargaTindakanControllers = require('./hargaTindakan');
const hargaLayananControllers = require('./hargaLayanan');
const asuransiKelasControllers = require('./asuransiKelas');
const pesertaControllers = require('./peserta');
const layananControllers = require('./layanan');
const daftarLayananControllers = require('./daftarLayanan');

const karyawanRouter = require('./karyawan');
const klinikRouter = require('./klinik');
const divisiRouter = require('./divisi');
const shiftRouter = require('./shift');
const jagaRouter = require('./jaga');
const antrianRouter = require('./antrian');
const laboratoriumRouter = require('./laboratorium');
const layananLaboratoriumRouter = require('./layananLaboratorium');
const jblRouter = require('./jadwalBukaLaboratorium');

router.use('/pasien', pasienControllers);
router.use('/asuransi', asuransiControllers);
router.use('/skrining', skriningControllers);
router.use('/alergi', alergiControllers);
router.use('/alergi-pasien', alergiPasienControllers);
router.use('/vital-signs', vitalSignsControllers);
router.use('/kunjungan', kunjunganControllers);
router.use('/penyakit', penyakitControllers);
router.use('/diagnosis', diagnosisControllers);
router.use('/temp-kunjungan', tempKunjunganControllers);
router.use('/pemeriksaan', pemeriksaanControllers);
router.use('/pemeriksaan-penunjang', pemeriksaanPenunjangControllers);
router.use('/poli', poliControllers);
router.use('/rekam-medis', rekamMedisControllers);
router.use('/obat', obatControllers);
router.use('/daftar-tindakan', daftarTindakanControllers);
router.use('/tindakan', tindakanControllers);
router.use('/resep', resepControllers);
router.use('/rujukan', rujukanControllers);
router.use('/rs', rsControllers);
router.use('/jadwal-buka-rs', jadwalBukaRSControllers);
router.use('/rs-poli', rsPoliControllers);
router.use('/diagnosis-rujukan', diagnosisRujukanControllers);
router.use('/harga-tindakan', hargaTindakanControllers);
router.use('/harga-layanan', hargaLayananControllers);
router.use('/asuransi-kelas', asuransiKelasControllers);
router.use('/peserta', pesertaControllers);
router.use('/layanan', layananControllers);
router.use('/daftar-layanan', daftarLayananControllers);

router.use('/karyawan', karyawanRouter);
router.use('/klinik', klinikRouter);
router.use('/divisi', divisiRouter);
router.use('/shift', shiftRouter);
router.use('/jaga', jagaRouter);
router.use('/antrian', antrianRouter);
router.use('/laboratorium', laboratoriumRouter);
router.use('/layanan-laboratorium', layananLaboratoriumRouter);
router.use('/jbl', jblRouter);

module.exports = router;
