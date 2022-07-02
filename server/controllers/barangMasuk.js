import mongoose from "mongoose";
import Pembelian from "../models/pembelian.js";

export const getBarangMasuk = async (req, res) => {
    try {
        const dataBarangMasuk = await Pembelian.aggregate([
            {
                $unwind: {
                    path: "$barangMasuk",
                },
            },
            {
                $lookup: {
                    from: "produk",
                    localField: "barangMasuk.id_produk",
                    foreignField: "_id",
                    as: "barangMasuk.id_produk",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    barangMasuk: {
                        $push: {
                            id_produk: {
                                $arrayElemAt: ["$barangMasuk.id_produk", 0],
                            },
                            tanggalMasuk: "$barangMasuk.tanggalMasuk",
                            jumlahMasuk: "$barangMasuk.jumlahMasuk",
                            totalHarga: "$barangMasuk.totalHarga",
                            _id: "$barangMasuk._id",
                        },
                    },
                },
            },
        ]);
        res.status(200).json(dataBarangMasuk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
