import mongoose from "mongoose";
import BarangRetur from "../models/barangRetur.js";

export const getBarangRetur = async (req, res) => {
    try {
        const dataBarangRetur = await BarangRetur.aggregate([
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
                },
            },
            {
                $lookup: {
                    from: "supplier",
                    localField: "id_supplier",
                    foreignField: "_id",
                    as: "id_supplier",
                },
            },
        ]);
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoBarangRetur = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const infoDataBarangRetur = await BarangRetur.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
                },
            },
            {
                $lookup: {
                    from: "supplier",
                    localField: "id_supplier",
                    foreignField: "_id",
                    as: "id_supplier",
                },
            },
        ]);
        res.status(200).json(infoDataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postBarangRetur = async (req, res) => {
    const barangRetur = req.body;
    const barangReturBaru = new BarangRetur(barangRetur);

    try {
        await barangReturBaru.save();
        const dataBarangRetur = await BarangRetur.find();
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchBarangRetur = async (req, res) => {
    const { id: _id } = req.params;
    const barangRetur = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const barangReturDiperbarui = await BarangRetur.findByIdAndUpdate(_id, barangRetur, { new: true });
            res.status(200).json(barangReturDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteBarangRetur = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await BarangRetur.findByIdAndRemove(_id);
            const dataBarangRetur = await BarangRetur.aggregate([
                {
                    $lookup: {
                        from: "produk",
                        localField: "id_produk",
                        foreignField: "_id",
                        as: "id_produk",
                    },
                },
                {
                    $lookup: {
                        from: "supplier",
                        localField: "id_supplier",
                        foreignField: "_id",
                        as: "id_supplier",
                    },
                },
            ]);
            res.status(200).json(dataBarangRetur);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
