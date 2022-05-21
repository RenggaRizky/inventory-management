import express from "express";
import { getProduk, postProduk, patchProduk, deleteProduk } from "../controllers/produk.js";

const router = express.Router();

router.get("/", getProduk);
router.post("/", postProduk);
router.patch("/:id", patchProduk);
router.delete("/:id", deleteProduk);

export default router;
