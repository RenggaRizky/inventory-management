import express from "express";
import { getJenisBarang, postJenisBarang, patchJenisBarang, deleteJenisBarang } from "../controllers/jenisBarang.js";

const router = express.Router();

router.get("/", getJenisBarang);
router.post("/", postJenisBarang);
router.patch("/:id", patchJenisBarang);
router.delete("/:id", deleteJenisBarang);

export default router;
