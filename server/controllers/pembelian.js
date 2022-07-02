import mongoose from "mongoose";
import Pembelian from "../models/pembelian.js";

export const getPembelian = async (req, res) => {
    try {
        const dataPembelian = await Pembelian.aggregate([
            {
                $lookup: {
                    from: "supplier",
                    localField: "id_supplier",
                    foreignField: "_id",
                    as: "id_supplier",
                },
            },
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
                    tanggalPembelian: {
                        $first: "$tanggalPembelian",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
                    id_supplier: {
                        $first: "$id_supplier",
                    },
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
        res.status(200).json(dataPembelian);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoPembelian = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const dataPembelian = await Pembelian.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
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
                    tanggalPembelian: {
                        $first: "$tanggalPembelian",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
                    id_supplier: {
                        $first: "$id_supplier",
                    },
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
        res.status(200).json(dataPembelian);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postPembelian = async (req, res) => {
    const { barangMasuk, totalHarga, id_supplier, noNota } = req.body;

    const pembelianBaru = new Pembelian({
        barangMasuk,
        totalHarga,
        id_supplier,
        noNota,
    });

    // const pembelianBaru = new Pembelian(pembelian);

    try {
        await pembelianBaru.save();
        const dataPembelian = await Pembelian.aggregate([
            {
                $lookup: {
                    from: "supplier",
                    localField: "id_supplier",
                    foreignField: "_id",
                    as: "id_supplier",
                },
            },
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
                    tanggalPembelian: {
                        $first: "$tanggalPembelian",
                    },
                    noNota: {
                        $first: "$noNota",
                    },
                    totalHarga: {
                        $first: "$totalHarga",
                    },
                    id_supplier: {
                        $first: "$id_supplier",
                    },
                    barangMasuk: {
                        $push: {
                            id_produk: {
                                $arrayElemAt: ["$barangMasuk.id_produk", 0],
                            },
                            tanggalMasuk: "$barangMasuk.tanggalMasuk",
                            jumlahMasuk: "$barangMasuk.jumlahMasuk",
                            _id: "$barangMasuk._id",
                        },
                    },
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

export const patchPembelian = () => {};
export const deletePembelian = () => {};
