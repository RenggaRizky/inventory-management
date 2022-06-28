import express from "express";
import { getInfoStokBarang, getStokBarang, patchStokBarang, patchStokProsesRetur } from "../controllers/stok.js";

const router = express.Router();

router.get("/", getStokBarang);
router.get("/:id", getInfoStokBarang);
router.patch("/:id", patchStokBarang);
router.patch("/proses-retur/:id", patchStokProsesRetur);

export default router;
