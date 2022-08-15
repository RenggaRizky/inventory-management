import express from "express";
import { getProduk, getInfoProduk, postProduk, patchProduk, deleteProduk, postFilterProduk } from "../controllers/produk.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProduk);
router.get("/:id", getInfoProduk);
router.post("/tambah-produk", postProduk);
router.post("/filter", postFilterProduk);
router.patch("/:id", patchProduk);
router.delete("/:id", deleteProduk);

export default router;
