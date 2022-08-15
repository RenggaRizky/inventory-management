import express from "express";
import { getPenjualan, postPenjualan, getInfoPenjualan, patchPenjualan, postFilterPenjualan, deletePenjualan } from "../controllers/penjualan.js";

const router = express.Router();

router.get("/", getPenjualan);
router.get("/:id", getInfoPenjualan);
router.post("/tambah-penjualan", postPenjualan);
router.post("/filter", postFilterPenjualan);
router.patch("/:id", patchPenjualan);
router.delete("/:id", deletePenjualan);

export default router;
