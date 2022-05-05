import express from "express";
import { getSupplier, postSupplier } from "../controllers/supplier.js";

const router = express.Router();

router.get("/", getSupplier);
router.post("/", postSupplier);

export default router;
