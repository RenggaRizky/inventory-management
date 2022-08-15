import express from "express";
import { deleteNotifikasi, getNotifikasi } from "../controllers/notifikasi.js";

const router = express.Router();

router.get("/", getNotifikasi);
router.delete("/:id", deleteNotifikasi);

export default router;
