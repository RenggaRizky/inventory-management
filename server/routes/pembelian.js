import express from "express";
import { getPembelian, postPembelian, postFilterPembelian, getInfoPembelian, patchPembelian, deletePembelian } from "../controllers/pembelian.js";

const router = express.Router();

router.get("/", getPembelian);
router.get("/:id", getInfoPembelian);
router.post("/tambah-pembelian", postPembelian);
router.post("/filter", postFilterPembelian);
router.patch("/:id", patchPembelian);
router.delete("/:id", deletePembelian);

export default router;
