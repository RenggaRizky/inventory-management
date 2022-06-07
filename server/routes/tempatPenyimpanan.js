import express from "express";
import { getTempatPenyimpanan, postTempatPenyimpanan } from "../controllers/tempatPenyimpanan.js";

const router = express.Router();
router.get("/", getTempatPenyimpanan);
router.post("/tambah-tempat-penyimpanan", postTempatPenyimpanan);

export default router;
