import Produk from "../models/produk.js";
import Rak from "../models/rak.js";
import mongoose from "mongoose";
import Notifikasi from "../models/notifikasi.js";
import Pembelian from "../models/pembelian.js";
import Penjualan from "../models/penjualan.js";
import BarangRetur from "../models/barangRetur.js";

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
            {
                $lookup: {
                    from: "rak",
                    let: {
                        id_susun: "$id_rak",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$id_susun", "$susun._id"],
                                },
                            },
                        },
                        {
                            $unwind: "$susun",
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$susun._id", "$$id_susun"],
                                },
                            },
                        },
                    ],
                    as: "id_rak",
                },
            },
            {
                $sort: {
                    nama: 1,
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
            {
                $lookup: {
                    from: "rak",
                    let: {
                        id_susun: "$id_rak",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$id_susun", "$susun._id"],
                                },
                            },
                        },
                        {
                            $unwind: "$susun",
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$susun._id", "$$id_susun"],
                                },
                            },
                        },
                    ],
                    as: "id_rak",
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
        id_rak,
        stok: { total },
        harga,
        dimensiProduk: { panjang, lebar, tinggi },
        volume,
    } = req.body;

    try {
        // INFO PRODUK
        const totalVolumeProduk = Number(total) * Number(volume);

        // INFO RAK
        const rakSusun = await Rak.find({ "susun._id": id_rak }, { susun: { $elemMatch: { _id: id_rak } } });
        const kapasitasRakSusun = rakSusun[0].susun[0].kapasitas;
        const statusRakSusun = rakSusun[0].susun[0].status;
        const terpakaiRakSusun = rakSusun[0].susun[0].terpakai;

        if (totalVolumeProduk > kapasitasRakSusun) {
            throw new Error("Stok terlalu banyak untuk menempati rak");
        } else {
            const hitungKapasitasTerpakai = terpakaiRakSusun + totalVolumeProduk;
            const hitungPersentase = ((total * volume) / kapasitasRakSusun) * 100;

            const patchStatusKetersediaanSusun = await Rak.findOneAndUpdate(
                {
                    "susun._id": mongoose.Types.ObjectId(id_rak),
                },
                {
                    $set: {
                        "susun.$.terpakai": hitungKapasitasTerpakai,
                        "susun.$.status": hitungPersentase,
                    },
                }
            );

            let cekStatus = () => {
                if (total <= 0 || hitungPersentase <= 0) {
                    const postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${nama} habis. Segera lakukan pembelian`, status: "Habis" });
                    postNotifikasiHabis.save();
                    return "Habis";
                } else if (total === Number(Math.trunc(kapasitasRakSusun / volume)) || hitungPersentase === 100) {
                    const postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${nama} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                    postNotifikasiPenuh.save();
                    return "Penuh";
                } else if (hitungPersentase > 0 && hitungPersentase < 2) {
                    const postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${nama} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                    postNotifikasiHampirHabis.save();
                    return "Hampir Habis";
                } else {
                    return "Tersedia";
                }
            };

            const produkBaru = new Produk({
                nama,
                gambar,
                deskripsi,
                id_jenisbarang,
                id_merek,
                id_rak,
                stok: { total, status: cekStatus() },
                harga,
                dimensiProduk: { panjang, lebar, tinggi },
                volume,
            });

            await produkBaru.save();
        }

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
            {
                $lookup: {
                    from: "rak",
                    let: {
                        id_susun: "$id_rak",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$id_susun", "$susun._id"],
                                },
                            },
                        },
                        {
                            $unwind: "$susun",
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$susun._id", "$$id_susun"],
                                },
                            },
                        },
                    ],
                    as: "id_rak",
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
        id_rak,
        harga,
        dimensiProduk: { panjang, lebar, tinggi },
        volume,
        idRakLama,
    } = req.body;

    // INFO STOK
    let getProduk = await Produk.find({ _id: mongoose.Types.ObjectId(_id) }, { volume: 1, stok: 1 });
    let stokProduk = getProduk[0].stok.total;
    let volumeProduk = getProduk[0].volume;
    let status, totalVolumeProduk;

    // INFO RAK
    let rakSusunLama = await Rak.find({ "susun._id": idRakLama }, { susun: { $elemMatch: { _id: idRakLama } } });
    let rakSusunBaru = await Rak.find({ "susun._id": id_rak }, { susun: { $elemMatch: { _id: id_rak } } });
    let rakTerpakaiLama = 0;
    let rakStatusLama = 0;
    let kapasitasRakBaru = rakSusunBaru[0].susun[0].kapasitas;
    let statusRakBaru = rakSusunBaru[0].susun[0].status;
    let terpakaiRakBaru = rakSusunBaru[0].susun[0].terpakai;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (idRakLama !== id_rak) {
                totalVolumeProduk = Number(stokProduk) * Number(volumeProduk);
                if (totalVolumeProduk >= kapasitasRakBaru) {
                    throw new Error("Stok terlalu banyak untuk menempati rak");
                } else {
                    const patchRakLama = await Rak.findOneAndUpdate(
                        {
                            "susun._id": mongoose.Types.ObjectId(idRakLama),
                        },
                        {
                            $set: {
                                "susun.$.terpakai": rakTerpakaiLama,
                                "susun.$.status": rakStatusLama,
                            },
                        }
                    );

                    let patchStatusRak = ((Number(stokProduk) * Number(volumeProduk)) / Number(kapasitasRakBaru)) * 100;

                    const patchRakBaru = await Rak.findOneAndUpdate(
                        {
                            "susun._id": mongoose.Types.ObjectId(id_rak),
                        },
                        {
                            $set: {
                                "susun.$.terpakai": Number(terpakaiRakBaru) + Number(stokProduk) * Number(volumeProduk),
                                "susun.$.status": patchStatusRak,
                            },
                        }
                    );

                    if (patchStatusRak <= 0 || stokProduk <= 0) {
                        let postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${nama} habis. Segera lakukan pembelian`, status: "Habis" });
                        postNotifikasiHabis.save();
                        status = "Habis";
                    } else if (stokProduk === Number(Math.trunc(kapasitasRakBaru / volumeProduk)) || patchStatusRak === 100) {
                        let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${nama} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                        postNotifikasiPenuh.save();
                        status = "Penuh";
                    } else if (patchStatusRak > 0 && patchStatusRak < 2) {
                        let postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${nama} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                        postNotifikasiHampirHabis.save();
                        status = "Hampir Habis";
                    } else {
                        status = "Tersedia";
                    }
                }
            }
            const produkDiperbarui = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        nama: nama,
                        gambar: gambar,
                        deskripsi: deskripsi,
                        harga: harga,
                        volume: volume,
                        id_jenisbarang: id_jenisbarang,
                        id_rak: id_rak,
                        "dimensiProduk.panjang": panjang,
                        "dimensiProduk.lebar": panjang,
                        "dimensiProduk.tinggi": panjang,
                        "stok.status": status,
                    },
                }
            );
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

    //INFO RAK
    let getIdProduk = await Produk.findOne({ _id: mongoose.Types.ObjectId(_id) }, { id_rak: 1 });
    let idRak = getIdProduk.id_rak;

    let getRakSusun = await Rak.find({ "susun._id": idRak }, { susun: { $elemMatch: { _id: idRak } } });
    let terpakaiRakSusun = getRakSusun[0].susun[0].terpakai;
    let statusRakSusun = getRakSusun[0].susun[0].status;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const patchTerpakaiStatusRak = await Rak.findOneAndUpdate(
                { "susun._id": idRak },
                {
                    $set: {
                        "susun.$.terpakai": 0,
                        "susun.$.status": 0,
                    },
                }
            );

            let getIdPembelian = await Pembelian.deleteMany({ "barangMasuk.id_produk": mongoose.Types.ObjectId(_id) });
            let getIdPenjualan = await Penjualan.deleteMany({ "barangKeluar.id_produk": mongoose.Types.ObjectId(_id) });
            let getIdRetur = await BarangRetur.deleteMany({ id_produk: mongoose.Types.ObjectId(_id) });

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
                {
                    $lookup: {
                        from: "rak",
                        let: {
                            id_susun: "$id_rak",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$$id_susun", "$susun._id"],
                                    },
                                },
                            },
                            {
                                $unwind: "$susun",
                            },
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$susun._id", "$$id_susun"],
                                    },
                                },
                            },
                        ],
                        as: "id_rak",
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

export const postFilterProduk = async (req, res) => {
    const { text } = req.body;

    try {
        let produk;

        produk = await Produk.aggregate([
            { $match: { $text: { $search: text } } },
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
            {
                $lookup: {
                    from: "rak",
                    let: {
                        id_susun: "$id_rak",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$id_susun", "$susun._id"],
                                },
                            },
                        },
                        {
                            $unwind: "$susun",
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$susun._id", "$$id_susun"],
                                },
                            },
                        },
                    ],
                    as: "id_rak",
                },
            },
            {
                $sort: {
                    nama: 1,
                },
            },
        ]);

        if (!produk.length > 0) {
            produk = await Produk.aggregate([
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
                {
                    $lookup: {
                        from: "rak",
                        let: {
                            id_susun: "$id_rak",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$$id_susun", "$susun._id"],
                                    },
                                },
                            },
                            {
                                $unwind: "$susun",
                            },
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$susun._id", "$$id_susun"],
                                    },
                                },
                            },
                        ],
                        as: "id_rak",
                    },
                },
                {
                    $sort: {
                        nama: 1,
                    },
                },
            ]);
        }
        res.status(200).json(produk);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
