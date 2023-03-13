import mongoose from "mongoose";
import BarangRetur from "../models/barangRetur.js";
import Notifikasi from "../models/notifikasi.js";
import Produk from "../models/produk.js";
import Rak from "../models/rak.js";

export const getBarangRetur = async (req, res) => {
    try {
        const dataBarangRetur = await BarangRetur.aggregate([
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
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
                $sort: { tanggalPengembalian: -1 },
            },
        ]);
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoBarangRetur = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const infoDataBarangRetur = await BarangRetur.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
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
        ]);
        res.status(200).json(infoDataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getBarangReturHariIni = async (req, res) => {
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
        const dataBarangRetur = await BarangRetur.aggregate([
            {
                $lookup: {
                    from: "produk",
                    localField: "id_produk",
                    foreignField: "_id",
                    as: "id_produk",
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
                $sort: { tanggalPengembalian: -1 },
            },
        ]);
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postBarangRetur = async (req, res) => {
    const barangRetur = req.body;
    const barangReturBaru = new BarangRetur(barangRetur);

    try {
        await barangReturBaru.save();
        const dataBarangRetur = await BarangRetur.find();
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchBarangRetur = async (req, res) => {
    const { id: _id } = req.params;
    const { id_produk, id_supplier, alasan, catatan, jumlahReturBaru, jumlahReturLama } = req.body;

    const getStokProdukYangDiretur = await BarangRetur.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(_id),
            },
        },
        {
            $lookup: {
                from: "produk",
                localField: "id_produk",
                foreignField: "_id",
                as: "id_produk",
            },
        },
    ]);

    // INFO STOK
    let totalStokProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].stok.total;
    let totalStokBaru, statusStokBaru;

    // INFO RPODUK
    let volumeProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].volume;
    let namaProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].nama;
    let postNotifikasiHabis, postNotifikasiHampirHabis, postNotifikasiPenuh;

    // INFO RAK
    let idSusunRak = getStokProdukYangDiretur[0].id_produk[0].id_rak;
    const rakSusun = await Rak.find({ "susun._id": idSusunRak }, { susun: { $elemMatch: { _id: idSusunRak } } });

    let statusRakProdukYangDiretur = rakSusun[0].susun[0].status;
    let kapasitasRakProdukYangDiretur = rakSusun[0].susun[0].kapasitas;
    let terpakaiRakProdukYangDiretur = rakSusun[0].susun[0].terpakai;
    let terpakaiRakBaru, statusRakBaru;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (jumlahReturBaru === jumlahReturLama) {
                const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                    {
                        _id: mongoose.Types.ObjectId(_id),
                    },
                    {
                        $set: {
                            jumlah: jumlahReturBaru,
                            alasan: alasan,
                            catatan: catatan,
                            id_produk: id_produk,
                            id_supplier: id_supplier,
                        },
                    }
                );

                res.status(200).json(dataBarangRetur);
            } else {
                totalStokBaru = Number(totalStokProdukYangDiretur) + Number(jumlahReturLama) - Number(jumlahReturBaru);

                terpakaiRakBaru = Number(terpakaiRakProdukYangDiretur) + Number(volumeProdukYangDiretur) * Number(jumlahReturLama) - Number(volumeProdukYangDiretur) * Number(jumlahReturBaru);
                statusRakBaru =
                    Number(statusRakProdukYangDiretur) +
                    ((Number(volumeProdukYangDiretur) * Number(jumlahReturLama)) / Number(kapasitasRakProdukYangDiretur)) * 100 -
                    ((Number(volumeProdukYangDiretur) * Number(jumlahReturBaru)) / Number(kapasitasRakProdukYangDiretur)) * 100;

                statusStokBaru = () => {
                    if (totalStokBaru <= 0 || statusRakBaru <= 0) {
                        postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} habis. Segera lakukan pembelian`, status: "Habis" });
                        postNotifikasiHabis.save();
                        return "Habis";
                    } else if (totalStokBaru === Number(Math.trunc(kapasitasRakProdukYangDiretur / volumeProdukYangDiretur)) || statusRakBaru === 100) {
                        postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                        postNotifikasiPenuh.save();
                        return "Penuh";
                    } else if (statusRakBaru > 0 && statusRakBaru < 2) {
                        postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                        postNotifikasiHampirHabis.save();
                        return "Hampir Habis";
                    } else {
                        return "Tersedia";
                    }
                };

                const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                    {
                        _id: mongoose.Types.ObjectId(_id),
                    },
                    {
                        $set: {
                            jumlah: jumlahReturBaru,
                            alasan: alasan,
                            catatan: catatan,
                            id_produk: id_produk,
                            id_supplier: id_supplier,
                        },
                    }
                );

                const updateFieldStok = await Produk.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(id_produk) },
                    {
                        $set: {
                            "stok.total": totalStokBaru,
                            "stok.status": statusStokBaru(),
                        },
                    }
                );

                const dataRak = await Rak.findOneAndUpdate(
                    {
                        "susun._id": mongoose.Types.ObjectId(idSusunRak),
                    },
                    {
                        $set: {
                            "susun.$.terpakai": terpakaiRakBaru,
                            "susun.$.status": statusRakBaru,
                        },
                    }
                );
            }
            res.status(200).json({
                message: "Edit Barang Retur Berhasil Dilakukan",
            });
        } else {
            throw new Error("id tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteBarangRetur = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await BarangRetur.findByIdAndRemove(_id);
            const dataBarangRetur = await BarangRetur.aggregate([
                {
                    $lookup: {
                        from: "produk",
                        localField: "id_produk",
                        foreignField: "_id",
                        as: "id_produk",
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
            ]);
            res.status(200).json(dataBarangRetur);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const postLaporanBarangRetur = async (req, res) => {
    const { tanggalMulai, tanggalSelesai } = req.body;

    try {
        if (tanggalMulai !== null && tanggalSelesai !== null) {
            const dataBarangRetur = await BarangRetur.aggregate([
                {
                    $lookup: {
                        from: "produk",
                        localField: "id_produk",
                        foreignField: "_id",
                        as: "id_produk",
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
                    $sort: { tanggalPengembalian: -1 },
                },
                {
                    $match: {
                        tanggalPengembalian: {
                            $gte: new Date(tanggalMulai),
                            $lte: new Date(tanggalSelesai),
                        },
                    },
                },
            ]);
            res.status(200).json(dataBarangRetur);
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

export const getStatusBarangRetur = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const dataBarangRetur = await BarangRetur.find({ _id: _id }, { status: 1 });
        res.status(200).json(dataBarangRetur);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const patchStatusBarangRetur = async (req, res) => {
    const { status } = req.body;
    const { id: _id } = req.params;

    const getStokProdukYangDiretur = await BarangRetur.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(_id),
            },
        },
        {
            $lookup: {
                from: "produk",
                localField: "id_produk",
                foreignField: "_id",
                as: "id_produk",
            },
        },
    ]);

    // DATA PRODUK
    let idProduk = getStokProdukYangDiretur[0].id_produk[0]._id;
    let volumeProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].volume;
    let namaProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].nama;

    // DATA BARANG RETUR
    let jumlahReturProduk = getStokProdukYangDiretur[0].jumlah;

    // DATA STOK PRODUK
    let totalStokProdukYangDiretur = getStokProdukYangDiretur[0].id_produk[0].stok.total;
    let totalStokBaru, statusStokBaru;

    // DATA RAK
    let idSusunRak = getStokProdukYangDiretur[0].id_produk[0].id_rak;
    const rakSusun = await Rak.find({ "susun._id": idSusunRak }, { susun: { $elemMatch: { _id: idSusunRak } } });

    let statusRakProdukYangDiretur = rakSusun[0].susun[0].status;
    let kapasitasRakProdukYangDiretur = rakSusun[0].susun[0].kapasitas;
    let terpakaiRakProdukYangDiretur = rakSusun[0].susun[0].terpakai;
    let terpakaiRakBaru = totalStokProdukYangDiretur * volumeProdukYangDiretur + jumlahReturProduk * volumeProdukYangDiretur;
    let statusRakBaru = ((totalStokProdukYangDiretur * volumeProdukYangDiretur + jumlahReturProduk * volumeProdukYangDiretur) / kapasitasRakProdukYangDiretur) * 100;

    try {
        if (status !== null) {
            if (status === "Ditolak" || status === "Diterima Ganti Uang" || status === "Diproses") {
                const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                    {
                        _id: mongoose.Types.ObjectId(_id),
                    },
                    {
                        $set: {
                            status: status,
                        },
                    }
                );

                res.status(200).json({
                    message: "Ganti status barang retur berhasil",
                });
            } else {
                if (Number(jumlahReturProduk) + Number(totalStokProdukYangDiretur) > Number(Math.trunc(kapasitasRakProdukYangDiretur / volumeProdukYangDiretur))) {
                    const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                        {
                            _id: mongoose.Types.ObjectId(_id),
                        },
                        {
                            $set: {
                                status: "Belum Bisa Masuk Rak (Kapasitas rak sudah penuh)",
                            },
                        }
                    );
                    throw new Error("Kapasitas rak penuh");
                } else {
                    const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                        {
                            _id: mongoose.Types.ObjectId(_id),
                        },
                        {
                            $set: {
                                status: "Diterima Ganti Barang",
                            },
                        }
                    );

                    const dataRak = await Rak.findOneAndUpdate(
                        {
                            "susun._id": mongoose.Types.ObjectId(idSusunRak),
                        },
                        {
                            $set: {
                                "susun.$.terpakai": terpakaiRakBaru,
                                "susun.$.status": statusRakBaru,
                            },
                        }
                    );
                    totalStokBaru = Number(totalStokProdukYangDiretur) + Number(jumlahReturProduk);
                    statusStokBaru = () => {
                        if (totalStokBaru <= 0 || statusRakBaru <= 0) {
                            let postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} habis. Segera lakukan pembelian`, status: "Habis" });
                            postNotifikasiHabis.save();
                            return "Habis";
                        } else if (totalStokBaru === Number(Math.trunc(kapasitasRakProdukYangDiretur / volumeProdukYangDiretur))) {
                            let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                            postNotifikasiPenuh.save();
                            return "Penuh";
                        } else if (statusRakBaru > 0 && statusRakBaru < 2) {
                            let postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                            postNotifikasiHampirHabis.save();
                            return "Hampir Habis";
                        } else {
                            return "Tersedia";
                        }
                    };

                    const updateFieldStok = await Produk.findOneAndUpdate(
                        { _id: mongoose.Types.ObjectId(idProduk) },
                        {
                            $set: {
                                "stok.total": totalStokBaru,
                                "stok.status": statusStokBaru(),
                            },
                        }
                    );
                }
                res.status(200).json({
                    message: "Ganti status barang retur berhasil",
                });
            }
        } else {
            res.status(404).json({
                message: "status belum dipilih",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const patchMasukanReturKeRak = async (req, res) => {
    const { id: _id } = req.params;

    const getProdukYangDiretur = await BarangRetur.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(_id),
            },
        },
        {
            $lookup: {
                from: "produk",
                localField: "id_produk",
                foreignField: "_id",
                as: "id_produk",
            },
        },
    ]);

    // INFO BARANG RETUR
    let statusRetur = getProdukYangDiretur[0].status;
    let jumlahRetur = getProdukYangDiretur[0].jumlah;

    // INFO RAK
    let idSusunRak = getProdukYangDiretur[0].id_produk[0].id_rak;
    const rakSusun = await Rak.find({ "susun._id": idSusunRak }, { susun: { $elemMatch: { _id: idSusunRak } } });

    let statusRakProdukYangDiretur = rakSusun[0].susun[0].status;
    let kapasitasRakProdukYangDiretur = rakSusun[0].susun[0].kapasitas;
    let terpakaiRakProdukYangDiretur = rakSusun[0].susun[0].terpakai;
    let terpakaiRakBaru, statusRakBaru, cekStatusStokBaru;

    // INFO STOK
    let statusStokBaru;
    let stokProdukYangDiretur = getProdukYangDiretur[0].id_produk[0].stok.total;
    let totalStokBaru;

    // INFO PRODUK
    let volumeProdukYangDiretur = getProdukYangDiretur[0].id_produk[0].volume;
    let namaProdukYangDiretur = getProdukYangDiretur[0].id_produk[0].nama;
    let idProduk = getProdukYangDiretur[0].id_produk[0]._id;

    try {
        if (Number(stokProdukYangDiretur) + Number(jumlahRetur) > Number(Math.trunc(kapasitasRakProdukYangDiretur / volumeProdukYangDiretur))) {
            throw new Error("Kapasitas rak masih penuh");
        } else {
            terpakaiRakBaru = stokProdukYangDiretur * volumeProdukYangDiretur + jumlahRetur * volumeProdukYangDiretur;
            statusRakBaru = ((stokProdukYangDiretur * volumeProdukYangDiretur + jumlahRetur * volumeProdukYangDiretur) / kapasitasRakProdukYangDiretur) * 100;

            const dataBarangRetur = await BarangRetur.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        status: "Diterima Ganti Barang",
                    },
                }
            );

            const dataRak = await Rak.findOneAndUpdate(
                {
                    "susun._id": mongoose.Types.ObjectId(idSusunRak),
                },
                {
                    $set: {
                        "susun.$.terpakai": terpakaiRakBaru,
                        "susun.$.status": statusRakBaru,
                    },
                }
            );

            totalStokBaru = Number(stokProdukYangDiretur) + Number(jumlahRetur);
            statusStokBaru = () => {
                if (totalStokBaru <= 0 || statusRakBaru <= 0) {
                    let postNotifikasiHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} habis. Segera lakukan pembelian`, status: "Habis" });
                    postNotifikasiHabis.save();
                    return "Habis";
                } else if (totalStokBaru === Number(Math.trunc(Number(kapasitasRakProdukYangDiretur) / Number(volumeProdukYangDiretur)))) {
                    let postNotifikasiPenuh = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} penuh. Kapasitas rak sudah mencapai maksimal`, status: "Penuh" });
                    postNotifikasiPenuh.save();
                    return "Penuh";
                } else if (statusRakBaru > 0 && statusRakBaru < 2) {
                    let postNotifikasiHampirHabis = new Notifikasi({ pesan: `Stok ${namaProdukYangDiretur} hampir habis. Jangan sampai kehabisan stok`, status: "Hampir Habis" });
                    postNotifikasiHampirHabis.save();
                    return "Hampir Habis";
                } else {
                    return "Tersedia";
                }
            };

            const updateFieldStok = await Produk.findOneAndUpdate(
                { _id: idProduk },
                {
                    $set: {
                        "stok.total": Number(stokProdukYangDiretur) + Number(jumlahRetur),
                        "stok.status": statusStokBaru(),
                    },
                }
            );
        }
        res.status(200).json({
            message: "Memasukan barang retur ke rak berhasil",
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
