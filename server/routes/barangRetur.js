import express from "express";
import { getBarangRetur, getInfoBarangRetur, postBarangRetur, deleteBarangRetur } from "../controllers/barangRetur.js";

const router = express.Router();

router.get("/", getBarangRetur);
router.get("/:id", getInfoBarangRetur);
router.post("/tambah-barang-retur", postBarangRetur);
router.delete("/:id", deleteBarangRetur);

export default router;
