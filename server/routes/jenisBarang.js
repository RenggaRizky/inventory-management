import express from "express";
import { getJenisBarang, getInfoJenisBarang, postJenisBarang, patchJenisBarang, deleteJenisBarang } from "../controllers/jenisBarang.js";

const router = express.Router();

router.get("/", getJenisBarang);
router.get("/:id", getInfoJenisBarang);
router.post("/tambah-jenis-barang", postJenisBarang);
router.patch("/:id", patchJenisBarang);
router.delete("/:id", deleteJenisBarang);

export default router;
