import express from "express";
import { getMerek, postMerek } from "../controllers/merek.js";

const router = express.Router();

router.get("/", getMerek);
router.post("/", postMerek);

export default router;
