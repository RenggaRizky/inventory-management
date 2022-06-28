import mongoose from "mongoose";
import Rak from "../models/rak.js";

export const getRak = async (req, res) => {
    try {
        const dataRak = await Rak.find();
        res.status(202).json(dataRak);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoRak = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const idRak = await Rak.findById(_id);
        res.status(200).json(idRak);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postRak = async (req, res) => {
    const rak = req.body;
    const rakBaru = new Rak(rak);

    try {
        await rakBaru.save();
        const dataRak = await Rak.find();
        res.status(201).json(dataRak);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchRak = async (req, res) => {
    const { id: _id } = req.params;
    const { nama, lokasi, panjang, lebar, tinggi, kapasitas } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const mempebaruiRak = await Rak.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        nama: nama,
                        lokasi: lokasi,
                        "dimensiSusun.panjang": panjang,
                        "dimensiSusun.lebar": lebar,
                        "dimensiSusun.tinggi": tinggi,
                        "susun1.kapasitas": kapasitas,
                        "susun2.kapasitas": kapasitas,
                        "susun3.kapasitas": kapasitas,
                        "susun4.kapasitas": kapasitas,
                    },
                }
            );

            const rakDiperbarui = await Rak.findById(_id);
            res.status(200).json(rakDiperbarui);
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
