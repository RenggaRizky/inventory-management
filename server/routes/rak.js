import express from "express";
import { getRak, getInfoRak, postRak, patchRak, deleteRak, postFilterRak } from "../controllers/rak.js";

const router = express.Router();
router.get("/", getRak);
router.get("/:id", getInfoRak);
router.post("/tambah-rak", postRak);
router.post("/filter", postFilterRak);
router.patch("/:id", patchRak);
router.delete("/:id", deleteRak);

export default router;
