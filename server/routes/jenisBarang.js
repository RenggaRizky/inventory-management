import express from "express";
import { getJenisBarang, postJenisBarang } from "../controllers/jenisBarang.js";

const router = express.Router();

router.get("/", getJenisBarang);
router.post("/", postJenisBarang);

export default router;
