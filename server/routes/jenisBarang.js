import express from "express";
import { getJenisBarang, getInfoJenisBarang, postJenisBarang, postFilterJenisBarang, patchJenisBarang, deleteJenisBarang } from "../controllers/jenisBarang.js";

const router = express.Router();

router.get("/", getJenisBarang);
router.get("/:id", getInfoJenisBarang);
router.post("/tambah-jenis-barang", postJenisBarang);
router.post("/filter", postFilterJenisBarang);
router.patch("/:id", patchJenisBarang);
router.delete("/:id", deleteJenisBarang);

export default router;
