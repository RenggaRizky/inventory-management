import express from "express";
import { getBarangKeluar, getBarangKeluarHariIni, postLaporanBarangKeluar } from "../controllers/barangKeluar.js";

const router = express.Router();

router.get("/", getBarangKeluar);
router.get("/hari-ini", getBarangKeluarHariIni);
router.post("/laporan", postLaporanBarangKeluar);

export default router;
