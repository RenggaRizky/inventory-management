import mongoose from "mongoose";
import Pembelian from "../models/pembelian.js";

export const getPembelian = async (req, res) => {
    try {
        const dataPembelian = await Pembelian.aggregate([
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
        res.status(200).json(dataPembelian);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postPembelian = async (req, res) => {
    const pembelian = req.body;
    const pembelianBaru = new Pembelian(pembelian);

    try {
        await pembelianBaru.save();
        const dataPembelian = await Pembelian.aggregate([
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
        res.status(200).json(dataPembelian);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
export const getInfoPembelian = () => {};
export const patchPembelian = () => {};
export const deletePembelian = () => {};
