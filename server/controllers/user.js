import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const secret = "test";

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const cekValiditasPassword = await bcrypt.compare(password, user.password);
        if (!cekValiditasPassword) {
            return res.status(400).json({ message: "Password salah" });
        }

        const token = jwt.sign({ username: user.username, id: user._id, peran: user.peran }, secret, { expiresIn: "1h" });

        res.status(200).json({ user: user, token });
    } catch (error) {
        res.status(500).json({ message: "Login Error" });
    }
};

export const register = async (req, res) => {
    const { username, password, nama, peran, retypePassword } = req.body;
    const secret = "test";
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({ message: "Username sudah ada" });
        }

        if (password !== retypePassword) {
            return res.status(400).json({ message: "Penulisan ulang password tidak sesuai" });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const userBaru = await User.create({ nama, username, password: hashPassword, peran });
        const token = jwt.sign({ username: userBaru.username, id: userBaru._id, peran: userBaru.peran }, secret, { expiresIn: "12h" });

        res.status(201).json({ user: userBaru, token });
    } catch (error) {
        res.status(500).json({ message: "Register Error" });
    }
};

export const getInfoUser = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const idUser = await User.findById(_id);
        res.status(200).json(idUser);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
