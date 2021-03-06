import mongoose from "mongoose";
import Produk from "../models/produk.js";

export const getStokBarang = async (req, res) => {
    try {
        const dataStok = await Produk.find({}, ["stok", "nama", "gambar", "dimensi"]);
        res.status(201).json(dataStok);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoStokBarang = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const dataStok = await Produk.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: "satuanbarang",
                    localField: "id_satuanbarang",
                    foreignField: "_id",
                    as: "id_satuanbarang",
                },
            },
            {
                $project: {
                    nama: 1,
                    gambar: 1,
                    stok: 1,
                    dimensi: 1,
                    id_satuanbarang: 1,
                },
            },
        ]);
        res.status(201).json(dataStok);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const patchStokBarang = async (req, res) => {
    const { id: _id } = req.params;
    const {
        stok: { batasMinimum },
    } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const batasStokDiperbarui = await Produk.findByIdAndUpdate(_id, { stok: { batasMinimum } });
            res.status(200).json(batasStokDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchStokBarangMasuk = async (req, res) => {
    const { id: _id } = req.params;
    const { jumlahMasuk } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const totalStokBarang = await Produk.find({ _id: _id }, { "stok.total": 1, _id: 0 });
            const getTotalStokBarang = totalStokBarang[0].stok.total;

            const pembelianBarang = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": getTotalStokBarang + jumlahMasuk,
                    },
                }
            );
            res.status(200).json(pembelianBarang);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchStokBarangKeluar = async (req, res) => {
    const { id: _id } = req.params;
    const { jumlahKeluar } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const totalStokBarang = await Produk.find({ _id: _id }, { "stok.total": 1, _id: 0 });
            const getTotalStokBarang = totalStokBarang[0].stok.total;

            const penjualanBarang = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": getTotalStokBarang - jumlahKeluar,
                    },
                }
            );
            res.status(200).json(penjualanBarang);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchStokProsesRetur = async (req, res) => {
    const { id: _id } = req.params;
    const { jumlah } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const totalStokBarang = await Produk.find({ _id: _id }, { "stok.total": 1, _id: 0 });
            const getTotalStokBarang = totalStokBarang[0].stok.total;

            const prosesRetur = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": getTotalStokBarang - jumlah,
                    },
                }
            );
            res.status(200).json(prosesRetur);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
