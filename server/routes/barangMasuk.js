import express from "express";
import { getBarangMasuk } from "../controllers/barangMasuk.js";

const router = express.Router();

router.get("/", getBarangMasuk);

export default router;
