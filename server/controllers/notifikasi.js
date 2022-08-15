import mongoose from "mongoose";
import Notifikasi from "../models/notifikasi.js";

export const getNotifikasi = async (req, res) => {
    try {
        const dataNotifikasi = await Notifikasi.aggregate([
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
                },
            },
            {
                $sort: { tanggalPemberitahuan: -1 },
            },
        ]);
        res.status(200).json(dataNotifikasi);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const deleteNotifikasi = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await Notifikasi.findByIdAndRemove(_id);
            const dataNotifikasi = await Notifikasi.find();
            res.status(200).json(dataNotifikasi);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
