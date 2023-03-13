import mongoose from "mongoose";
import Notifikasi from "../models/notifikasi.js";
import Produk from "../models/produk.js";
import Rak from "../models/rak.js";

export const getStokBarang = async (req, res) => {
    try {
        const dataStok = await Produk.aggregate([
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
                $project: {
                    nama: 1,
                    gambar: 1,
                    stok: 1,
                    dimensiProduk: 1,
                    id_rak: 1,
                },
            },
            {
                $sort: {
                    nama: 1,
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
                $project: {
                    nama: 1,
                    gambar: 1,
                    stok: 1,
                    dimensiProduk: 1,
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

export const patchStokBarangMasuk = async (req, res) => {
    const { id: _id } = req.params;
    const { jumlahMasuk } = req.body;

    const dataProduk = await Produk.find({ _id: _id }, { _id: 0, nama: 1, volume: 1, stok: 1, id_rak: 1 });

    // INFO STOK
    const getTotalStokBarang = dataProduk[0].stok.total;
    let cekStatusStokBaru;

    // INFO PRODUK
    const getVolumeBarang = dataProduk[0].volume;
    const getNamaBarang = dataProduk[0].nama;

    // INFO RAK
    const getIdRak = dataProduk[0].id_rak;
    const rakSusun = await Rak.find({ "susun._id": getIdRak }, { susun: { $elemMatch: { _id: getIdRak } } });

    const kapasitasRakSusun = rakSusun[0].susun[0].kapasitas;
    const statusRakSusun = rakSusun[0].susun[0].status;
    const terpakaiRakSusun = rakSusun[0].susun[0].terpakai;
    let cekStatusRakSusunBaru;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const totalStokBaru = Number(getTotalStokBarang) + Number(jumlahMasuk);
            const totalVolumeProduk = Number(jumlahMasuk) * Number(getVolumeBarang);

            const hitungKapasitasTerpakai = getTotalStokBarang * getVolumeBarang + jumlahMasuk * getVolumeBarang;
            const hitungPersentase = ((getTotalStokBarang * getVolumeBarang + jumlahMasuk * getVolumeBarang) / kapasitasRakSusun) * 100;

            cekStatusStokBaru = () => {
                if (totalStokBaru <= 0 || hitungPersentase <= 0) {
                    let postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} habis. Segera lakukan pembelian`, status: "Habis" });
                    postNotifikasiHabis.save();
                    return "Habis";
                } else if (totalStokBaru === Number(Math.trunc(kapasitasRakSusun / getVolumeBarang))) {
                    let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${getNamaBarang} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                    postNotifikasiPenuh.save();
                    return "Penuh";
                } else if (hitungPersentase > 0 && hitungPersentase < 2) {
                    let postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                    postNotifikasiHampirHabis.save();
                    return "Hampir Habis";
                } else {
                    return "Tersedia";
                }
            };

            const pembelianBarang = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": totalStokBaru,
                        "stok.status": cekStatusStokBaru(),
                    },
                }
            );

            const patchStatusKetersediaanSusun = await Rak.findOneAndUpdate(
                {
                    "susun._id": mongoose.Types.ObjectId(getIdRak),
                },
                {
                    $set: {
                        "susun.$.terpakai": hitungKapasitasTerpakai,
                        "susun.$.status": hitungPersentase,
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

    const dataProduk = await Produk.find({ _id: _id }, { _id: 0, nama: 1, volume: 1, stok: 1, id_rak: 1 });

    // INFO STOK
    const getTotalStokBarang = dataProduk[0].stok.total;
    let cekStatusStokBaru;

    // INFO PRODUK
    const getVolumeBarang = dataProduk[0].volume;
    const getNamaBarang = dataProduk[0].nama;
    let postNotifikasiHabis, postNotifikasiHampirHabis, postNotifikasiPenuh;

    // INFO RAK
    const getIdRak = dataProduk[0].id_rak;
    const rakSusun = await Rak.find({ "susun._id": getIdRak }, { susun: { $elemMatch: { _id: getIdRak } } });

    const kapasitasRakSusun = rakSusun[0].susun[0].kapasitas;
    const statusRakSusun = rakSusun[0].susun[0].status;
    const terpakaiRakSusun = rakSusun[0].susun[0].terpakai;
    let cekStatusRakSusunBaru;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const totalStokBaru = Number(getTotalStokBarang) - Number(jumlahKeluar);
            const totalVolumeProduk = Number(totalStokBaru) * Number(getVolumeBarang);

            const hitungKapasitasTerpakai = getTotalStokBarang * getVolumeBarang - jumlahKeluar * getVolumeBarang;
            const hitungPersentase = ((getTotalStokBarang * getVolumeBarang - jumlahKeluar * getVolumeBarang) / kapasitasRakSusun) * 100;
            console.log(`terpakai penjualan = ${hitungKapasitasTerpakai}`);
            console.log(`persentase penjualan = ${hitungPersentase}`);

            cekStatusStokBaru = () => {
                if (totalStokBaru <= 0 || hitungPersentase <= 0) {
                    let postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} habis. Segera lakukan pembelian`, status: "Habis" });
                    postNotifikasiHabis.save();
                    return "Habis";
                } else if (totalStokBaru === Number(Math.trunc(kapasitasRakSusun / getVolumeBarang))) {
                    let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${getNamaBarang} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                    postNotifikasiPenuh.save();
                    return "Penuh";
                } else if (hitungPersentase > 0 && hitungPersentase < 2) {
                    let postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                    postNotifikasiHampirHabis.save();
                    return "Hampir Habis";
                } else {
                    return "Tersedia";
                }
            };

            const penjualanBarang = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": totalStokBaru,
                        "stok.status": cekStatusStokBaru(),
                    },
                }
            );

            const patchStatusKetersediaanSusun = await Rak.findOneAndUpdate(
                {
                    "susun._id": mongoose.Types.ObjectId(getIdRak),
                },
                {
                    $set: {
                        "susun.$.terpakai": hitungKapasitasTerpakai,
                        "susun.$.status": hitungPersentase,
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
            const dataProduk = await Produk.find({ _id: _id }, { _id: 0, nama: 1, volume: 1, stok: 1, id_rak: 1 });

            const getNamaBarang = dataProduk[0].nama;
            const getTotalStokBarang = dataProduk[0].stok.total;
            const getStatusStokBarang = dataProduk[0].stok.status;

            const getVolumeBarang = dataProduk[0].volume;
            const getIdRak = dataProduk[0].id_rak;

            const totalStokBaru = getTotalStokBarang - jumlah;
            const totalVolumeProduk = jumlah * getVolumeBarang;

            const rakSusun = await Rak.find({ "susun._id": getIdRak }, { susun: { $elemMatch: { _id: getIdRak } } });

            const kapasitasRakSusun = rakSusun[0].susun[0].kapasitas;
            const statusRakSusun = rakSusun[0].susun[0].status;
            const terpakaiRakSusun = rakSusun[0].susun[0].terpakai;
            const hitungKapasitasTerpakai = getTotalStokBarang * getVolumeBarang - jumlah * getVolumeBarang;
            const hitungPersentase = ((getTotalStokBarang * getVolumeBarang - jumlah * getVolumeBarang) / kapasitasRakSusun) * 100;

            console.log(`terpakai proses retur = ${hitungKapasitasTerpakai}`);
            console.log(`persentase proses retur = ${hitungPersentase}`);

            const statusStokBaru = () => {
                if (totalStokBaru <= 0 || hitungPersentase <= 0) {
                    const postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} habis. Segera lakukan pembelian`, status: "Habis" });
                    postNotifikasiHabis.save();
                    return "Habis";
                } else if (totalStokBaru === Number(Math.trunc(kapasitasRakSusun / getVolumeBarang))) {
                    let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${getNamaBarang} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                    postNotifikasiPenuh.save();
                    return "Penuh";
                } else if (hitungPersentase > 0 && hitungPersentase < 2) {
                    const postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${getNamaBarang} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                    postNotifikasiHampirHabis.save();
                    return "Hampir Habis";
                } else {
                    return "Tersedia";
                }
            };

            const prosesRetur = await Produk.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        "stok.total": totalStokBaru,
                        "stok.status": statusStokBaru(),
                    },
                }
            );

            const patchStatusKetersediaanSusun = await Rak.findOneAndUpdate(
                {
                    "susun._id": mongoose.Types.ObjectId(getIdRak),
                },
                {
                    $set: {
                        "susun.$.terpakai": hitungKapasitasTerpakai,
                        "susun.$.status": hitungPersentase,
                    },
                }
            );
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const postFilterStokBarang = async (req, res) => {
    const { text } = req.body;

    try {
        let stokBarang;

        stokBarang = await Produk.aggregate([
            { $match: { $text: { $search: text } } },
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
                $project: {
                    nama: 1,
                    gambar: 1,
                    stok: 1,
                    dimensiProduk: 1,
                    id_rak: 1,
                },
            },
            {
                $sort: {
                    nama: 1,
                },
            },
        ]);

        if (!stokBarang.length > 0) {
            stokBarang = await await Produk.aggregate([
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
                    $project: {
                        nama: 1,
                        gambar: 1,
                        stok: 1,
                        dimensiProduk: 1,
                        id_rak: 1,
                    },
                },
                {
                    $sort: {
                        nama: 1,
                    },
                },
            ]);
        }
        res.status(200).json(stokBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
