import express from "express";
import { getBarangMasuk, getBarangMasukHariIni, postLaporanBarangMasuk } from "../controllers/barangMasuk.js";

const router = express.Router();

router.get("/", getBarangMasuk);
router.get("/hari-ini", getBarangMasukHariIni);
router.post("/laporan", postLaporanBarangMasuk);

export default router;
