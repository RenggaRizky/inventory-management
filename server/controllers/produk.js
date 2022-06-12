import Produk from "../models/produk.js";
import mongoose from "mongoose";

export const getProduk = async (req, res) => {
    try {
        const dataProduk = await Produk.aggregate([
            {
                $lookup: {
                    from: "merek",
                    localField: "id_merek",
                    foreignField: "_id",
                    as: "id_merek",
                },
            },
            {
                $lookup: {
                    from: "jenisbarang",
                    localField: "id_jenisbarang",
                    foreignField: "_id",
                    as: "id_jenisbarang",
                },
            },
        ]);
        res.status(201).json(dataProduk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoProduk = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const dataProduk = await Produk.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: "merek",
                    localField: "id_merek",
                    foreignField: "_id",
                    as: "id_merek",
                },
            },
            {
                $lookup: {
                    from: "jenisbarang",
                    localField: "id_jenisbarang",
                    foreignField: "_id",
                    as: "id_jenisbarang",
                },
            },
        ]);
        res.status(201).json(dataProduk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postProduk = async (req, res) => {
    const {
        nama,
        gambar,
        deskripsi,
        id_jenisbarang,
        id_merek,
        harga,
        dimensi: { panjang, lebar, tinggi },
        volume,
    } = req.body;
    const produkBaru = new Produk({ nama, gambar, deskripsi, id_jenisbarang, id_merek, harga, dimensi: { panjang, lebar, tinggi }, volume });
    try {
        await produkBaru.save();
        const dataProduk = await Produk.aggregate([
            {
                $lookup: {
                    from: "merek",
                    localField: "id_merek",
                    foreignField: "_id",
                    as: "id_merek",
                },
            },
            {
                $lookup: {
                    from: "jenisbarang",
                    localField: "id_jenisbarang",
                    foreignField: "_id",
                    as: "id_jenisbarang",
                },
            },
        ]);
        res.status(201).json(dataProduk);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchProduk = async (req, res) => {
    const { id: _id } = req.params;
    const {
        nama,
        gambar,
        deskripsi,
        id_jenisbarang,
        id_merek,
        harga,
        dimensi: { panjang, lebar, tinggi },
        volume,
    } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const produkDiperbarui = await Produk.findByIdAndUpdate(_id, { nama, gambar, deskripsi, id_jenisbarang, id_merek, harga, dimensi: { panjang, lebar, tinggi }, volume }, { new: true });
            res.status(200).json(produkDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteProduk = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await Produk.findByIdAndRemove(_id);
            const dataProduk = await Produk.aggregate([
                {
                    $lookup: {
                        from: "merek",
                        localField: "id_merek",
                        foreignField: "_id",
                        as: "id_merek",
                    },
                },
                {
                    $lookup: {
                        from: "jenisbarang",
                        localField: "id_jenisbarang",
                        foreignField: "_id",
                        as: "id_jenisbarang",
                    },
                },
            ]);
            res.status(200).json(dataProduk);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
