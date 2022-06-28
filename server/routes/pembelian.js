import express from "express";
import { getPembelian, postPembelian, getInfoPembelian, patchPembelian, deletePembelian } from "../controllers/pembelian.js";

const router = express.Router();

router.get("/", getPembelian);
router.get("/:id", getInfoPembelian);
router.post("/tambah-pembelian", postPembelian);
router.patch("/:id", patchPembelian);
router.delete("/:id", deletePembelian);

export default router;
