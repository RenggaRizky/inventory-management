import mongoose from "mongoose";
import JenisBarang from "../models/jenisBarang.js";
import Merek from "../models/merek.js";
import Produk from "../models/produk.js";

export const getJenisBarang = async (req, res) => {
    try {
        const dataJenisBarang = await JenisBarang.find().sort({ nama: 1 });
        res.status(200).json(dataJenisBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoJenisBarang = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const idJenisBarang = await JenisBarang.findById(_id);
        res.status(200).json(idJenisBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postJenisBarang = async (req, res) => {
    const jenisBarang = req.body;
    const jenisBarangBaru = new JenisBarang(jenisBarang);

    try {
        await jenisBarangBaru.save();
        const dataJenisBarang = await JenisBarang.find();
        res.status(201).json(dataJenisBarang);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchJenisBarang = async (req, res) => {
    const { id: _id } = req.params;
    const jenisBarang = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const jenisBarangDiperbarui = await JenisBarang.findByIdAndUpdate(_id, jenisBarang, { new: true });
            res.status(200).json(jenisBarangDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteJenisBarang = async (req, res) => {
    const { id: _id } = req.params;
    let findJenisBarang = await Produk.find({ id_jenisbarang: _id }, { id_jenisbarang: 1, _id: 0 });

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (findJenisBarang.length !== 0) {
                throw new Error("Tidak bisa menghapus");
            } else {
                await JenisBarang.findByIdAndRemove(_id);
                const dataJenisBarang = await JenisBarang.find();
                res.status(200).json({
                    item: dataJenisBarang,
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

export const postFilterJenisBarang = async (req, res) => {
    const { text } = req.body;

    try {
        let jenisBarang;

        jenisBarang = await JenisBarang.find({ $text: { $search: text } }).sort({ nama: 1 });

        if (!jenisBarang.length > 0) {
            jenisBarang = await JenisBarang.find().sort({ nama: 1 });
        }
        res.status(200).json(jenisBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
