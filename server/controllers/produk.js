import Produk from "../models/produk.js";
import JenisBarang from "../models/jenisBarang.js";

export const getProduk = async (req, res) => {
    try {
        const produk = await Produk.aggregate([
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
        res.status(201).json(produk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postProduk = async (req, res) => {
    const produk = req.body;
    const produkBaru = new Produk(produk);
    try {
        await produkBaru.save();
        res.status(201).json(produkBaru);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
