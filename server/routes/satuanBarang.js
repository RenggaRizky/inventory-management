import express from "express";
import { getSatuanBarang, getInfoSatuanBarang, postSatuanBarang, patchSatuanBarang, deleteSatuanBarang } from "../controllers/satuanBarang.js";

const router = express.Router();

router.get("/", getSatuanBarang);
router.get("/:id", getInfoSatuanBarang);
router.post("/tambah-satuan-barang", postSatuanBarang);
router.patch("/:id", patchSatuanBarang);
router.delete("/:id", deleteSatuanBarang);

export default router;
