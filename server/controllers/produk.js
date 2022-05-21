import Produk from "../models/produk.js";
import JenisBarang from "../models/jenisBarang.js";
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

export const postProduk = async (req, res) => {
    const {
        nama,
        id_jenisbarang,
        id_merek,
        harga: { hargaSatuan, hargaPerLusin },
        dimensi: { panjang, lebar, tinggi },
        volume,
    } = req.body;
    // const produk = req.body;
    // const produkBaru = new Produk({
    //     nama: req.body.nama,
    //     id_jenisbarang: req.body.id_jenisbarang,
    //     id_merek: req.body.id_merek,
    //     harga: {
    //         hargaSatuan: req.body.harga.hargaSatuan,
    //         hargaPerLusin: req.body.harga.hargaPerLusin,
    //     },
    //     dimensi: {
    //         panjang: req.body.dimensi.panjang,
    //         lebar: req.body.dimensi.lebar,
    //         tinggi: req.body.dimensi.tinggi,
    //     },
    //     volume: req.body.volume,
    // });
    // const produkBaru = new Produk(produk);
    const produkBaru = new Produk({ nama, id_jenisbarang, id_merek, harga: { hargaSatuan, hargaPerLusin }, dimensi: { panjang, lebar, tinggi }, volume });
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
    const produk = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const produkDiperbarui = await Produk.findByIdAndUpdate(_id, produk, { new: true });
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
