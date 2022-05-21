import express from "express";
import { getSupplier, patchSupplier, postSupplier, deleteSupplier } from "../controllers/supplier.js";

const router = express.Router();

router.get("/", getSupplier);
router.post("/", postSupplier);
router.patch("/:id", patchSupplier);
router.delete("/:id", deleteSupplier);

export default router;
