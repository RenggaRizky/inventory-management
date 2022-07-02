import express from "express";
import { getBarangKeluar } from "../controllers/barangKeluar.js";

const router = express.Router();

router.get("/", getBarangKeluar);

export default router;
