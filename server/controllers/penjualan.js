import mongoose from "mongoose";
import Penjualan from "../models/penjualan.js";

export const getPenjualan = async (req, res) => {
    try {
        const dataPenjualan = await Penjualan.aggregate([
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
        res.status(200).json(dataPenjualan);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postPenjualan = () => {};
export const getInfoPenjualan = () => {};
export const patchPenjualan = () => {};
export const deletePenjualan = () => {};
