import express from "express";
import { getProduk, postProduk } from "../controllers/produk.js";

const router = express.Router();

router.get("/", getProduk);
router.post("/", postProduk);

export default router;
