import express from "express";
import { getInfoStokBarang, getStokBarang, postFilterStokBarang, patchStokBarangMasuk, patchStokBarangKeluar, patchStokProsesRetur } from "../controllers/stok.js";

const router = express.Router();

router.get("/", getStokBarang);
router.get("/:id", getInfoStokBarang);
router.post("/filter", postFilterStokBarang);
// router.patch("/:id", patchStokBarang);
router.patch("/proses-retur/:id", patchStokProsesRetur);
router.patch("/barang-masuk/:id", patchStokBarangMasuk);
router.patch("/barang-keluar/:id", patchStokBarangKeluar);

export default router;
