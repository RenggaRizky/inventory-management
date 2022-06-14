import express from "express";
import { getBarangRetur, getInfoBarangRetur, postBarangRetur, deleteBarangRetur, patchBarangRetur } from "../controllers/barangRetur.js";

const router = express.Router();

router.get("/", getBarangRetur);
router.get("/:id", getInfoBarangRetur);
router.post("/tambah-barang-retur", postBarangRetur);
router.patch("/:id", patchBarangRetur);
router.delete("/:id", deleteBarangRetur);

export default router;
