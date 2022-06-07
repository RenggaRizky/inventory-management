import express from "express";
import { getSupplier, getInfoSupplier, patchSupplier, postSupplier, deleteSupplier } from "../controllers/supplier.js";

const router = express.Router();

router.get("/", getSupplier);
router.get("/:id", getInfoSupplier);
router.post("/tambah-supplier", postSupplier);
router.patch("/:id", patchSupplier);
router.delete("/:id", deleteSupplier);

export default router;
