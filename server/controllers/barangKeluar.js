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
            {
                $sort: { "barangKeluar.tanggalKeluar": -1 },
            },
        ]);
        res.status(200).json(dataBarangKeluar);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getBarangKeluarHariIni = async (req, res) => {
    let currentDate = new Date();
    let getCurrentDay = currentDate.getDate() <= 9 ? "0" + currentDate.getDate() : currentDate.getDate();
    let getCurrentMonth = currentDate.getMonth() + 1 <= 9 ? "0" + Number(currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    let currentMonth = getCurrentMonth;
    let currentDay = getCurrentDay;
    let currentYear = currentDate.getFullYear();

    const tomorrow = (long = false) => {
        currentDate.setDate(currentDate.getDate() + 1);
        const ret = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
        return !long ? ret : `${ret}T00:00:00`;
    };

    try {
        const dataBarangKeluar = await Penjualan.find({ "barangKeluar.tanggalKeluar": { $gte: new Date(`${currentYear}-${currentMonth}-${currentDay}`), $lte: new Date(tomorrow()) } }, { barangKeluar: 1, _id: 0 });
        res.status(200).json(dataBarangKeluar);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postLaporanBarangKeluar = async (req, res) => {
    const { tanggalMulai, tanggalSelesai } = req.body;

    try {
        if (tanggalMulai !== null && tanggalSelesai !== null) {
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
                {
                    $sort: { "barangKeluar.tanggalKeluar": -1 },
                },
                {
                    $match: {
                        "barangKeluar.tanggalKeluar": {
                            $gte: new Date(tanggalMulai),
                            $lte: new Date(tanggalSelesai),
                        },
                    },
                },
            ]);
            res.status(200).json(dataBarangKeluar);
        } else {
            res.status(404).json({
                message: "Tanggal Belum Dipilih",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
