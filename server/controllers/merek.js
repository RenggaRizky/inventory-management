import mongoose from "mongoose";
import Merek from "../models/merek.js";
import Produk from "../models/produk.js";

export const getMerek = async (req, res) => {
    try {
        const dataMerek = await Merek.find().sort({ nama: 1 });
        res.status(200).json(dataMerek);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoMerek = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const idMerek = await Merek.findById(_id);
        res.status(200).json(idMerek);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postMerek = async (req, res) => {
    const merek = req.body;
    const merekBaru = new Merek(merek);

    try {
        await merekBaru.save();
        const dataMerek = await Merek.find();
        res.status(201).json(dataMerek);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchMerek = async (req, res) => {
    const { id: _id } = req.params;
    const merek = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const merekDiperbarui = await Merek.findByIdAndUpdate(_id, merek, { new: true });
            res.status(200).json(merekDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteMerek = async (req, res) => {
    const { id: _id } = req.params;
    let findMerek = await Produk.find({ id_merek: _id }, { id_merek: 1, _id: 0 });

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (findMerek.length !== 0) {
                throw new Error("Tidak bisa menghapus");
            } else {
                await Merek.findByIdAndRemove(_id);
                const dataMerek = await Merek.find();
                res.status(200).json({
                    item: dataMerek,
                    message: "Berhasil menghapus",
                });
            }
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const postFilterMerek = async (req, res) => {
    const { text } = req.body;

    try {
        let merek;
        merek = await Merek.find({ $text: { $search: text } }).sort({ nama: 1 });
        if (!merek.length > 0) {
            merek = await Merek.find().sort({ nama: 1 });
        }
        res.status(200).json(merek);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
