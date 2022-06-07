import express from "express";
import { getMerek, postMerek, getInfoMerek, patchMerek, deleteMerek } from "../controllers/merek.js";

const router = express.Router();

router.get("/", getMerek);
router.get("/:id", getInfoMerek);
router.post("/tambah-merek", postMerek);
router.patch("/:id", patchMerek);
router.delete("/:id", deleteMerek);

export default router;
