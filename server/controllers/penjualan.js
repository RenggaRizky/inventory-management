import mongoose from "mongoose";
import Penjualan from "../models/penjualan.js";

export const getPenjualan = async (req, res) => {
    try {
        const dataPenjualan = await Penjualan.aggregate([
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
                    tanggalPenjualan: {
                        $first: "$tanggalPenjualan",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
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
        res.status(200).json(dataPenjualan);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoPenjualan = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const dataPenjualan = await Penjualan.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
                },
            },
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
                    tanggalPenjualan: {
                        $first: "$tanggalPenjualan",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
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
        res.status(200).json(dataPenjualan);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postPenjualan = async (req, res) => {
    const { barangKeluar, totalHarga, noNota } = req.body;

    const penjualanBaru = new Penjualan({
        barangKeluar,
        totalHarga,
        noNota,
    });

    try {
        await penjualanBaru.save();
        const dataPenjualan = await Penjualan.aggregate([
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
                    tanggalPenjualan: {
                        $first: "$tanggalPenjualan",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
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
        res.status(200).json(dataPenjualan);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchPenjualan = () => {};
export const deletePenjualan = () => {};
