import mongoose from "mongoose";
import Penjualan from "../models/penjualan.js";

export const getBarangKeluar = async (req, res) => {
    try {
        const dataBarangKeluar = await Penjualan.aggregate([
            {
                $unwind: {
                    path: "$barangKeluar",
                },
            },
            {
                $lookup: {
                    from: "produk",
                    localField: "barangKeluar.id_produk",
                    foreignField: "_id",
                    as: "barangKeluar.id_produk",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    barangKeluar: {
                        $push: {
                            id_produk: {
                                $arrayElemAt: ["$barangKeluar.id_produk", 0],
                            },
                            tanggalKeluar: "$barangKeluar.tanggalKeluar",
                            jumlahKeluar: "$barangKeluar.jumlahKeluar",
                            totalHarga: "$barangKeluar.totalHarga",
                            _id: "$barangKeluar._id",
                        },
                    },
                },
            },
        ]);
        res.status(200).json(dataBarangKeluar);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
