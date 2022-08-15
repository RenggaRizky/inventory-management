import express from "express";

import { login, register, getInfoUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/:id", getInfoUser);

export default router;
