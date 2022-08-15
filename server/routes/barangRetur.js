import express from "express";
import {
    getBarangRetur,
    getInfoBarangRetur,
    getStatusBarangRetur,
    postBarangRetur,
    postLaporanBarangRetur,
    deleteBarangRetur,
    patchBarangRetur,
    patchStatusBarangRetur,
    patchMasukanReturKeRak,
    getBarangReturHariIni,
} from "../controllers/barangRetur.js";

const router = express.Router();

router.get("/", getBarangRetur);
router.get("/:id", getInfoBarangRetur);
router.get("/status-retur/:id", getStatusBarangRetur);
router.get("/hari-ini", getBarangReturHariIni);
router.post("/tambah-barang-retur", postBarangRetur);
router.post("/laporan", postLaporanBarangRetur);
router.patch("/:id", patchBarangRetur);
router.patch("/edit-status-retur/:id", patchStatusBarangRetur);
router.patch("/masuk-retur-ke-rak/:id", patchMasukanReturKeRak);
router.delete("/:id", deleteBarangRetur);

export default router;
