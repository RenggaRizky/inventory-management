import express from "express";
import { getProduk } from "../controllers/produk.js";

const router = express.Router();

router.get("/", getProduk);

export default router;
