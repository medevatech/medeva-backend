const express = require("express");
const router = express.Router();

const pasienRouter = require("./pasien");
const asuransiRouter = require("./asuransi");
const skriningRouter = require("./skrining");
const alergiRouter = require("./alergi");
const alergiPasienRouter = require("./alergiPasien");
const vitalSignsRouter = require("./vitalSigns");
const kunjunganRouter = require("./kunjungan");
const penyakitRouter = require("./penyakit");
const diagnosisRouter = require("./diagnosis");
const tempKunjunganRouter = require("./tempKunjungan");
const pemeriksaanRouter = require("./pemeriksaan");
const pemeriksaanPenunjangRouter = require("./pemeriksaanPenunjang");
const poliRouter = require("./poli");
const rekamMedisRouter = require("./rekamMedis");
const obatRouter = require("./obat");
const daftarTindakanRouter = require("./daftarTindakan");
const tindakanRouter = require("./tindakan");
const resepRouter = require("./resep");
const rsRouter = require("./rs");
const rujukanRouter = require("./rujukan");
const jadwalBukaRSRouter = require("./jadwalBukaRS");
const rsPoliRouter = require("./rsPoli");
const diagnosisRujukanRouter = require("./diagnosisRujukan");
const hargaTindakanRouter = require("./hargaTindakan");
const daftarLayananRouter = require("./daftarLayanan");
const hargaLayananRouter = require("./hargaLayanan");
const asuransiKelasRouter = require("./asuransiKelas");
const pesertaRouter = require("./peserta");
const layananRouter = require("./layanan.js");
const kerjasamaRouter = require("./kerjasama");
const dashboardRouter = require("./dashboard.js");
const tataLaksanaRouter = require("./tataLaksana.js");
const klinikObatRouter = require("./klinikObat.js");
const klinikBHPRouter = require("./klinikBHP.js");
const klinikLayananRouter = require("./klinikLayanan.js");
const layananBHPRouter = require("./layananBHP.js");
const klinikPaketRouter = require("./klinikPaket.js");
const paketBHPRouter = require("./paketBHP.js");
const vendorRouter = require("./vendor.js");
const klinikPasienRouter = require("./klinikPasien.js");
const purchaseRouter = require("./purchase.js");

const karyawanRouter = require("./karyawan");
const klinikRouter = require("./klinik");
const divisiRouter = require("./divisi");
const shiftRouter = require("./shift");
const jagaRouter = require("./jadwalJaga");
const antrianRouter = require("./antrian");
const laboratoriumRouter = require("./laboratorium");
const layananLaboratoriumRouter = require("./layananLaboratorium");
const jblRouter = require("./jadwalBukaLaboratorium");

const contractRouter = require("./kontrak");

router.use("/pasien", pasienRouter);
router.use("/asuransi", asuransiRouter);
router.use("/skrining", skriningRouter);
router.use("/alergi", alergiRouter);
router.use("/alergi-pasien", alergiPasienRouter);
router.use("/vital-signs", vitalSignsRouter);
router.use("/kunjungan", kunjunganRouter);
router.use("/penyakit", penyakitRouter);
router.use("/diagnosis", diagnosisRouter);
router.use("/temp-kunjungan", tempKunjunganRouter);
router.use("/pemeriksaan", pemeriksaanRouter);
router.use("/pemeriksaan-penunjang", pemeriksaanPenunjangRouter);
router.use("/poli", poliRouter);
router.use("/rekam-medis", rekamMedisRouter);
router.use("/obat", obatRouter);
router.use("/daftar-tindakan", daftarTindakanRouter);
router.use("/tindakan", tindakanRouter);
router.use("/resep", resepRouter);
router.use("/rs", rsRouter);
router.use("/rujukan", rujukanRouter);
router.use("/jadwal-buka-rs", jadwalBukaRSRouter);
router.use("/rs-poli", rsPoliRouter);
router.use("/diagnosis-rujukan", diagnosisRujukanRouter);
router.use("/harga-tindakan", hargaTindakanRouter);
router.use("/daftar-layanan", daftarLayananRouter);
router.use("/harga-layanan", hargaLayananRouter);
router.use("/asuransi-kelas", asuransiKelasRouter);
router.use("/peserta", pesertaRouter);
router.use("/layanan", layananRouter);
router.use("/kerjasama", kerjasamaRouter);
router.use("/dashboard", dashboardRouter);
router.use("/tata-laksana", tataLaksanaRouter);
router.use("/klinik-obat", klinikObatRouter);
router.use("/klinik-bhp", klinikBHPRouter);
router.use("/klinik-layanan", klinikLayananRouter);
router.use("/layanan-bhp", layananBHPRouter);
router.use("/klinik-paket", klinikPaketRouter);
router.use("/paket-bhp", paketBHPRouter);
router.use("/vendor", vendorRouter);
router.use("/klinik-pasien", klinikPasienRouter);
router.use("/purchase", purchaseRouter);

router.use("/karyawan", karyawanRouter);
router.use("/klinik", klinikRouter);
router.use("/divisi", divisiRouter);
router.use("/shift", shiftRouter);
router.use("/antrian", antrianRouter);
router.use("/laboratorium", laboratoriumRouter);
router.use("/layanan-laboratorium", layananLaboratoriumRouter);
router.use("/jbl", jblRouter);

router.use("/jadwal-dokter", jagaRouter);
router.use("/kontrak", contractRouter);

module.exports = router;
