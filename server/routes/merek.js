import express from "express";
import { getMerek, postMerek, patchMerek, deleteMerek } from "../controllers/merek.js";

const router = express.Router();

router.get("/", getMerek);
router.post("/", postMerek);
router.patch("/:id", patchMerek);
router.delete("/:id", deleteMerek);

export default router;
