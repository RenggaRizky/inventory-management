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
            {
                $sort: { "barangMasuk.tanggalMasuk": -1 },
            },
        ]);
        res.status(200).json(dataBarangMasuk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getBarangMasukHariIni = async (req, res) => {
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
        // const dataBarangMasuk = await Pembelian.find({ "barangMasuk.tanggalMasuk": { $gte: new Date(`${currentYear}-${currentMonth}-${currentDay}`), $lte: new Date(tomorrow()) } }, { barangMasuk: 1, _id: 0 });
        const dataBarangMasuk = await Pembelian.find();
        res.status(200).json(dataBarangMasuk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postLaporanBarangMasuk = async (req, res) => {
    const { tanggalMulai, tanggalSelesai } = req.body;

    try {
        if (tanggalMulai !== null && tanggalSelesai !== null) {
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
                {
                    $sort: { "barangMasuk.tanggalMasuk": -1 },
                },
                {
                    $match: {
                        "barangMasuk.tanggalMasuk": {
                            $gte: new Date(tanggalMulai),
                            $lte: new Date(tanggalSelesai),
                        },
                    },
                },
            ]);
            res.status(200).json(dataBarangMasuk);
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
