import express from "express";
import { getRak, getInfoRak, postRak, patchRak } from "../controllers/rak.js";

const router = express.Router();
router.get("/", getRak);
router.get("/:id", getInfoRak);
router.post("/tambah-rak", postRak);
router.patch("/:id", patchRak);

export default router;
