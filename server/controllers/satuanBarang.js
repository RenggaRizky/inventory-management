import mongoose from "mongoose";
import SatuanBarang from "../models/satuanBarang.js";

export const getSatuanBarang = async (req, res) => {
    try {
        const dataSatuanBarang = await SatuanBarang.find();
        res.status(200).json(dataSatuanBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoSatuanBarang = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const idSatuanBarang = await SatuanBarang.findById(_id);
        res.status(200).json(idSatuanBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postSatuanBarang = async (req, res) => {
    const satuanBarang = req.body;
    const satuanBarangBaru = new SatuanBarang(satuanBarang);

    try {
        await satuanBarangBaru.save();
        const dataSatuanBarang = await SatuanBarang.find();
        res.status(201).json(dataSatuanBarang);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchSatuanBarang = async (req, res) => {
    const { id: _id } = req.params;
    const satuanBarang = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const satuanBarangDiperbarui = await SatuanBarang.findByIdAndUpdate(_id, satuanBarang, { new: true });
            res.status(200).json(satuanBarangDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteSatuanBarang = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await SatuanBarang.findByIdAndRemove(_id);
            const dataSatuanBarang = await SatuanBarang.find();
            res.status(200).json(dataSatuanBarang);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
