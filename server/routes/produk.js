import express from "express";
import { getProduk, getInfoProduk, postProduk, patchProduk, deleteProduk } from "../controllers/produk.js";

const router = express.Router();

router.get("/", getProduk);
router.get("/:id", getInfoProduk);
router.post("/tambah-produk", postProduk);
router.patch("/:id", patchProduk);
router.delete("/:id", deleteProduk);

export default router;
